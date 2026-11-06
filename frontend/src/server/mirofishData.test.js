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
