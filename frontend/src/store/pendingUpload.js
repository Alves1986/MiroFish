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

export async function setPendingUpload(files, requirement) {
  state.files = files || []
  state.simulationRequirement = requirement || ''
  state.isPending = true

  const serializableFiles = []
  let combinedContent = ''

  for (const f of files || []) {
    let text = ''
    try {
      if (typeof f.text === 'function') {
        text = await f.text()
      } else if (f.content) {
        text = f.content
      }
    } catch {
      // ignore
    }

    if (text) {
      combinedContent += `\n[Documento: ${f.name || f.filename || 'anexo'}]\n${text.slice(0, 40000)}\n`
    }

    serializableFiles.push({
      name: f.name || f.filename || 'documento.md',
      filename: f.name || f.filename || 'documento.md',
      size: f.size || (text ? text.length : 16384),
      content: text ? text.slice(0, 40000) : ''
    })
  }

  state.extractedContent = combinedContent
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        files: serializableFiles,
        simulationRequirement: requirement || '',
        extractedContent: combinedContent,
        isPending: true
      })
    )
  } catch {
    // Ignore sessionStorage errors
  }
}

export function getPendingUpload() {
  if (state.isPending) {
    return {
      files: state.files,
      simulationRequirement: state.simulationRequirement,
      extractedContent: state.extractedContent || '',
      isPending: state.isPending
    }
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.isPending) {
        return {
          files: parsed.files || [],
          simulationRequirement: parsed.simulationRequirement || '',
          extractedContent: parsed.extractedContent || '',
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
    extractedContent: state.extractedContent || '',
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
