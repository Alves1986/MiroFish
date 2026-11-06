import test from 'node:test'
import assert from 'node:assert/strict'
import { MiroFishStore } from './mirofishData.js'

test('MiroFishStore initializes with pre-seeded simulation history and projects in Brazilian Portuguese', () => {
  const store = new MiroFishStore()
  const history = store.getHistory(10)
  assert.equal(history.length, 2)
  assert.equal(history[0].simulation_id, 'sim_whu2025')
  assert.equal(history[0].project_id, 'proj_whu2025')
  assert.equal(history[0].report_id, 'report_whu2025')
  assert.ok(history[0].simulation_requirement.includes('Simular a evolução da opinião pública'))
  assert.ok(history[0].files.length >= 2)
})

test('MiroFishStore validates simulationRequirement and generates ontology + graph', () => {
  const store = new MiroFishStore()

  assert.throws(
    () => store.generateOntology({ simulationRequirement: '   ', files: [] }),
    /simulation_requirement is required/
  )

  const project = store.generateOntology({
    simulationRequirement: 'Simular o impacto da redução de preços de veículos elétricos na decisão de compra dos consumidores',
    projectName: 'Simulação de Mercado de Veículos Elétricos',
    files: [{ filename: 'ev_market_2026.md', size: 20480 }]
  })

  assert.ok(project.project_id.startsWith('proj_'))
  assert.equal(project.status, 'graph_completed')
  assert.ok(project.ontology.entity_types.length > 0)

  const graph = store.getGraphData(project.graph_id)
  assert.equal(graph.nodes.length, 6)
  assert.equal(graph.edges.length, 6)
})

test('MiroFishStore supports full simulation lifecycle, report retrieval, and agent interviews', () => {
  const store = new MiroFishStore()
  const runStatus = store.getRunStatus('sim_whu2025')
  assert.equal(runStatus.runner_status, 'completed')
  assert.ok(runStatus.twitter_actions_count > 0)
  assert.ok(runStatus.reddit_actions_count > 0)

  const simConfig = store.getConfig('sim_whu2025')
  assert.ok(Array.isArray(simConfig.event_config.initial_posts))
  assert.ok(simConfig.event_config.initial_posts.length >= 2)
  assert.equal(typeof simConfig.twitter_config.recency_weight, 'number')
  assert.equal(typeof simConfig.reddit_config.recency_weight, 'number')
  assert.equal(typeof simConfig.agent_configs[0].sentiment_bias, 'number')
  assert.equal(typeof simConfig.agent_configs[0].influence_weight, 'number')

  const reportEntry = store.getReportEntry('report_whu2025')
  assert.equal(reportEntry.report.status, 'completed')
  assert.equal(reportEntry.sections.length, 3)

  const chatRes = store.chatWithReportAgent({
    simulation_id: 'sim_whu2025',
    message: 'Por favor, resuma os principais pontos de inflexão da opinião pública'
  })
  assert.ok(chatRes.response.includes('Tendência Central da Opinião Pública'))

  const interviewRes = store.interviewAgents({
    simulation_id: 'sim_whu2025',
    interviews: [{ agent_id: 0, prompt: 'O que você acha do controle de acesso por cartão?' }]
  })
  assert.ok(interviewRes.result.results.reddit_0.response.includes('Lin Zhiyuan'))
})

test('MiroFishStore generates authentic Ministral 3B/8B artifacts, agents, and report when prompted', () => {
  const store = new MiroFishStore()

  // 1. Generate ontology for Ministral
  const project = store.generateOntology({
    simulationRequirement: 'Simular a adesão e o debate técnico sobre os modelos Ministral 3B e 8B da Mistral AI para inferência on-device e edge computing',
    projectName: 'Adoção do Ministral 3B e 8B no Brasil',
    files: [{ filename: 'ministral_benchmarks.md', content: 'Ministral 3B and 8B edge AI benchmarks with 128k context' }]
  })

  assert.ok(project.project_id.startsWith('proj_'))
  assert.equal(project.status, 'graph_completed')
  assert.ok(project.ontology.entity_types.some((t) => t.name === 'AIModel'))
  assert.ok(project.ontology.entity_types.some((t) => t.name === 'EdgeDeveloper'))

  // 2. Graph verification
  const graph = store.getGraphData(project.graph_id)
  assert.equal(graph.nodes.length, 6)
  assert.ok(graph.nodes.some((n) => n.name.includes('Ministral 3B & Ministral 8B')))
  assert.ok(graph.nodes.some((n) => n.name.includes('Mistral AI')))
  assert.ok(graph.nodes.some((n) => n.name.includes('llama.cpp')))

  // 3. Create simulation
  const sim = store.createSimulation({
    project_id: project.project_id,
    graph_id: project.graph_id,
    enable_twitter: true,
    enable_reddit: true
  })
  assert.ok(sim.simulation_id.startsWith('sim_'))

  // 4. Profiles verification: MUST be Ministral agents, NOT Wuhan cherry blossoms!
  const profiles = store.getProfiles(sim.simulation_id)
  assert.equal(profiles.length, 6)
  assert.equal(profiles[0].name, 'lucas_edge_ai')
  assert.ok(profiles[0].username.includes('Lucas Rocha'))
  assert.ok(profiles[0].bio.includes('Ministral'))
  assert.equal(profiles[1].name, 'camila_llm_bench')
  assert.ok(profiles[1].username.includes('Dra. Camila Duarte'))
  assert.equal(profiles[3].name, 'mistral_official_dev')

  // 5. Config verification
  const config = store.getConfig(sim.simulation_id)
  assert.ok(config.event_config.hot_topics.some((t) => t.includes('Ministral 3B vs 8B')))
  assert.ok(config.event_config.narrative_direction.includes('Ministral 3B e Ministral 8B'))

  // 6. Actions verification
  const actions = store.getActions(sim.simulation_id)
  assert.ok(actions.length >= 6)
  assert.ok(actions[0].action_args.content.includes('Ministral'))
  assert.ok(actions[1].action_args.content.includes('llama.cpp'))

  // 7. Report verification
  const report = store.getReportBySimulation(sim.simulation_id)
  assert.ok(report.report.outline.title.includes('Ministral 3B e 8B'))
  assert.ok(report.report.markdown_content.includes('Ministral'))
  assert.ok(!report.report.markdown_content.includes('Universidade de Wuhan'))

  // 8. Chat and interviews verification
  const chatRes = store.chatWithReportAgent({
    simulation_id: sim.simulation_id,
    message: 'Qual a recomendação para rodar Ministral em hardware de borda?'
  })
  assert.ok(chatRes.response.includes('Lucas Rocha'))
  assert.ok(!chatRes.response.includes('cerejeiras'))

  const interviewRes = store.interviewAgents({
    simulation_id: sim.simulation_id,
    interviews: [{ agent_id: 0, prompt: 'Como está o desempenho no llama.cpp?' }]
  })
  assert.ok(interviewRes.result.results.reddit_0.response.includes('Lucas Rocha'))
  assert.ok(interviewRes.result.results.reddit_0.response.includes('EdgeDeveloper'))
  assert.ok(!interviewRes.result.results.reddit_0.response.includes('CampusGroup'))
})

