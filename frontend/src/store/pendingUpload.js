/**
 * 临时存储待上传的文件和需求
 * 用于首页点击启动引擎后立即跳转，在Process页面再进行API调用
 */
import { reactive } from 'vue'

const STORAGE_KEY = 'mirofish_pending_upload'

const state = reactive({
  files: [],
  simulationRequirement: '',
  isPending: false
})

export function setPendingUpload(files, requirement) {
  state.files = files
  state.simulationRequirement = requirement
  state.isPending = true
  try {
    const serializableFiles = (files || []).map((f) => ({
      name: f.name || f.filename || 'documento.md',
      filename: f.name || f.filename || 'documento.md',
      size: f.size || 16384
    }))
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        files: serializableFiles,
        simulationRequirement: requirement || '',
        isPending: true
      })
    )
  } catch {
    // Ignore sessionStorage errors
  }
}

export function getPendingUpload() {
  if (state.isPending && state.files.length > 0) {
    return {
      files: state.files,
      simulationRequirement: state.simulationRequirement,
      isPending: state.isPending
    }
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.isPending && Array.isArray(parsed.files) && parsed.files.length > 0) {
        return {
          files: parsed.files,
          simulationRequirement: parsed.simulationRequirement || '',
          isPending: true
        }
      }
    }
  } catch {
    // Ignore sessionStorage errors
  }
  return {
    files: state.files,
    simulationRequirement: state.simulationRequirement,
    isPending: state.isPending
  }
}

export function clearPendingUpload() {
  state.files = []
  state.simulationRequirement = ''
  state.isPending = false
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore sessionStorage errors
  }
}

export default state
