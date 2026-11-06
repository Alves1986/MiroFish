import fs from 'node:fs'
import path from 'node:path'
import { defaultStore } from './mirofishData.js'

function loadEnvConfig() {
  const candidates = [
    '/tmp/.mirofish_env',
    path.resolve(process.cwd(), '../.env.example'),
    path.resolve(process.cwd(), '.env.example'),
    path.resolve(process.cwd(), '../.env'),
    path.resolve(process.cwd(), '.env')
  ]
  const env = { ...process.env }
  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
        if (match && match[2].trim()) {
          env[match[1]] = match[2].trim()
        }
      }
    }
  }
  return env
}

async function callConfiguredLlm(messages, useBoostFirst = true) {
  const env = loadEnvConfig()
  const providers = []

  if (env.LLM_BOOST_API_KEY && env.LLM_BOOST_BASE_URL) {
    providers.push({
      name: 'llm_boost',
      apiKey: env.LLM_BOOST_API_KEY,
      baseUrl: env.LLM_BOOST_BASE_URL.replace(/\/+$/, ''),
      model: env.LLM_BOOST_MODEL_NAME || 'openai/gpt-oss-120b'
    })
  }
  if (env.LLM_API_KEY && env.LLM_BASE_URL) {
    providers.push({
      name: 'llm_primary',
      apiKey: env.LLM_API_KEY,
      baseUrl: env.LLM_BASE_URL.replace(/\/+$/, ''),
      model: env.LLM_MODEL_NAME || 'openrouter/free'
    })
  }

  if (!useBoostFirst) {
    providers.reverse()
  }

  for (const provider of providers) {
    try {
      const response = await fetch(`${provider.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${provider.apiKey}`
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          temperature: 0.6,
          max_tokens: 700
        }),
        signal: AbortSignal.timeout(12000)
      })
      if (!response.ok) continue
      const data = await response.json()
      const text = data?.choices?.[0]?.message?.content?.trim()
      if (text) {
        return { text, provider: provider.name, model: provider.model }
      }
    } catch {
      // Fall through to next provider or local fallback
    }
  }
  return null
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

/**
 * Lightweight parser for JSON and multipart/form-data requests
 * so ontology upload works out-of-the-box without external native dependencies.
 */
async function parseRequestBody(req) {
  const rawBuffer = await readRawBody(req)
  if (!rawBuffer || rawBuffer.length === 0) return {}

  const contentType = req.headers['content-type'] || ''
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(rawBuffer.toString('utf-8'))
    } catch {
      return {}
    }
  }

  if (contentType.includes('multipart/form-data')) {
    const text = rawBuffer.toString('utf-8')
    const result = { files: [] }

    // Boundary-aware extraction for multipart fields
    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
    const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]).trim() : null

    if (boundary) {
      const parts = text.split(`--${boundary}`)
      for (const part of parts) {
        if (!part || part === '--' || part.startsWith('--')) continue
        const headerEndIdx = part.indexOf('\r\n\r\n') !== -1 ? part.indexOf('\r\n\r\n') : part.indexOf('\n\n')
        if (headerEndIdx === -1) continue
        const headersPart = part.slice(0, headerEndIdx)
        const bodyOffset = part.slice(headerEndIdx).startsWith('\r\n\r\n') ? 4 : 2
        const valuePart = part.slice(headerEndIdx + bodyOffset).replace(/\r?\n$/, '')

        const fileMatch = headersPart.match(/filename="([^"]+)"/)
        if (fileMatch && fileMatch[1]) {
          result.files.push({ filename: fileMatch[1], size: Math.max(1024, valuePart.length) })
          continue
        }

        const fieldMatch = headersPart.match(/name="([^"]+)"/)
        if (fieldMatch && fieldMatch[1]) {
          result[fieldMatch[1]] = valuePart.trim()
        }
      }
    }

    // Fallback regex extraction if boundary was not matched
    if (!result.simulation_requirement) {
      const reqMatch = text.match(/name="simulation_requirement"(?:[\s\S]*?\r?\n\r?\n)([\s\S]*?)\r?\n--/)
      if (reqMatch) {
        result.simulation_requirement = reqMatch[1].trim()
      }
    }
    if (!result.project_name) {
      const nameMatch = text.match(/name="project_name"(?:[\s\S]*?\r?\n\r?\n)([\s\S]*?)\r?\n--/)
      if (nameMatch) {
        result.project_name = nameMatch[1].trim()
      }
    }
    if (result.files.length === 0) {
      const fileRegex = /filename="([^"]+)"/g
      let match
      while ((match = fileRegex.exec(text)) !== null) {
        if (match[1]) {
          result.files.push({ filename: match[1], size: 24576 })
        }
      }
    }
    return result
  }

  // Fallback: attempt JSON parse even if Content-Type was omitted
  try {
    return JSON.parse(rawBuffer.toString('utf-8'))
  } catch {
    return {}
  }
}

function createApiMiddleware(store = defaultStore) {
  return async (req, res, next) => {
    const urlObj = new URL(req.url || '/', 'http://localhost:3000')
    const pathname = urlObj.pathname
    const method = (req.method || 'GET').toUpperCase()

    if (pathname === '/health') {
      const env = loadEnvConfig()
      return sendJson(res, 200, {
        status: 'ok',
        service: 'MiroFish Backend',
        configured: {
          llm: Boolean(env.LLM_API_KEY),
          llm_model: env.LLM_MODEL_NAME || null,
          llm_boost: Boolean(env.LLM_BOOST_API_KEY),
          llm_boost_model: env.LLM_BOOST_MODEL_NAME || null,
          zep: Boolean(env.ZEP_API_KEY)
        }
      })
    }

    if (!pathname.startsWith('/api/')) {
      return next()
    }

    try {
      // ==================== GRAPH API ====================
      if (pathname === '/api/graph/project/list' && method === 'GET') {
        const limit = Number(urlObj.searchParams.get('limit') || 50)
        const data = store.listProjects(limit)
        return sendJson(res, 200, { success: true, data, count: data.length })
      }

      const projMatch = pathname.match(/^\/api\/graph\/project\/([^/]+)$/)
      if (projMatch && method === 'GET') {
        const project = store.getProject(projMatch[1])
        if (!project) {
          return sendJson(res, 404, { success: false, error: `Project not found: ${projMatch[1]}` })
        }
        return sendJson(res, 200, { success: true, data: project })
      }

      if (pathname === '/api/graph/ontology/generate' && method === 'POST') {
        const body = await parseRequestBody(req)
        const simulationRequirement =
          (body.simulation_requirement && String(body.simulation_requirement).trim()) ||
          (body.project_name && String(body.project_name).trim()) ||
          'Simulação e análise de evolução de opinião pública a partir dos documentos enviados'
        const project = store.generateOntology({
          simulationRequirement,
          projectName: body.project_name,
          files: body.files,
          documentContent: body.document_content || ''
        })
        return sendJson(res, 200, {
          success: true,
          data: {
            project_id: project.project_id,
            project_name: project.name,
            ontology: project.ontology,
            analysis_summary: project.analysis_summary,
            files: project.files,
            total_text_length: project.total_text_length
          }
        })
      }

      if (pathname === '/api/graph/build' && method === 'POST') {
        const body = await parseRequestBody(req)
        const data = store.buildGraph({ project_id: body.project_id })
        return sendJson(res, 200, { success: true, data })
      }

      const taskMatch = pathname.match(/^\/api\/graph\/task\/([^/]+)$/)
      if (taskMatch && method === 'GET') {
        const task = store.state.tasks[taskMatch[1]] || {
          task_id: taskMatch[1],
          status: 'completed',
          progress: 100,
          message: '任务已完成'
        }
        return sendJson(res, 200, { success: true, data: task })
      }

      const graphDataMatch = pathname.match(/^\/api\/graph\/data\/([^/]+)$/)
      if (graphDataMatch && method === 'GET') {
        const graphData = store.getGraphData(graphDataMatch[1])
        return sendJson(res, 200, { success: true, data: graphData })
      }

      // ==================== SIMULATION API ====================
      if (pathname === '/api/simulation/history' && method === 'GET') {
        const limit = Number(urlObj.searchParams.get('limit') || 20)
        const data = store.getHistory(limit)
        return sendJson(res, 200, { success: true, data, count: data.length })
      }

      if (pathname === '/api/simulation/list' && method === 'GET') {
        const data = Object.values(store.state.simulations)
        return sendJson(res, 200, { success: true, data, count: data.length })
      }

      if (pathname === '/api/simulation/create' && method === 'POST') {
        const body = await parseRequestBody(req)
        const sim = store.createSimulation(body)
        return sendJson(res, 200, { success: true, data: sim })
      }

      if (pathname === '/api/simulation/prepare' && method === 'POST') {
        const body = await parseRequestBody(req)
        const simId = body.simulation_id || 'sim_whu2025'
        const profiles = store.getProfiles(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            simulation_id: simId,
            task_id: `task_prep_${simId}`,
            already_prepared: true,
            expected_entities_count: profiles.length,
            entity_types: Array.from(new Set(profiles.map((p) => p.entity_type)))
          }
        })
      }

      if (pathname === '/api/simulation/prepare/status' && method === 'POST') {
        const body = await parseRequestBody(req)
        const simId = body.simulation_id || 'sim_whu2025'
        return sendJson(res, 200, {
          success: true,
          data: {
            task_id: body.task_id || `task_prep_${simId}`,
            simulation_id: simId,
            status: 'completed',
            progress: 100,
            already_prepared: true,
            message: '模拟环境准备完成'
          }
        })
      }

      if (pathname === '/api/simulation/start' && method === 'POST') {
        const body = await parseRequestBody(req)
        const simId = body.simulation_id || 'sim_whu2025'
        const runStatus = store.getRunStatus(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            ...runStatus,
            force_restarted: Boolean(body.force)
          }
        })
      }

      if (pathname === '/api/simulation/stop' && method === 'POST') {
        const body = await parseRequestBody(req)
        const simId = body.simulation_id || 'sim_whu2025'
        return sendJson(res, 200, {
          success: true,
          data: { simulation_id: simId, status: 'stopped', runner_status: 'stopped' }
        })
      }

      if (pathname === '/api/simulation/close-env' && method === 'POST') {
        const body = await parseRequestBody(req)
        return sendJson(res, 200, {
          success: true,
          data: { simulation_id: body.simulation_id, closed: true }
        })
      }

      if (pathname === '/api/simulation/env-status' && method === 'POST') {
        const body = await parseRequestBody(req)
        const env = loadEnvConfig()
        const hasLiveEngine = Boolean(env.LLM_BOOST_API_KEY || env.LLM_API_KEY)
        return sendJson(res, 200, {
          success: true,
          data: { simulation_id: body.simulation_id, env_alive: hasLiveEngine }
        })
      }

      if (pathname === '/api/simulation/interview/batch' && method === 'POST') {
        const body = await parseRequestBody(req)
        const fallback = store.interviewAgents(body)
        const profiles = store.getProfiles(body.simulation_id)
        const interviews = Array.isArray(body.interviews) ? body.interviews : []

        if (interviews.length > 0 && interviews.length <= 6) {
          await Promise.all(
            interviews.map(async (item) => {
              const agentId = Number(item.agent_id ?? 0)
              const agent = profiles[agentId] || profiles[0]
              const prompt = String(item.prompt || '').trim()
              if (!agent || !prompt) return

              const llmRes = await callConfiguredLlm(
                [
                  {
                    role: 'system',
                    content: `Você é o agente simulado "${agent.username}" (${agent.profession}). Biografia: ${agent.bio}. Persona: ${agent.persona}. Tópicos de interesse: ${(agent.interested_topics || []).join(', ')}. Responda em português do Brasil em primeira pessoa, de forma autêntica e concisa (2 a 4 frases).`
                  },
                  {
                    role: 'user',
                    content: prompt
                  }
                ],
                true
              )

              if (llmRes?.text) {
                const formatted = `[${agent.username} (${agent.profession})]:\n${llmRes.text}`
                if (fallback.result?.results?.[`reddit_${agentId}`]) {
                  fallback.result.results[`reddit_${agentId}`].response = formatted
                  fallback.result.results[`reddit_${agentId}`].answer = formatted
                }
                if (fallback.result?.results?.[`twitter_${agentId}`]) {
                  fallback.result.results[`twitter_${agentId}`].response = formatted
                  fallback.result.results[`twitter_${agentId}`].answer = formatted
                }
              }
            })
          )
        }

        return sendJson(res, 200, { success: true, data: fallback })
      }

      const simProfilesMatch = pathname.match(/^\/api\/simulation\/([^/]+)\/profiles(?:\/realtime)?$/)
      if (simProfilesMatch && method === 'GET') {
        const simId = simProfilesMatch[1]
        const profiles = store.getProfiles(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            simulation_id: simId,
            profiles,
            total_expected: profiles.length,
            count: profiles.length
          }
        })
      }

      const simConfigMatch = pathname.match(/^\/api\/simulation\/([^/]+)\/config(?:\/realtime)?$/)
      if (simConfigMatch && method === 'GET') {
        const simId = simConfigMatch[1]
        const config = store.getConfig(simId)
        const profiles = store.getProfiles(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            ...config,
            status: 'completed',
            config_generated: true,
            is_generating: false,
            generation_stage: 'completed',
            config,
            summary: {
              total_agents: profiles.length,
              simulation_hours: config.time_config.total_simulation_hours,
              initial_posts_count: 6,
              hot_topics_count: config.event_config.hot_topics.length,
              has_twitter_config: true,
              has_reddit_config: true
            }
          }
        })
      }

      const simRunStatusDetailMatch = pathname.match(/^\/api\/simulation\/([^/]+)\/run-status\/detail$/)
      if (simRunStatusDetailMatch && method === 'GET') {
        const simId = simRunStatusDetailMatch[1]
        const runStatus = store.getRunStatus(simId)
        const allActions = store.getActions(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            ...runStatus,
            all_actions: allActions,
            recent_actions: allActions.slice(-10)
          }
        })
      }

      const simRunStatusMatch = pathname.match(/^\/api\/simulation\/([^/]+)\/run-status$/)
      if (simRunStatusMatch && method === 'GET') {
        const simId = simRunStatusMatch[1]
        return sendJson(res, 200, {
          success: true,
          data: store.getRunStatus(simId)
        })
      }

      const simActionsMatch = pathname.match(/^\/api\/simulation\/([^/]+)\/actions$/)
      if (simActionsMatch && method === 'GET') {
        const actions = store.getActions(simActionsMatch[1])
        return sendJson(res, 200, {
          success: true,
          data: { actions, count: actions.length }
        })
      }

      const simPostsMatch = pathname.match(/^\/api\/simulation\/([^/]+)\/posts$/)
      if (simPostsMatch && method === 'GET') {
        const actions = store.getActions(simPostsMatch[1])
        return sendJson(res, 200, {
          success: true,
          data: { posts: actions, count: actions.length }
        })
      }

      const simDetailMatch = pathname.match(/^\/api\/simulation\/([^/]+)$/)
      if (simDetailMatch && method === 'GET') {
        const sim = store.getSimulation(simDetailMatch[1])
        return sendJson(res, 200, { success: true, data: sim })
      }

      // ==================== REPORT API ====================
      if (pathname === '/api/report/generate' && method === 'POST') {
        const body = await parseRequestBody(req)
        const simId = body.simulation_id || 'sim_whu2025'
        const entry = store.getReportBySimulation(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            simulation_id: simId,
            report_id: entry.report.report_id,
            task_id: `task_${entry.report.report_id}`,
            status: 'completed',
            already_generated: true,
            message: '报告已生成'
          }
        })
      }

      if (pathname === '/api/report/generate/status') {
        const reportId = urlObj.searchParams.get('report_id') || 'report_whu2025'
        return sendJson(res, 200, {
          success: true,
          data: {
            report_id: reportId,
            status: 'completed',
            progress: 100,
            already_completed: true,
            message: '报告生成完成'
          }
        })
      }

      if (pathname === '/api/report/chat' && method === 'POST') {
        const body = await parseRequestBody(req)
        const result = store.chatWithReportAgent(body)
        const sim = store.getSimulation(body.simulation_id)
        const proj = store.getProject(sim.project_id) || store.getProject('proj_whu2025')
        const cleanMsg = String(body.message || '').trim()

        const llmRes = await callConfiguredLlm(
          [
            {
              role: 'system',
              content: `Você é o Agente de Relatório do MiroFish analisando o projeto "${proj.name}". Contexto da simulação: ${proj.simulation_requirement}. Resumo: ${proj.analysis_summary}. Responda sempre em português do Brasil de forma analítica, estruturada em tópicos Markdown concisos.`
            },
            {
              role: 'user',
              content: cleanMsg
            }
          ],
          false
        )

        if (llmRes?.text) {
          result.response = llmRes.text
        }
        return sendJson(res, 200, { success: true, data: result })
      }

      const reportCheckMatch = pathname.match(/^\/api\/report\/check\/([^/]+)$/)
      if (reportCheckMatch && method === 'GET') {
        const simId = reportCheckMatch[1]
        const entry = store.getReportBySimulation(simId)
        return sendJson(res, 200, {
          success: true,
          data: {
            simulation_id: simId,
            has_report: true,
            report_status: 'completed',
            report_id: entry.report.report_id,
            interview_unlocked: true
          }
        })
      }

      const reportBySimMatch = pathname.match(/^\/api\/report\/by-simulation\/([^/]+)$/)
      if (reportBySimMatch && method === 'GET') {
        const entry = store.getReportBySimulation(reportBySimMatch[1])
        return sendJson(res, 200, {
          success: true,
          data: entry.report,
          has_report: true
        })
      }

      const reportAgentLogMatch = pathname.match(/^\/api\/report\/([^/]+)\/agent-log$/)
      if (reportAgentLogMatch && method === 'GET') {
        const entry = store.getReportEntry(reportAgentLogMatch[1])
        const fromLine = Math.max(0, Number(urlObj.searchParams.get('from_line') || 0))
        const logs = entry.logs.slice(fromLine)
        return sendJson(res, 200, {
          success: true,
          data: {
            logs,
            total_lines: entry.logs.length,
            from_line: fromLine,
            has_more: false
          }
        })
      }

      const reportConsoleLogMatch = pathname.match(/^\/api\/report\/([^/]+)\/console-log$/)
      if (reportConsoleLogMatch && method === 'GET') {
        const entry = store.getReportEntry(reportConsoleLogMatch[1])
        const fromLine = Math.max(0, Number(urlObj.searchParams.get('from_line') || 0))
        const logs = entry.consoleLogs.slice(fromLine)
        return sendJson(res, 200, {
          success: true,
          data: {
            logs,
            total_lines: entry.consoleLogs.length,
            from_line: fromLine,
            has_more: false
          }
        })
      }

      const reportSectionsMatch = pathname.match(/^\/api\/report\/([^/]+)\/sections$/)
      if (reportSectionsMatch && method === 'GET') {
        const entry = store.getReportEntry(reportSectionsMatch[1])
        return sendJson(res, 200, {
          success: true,
          data: {
            report_id: entry.report.report_id,
            sections: entry.sections,
            total_sections: entry.sections.length,
            is_complete: true
          }
        })
      }

      const reportDetailMatch = pathname.match(/^\/api\/report\/([^/]+)$/)
      if (reportDetailMatch && method === 'GET') {
        const entry = store.getReportEntry(reportDetailMatch[1])
        return sendJson(res, 200, { success: true, data: entry.report })
      }

      return sendJson(res, 404, { success: false, error: `Endpoint not found: ${method} ${pathname}` })
    } catch (err) {
      return sendJson(res, 400, {
        success: false,
        error: err.message || 'Request failed'
      })
    }
  }
}

export function mirofishApiPlugin() {
  const middleware = createApiMiddleware(defaultStore)
  return {
    name: 'mirofish-api-plugin',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    }
  }
}
