import service from './index'

/**
 * 生成本体（上传文档和模拟需求）
 * @param {Object} data - 包含files, simulation_requirement, project_name等
 * @returns {Promise}
 */
export function generateOntology(formData) {
  let payload = formData
  if (typeof FormData !== 'undefined' && formData instanceof FormData) {
    const files = []
    const rawFiles = formData.getAll('files')
    for (const item of rawFiles) {
      if (item && typeof item === 'object') {
        files.push({
          filename: item.name || item.filename || 'documento.pdf',
          size: item.size || 24576
        })
      }
    }
    payload = {
      simulation_requirement: formData.get('simulation_requirement') || '',
      project_name: formData.get('project_name') || '',
      files
    }
  }

  return service({
    url: '/api/graph/ontology/generate',
    method: 'post',
    data: payload
  })
}

/**
 * 构建图谱
 * @param {Object} data - 包含project_id, graph_name等
 * @returns {Promise}
 */
export function buildGraph(data) {
  return service({
    url: '/api/graph/build',
    method: 'post',
    data
  })
}

/**
 * 查询任务状态
 * @param {String} taskId - 任务ID
 * @returns {Promise}
 */
export function getTaskStatus(taskId) {
  return service({
    url: `/api/graph/task/${taskId}`,
    method: 'get'
  })
}

/**
 * 获取图谱数据
 * @param {String} graphId - 图谱ID
 * @returns {Promise}
 */
export function getGraphData(graphId) {
  return service({
    url: `/api/graph/data/${graphId}`,
    method: 'get'
  })
}

/**
 * 获取项目信息
 * @param {String} projectId - 项目ID
 * @returns {Promise}
 */
export function getProject(projectId) {
  return service({
    url: `/api/graph/project/${projectId}`,
    method: 'get'
  })
}
