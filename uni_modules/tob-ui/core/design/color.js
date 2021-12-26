import { not } from '../tools/types.js'
import { createSource } from './common.js'
import { variableReplace } from '../hack/common.js'

// 颜色mixin
export default (opts = {}) => {
  const {
    color = '',
    inject = '',
    light = false,
    presets = null,
    outline = false,
    sourceType = 'props',
  } = opts

  if (not('Null', presets) && not('Object', presets)) {
    throw new Error('design-color的preset配置必须是对象类型')
  }

  return {
    ...createSource(sourceType, { color, light, outline }),
    computed: {
      Color() {
        const { color, light, outline } = this
        // 预设不存在时，运行设计
        if (!presets) {
          const shouldRunDesign = colors.includes(color)
          const opts = { color, light, outline, inject }
          return shouldRunDesign ? design(opts) : color
        }
        const inPresets = presets[color]
        return inPresets ? variableReplace(presets[color], color) : color
      },
    },
  }
}

// 颜色集
const colors = [
  'primary', // 主要
  'secondary', // 次要
  'accent', // 强调
  'neutral', // 中和
  'base', // 基础
  'info', // 信息
  'success', // 成功
  'warning', // 警告
  'error', // 错误
]

// 设计
const design = (opts = {}) => {
  const { color, light, outline, inject } = opts

  const bg = `bg-${color}`
  const text = `text-${color}`
  const textWhite = 'text-white'
  const bgLight = 'bg-opacity-10'
  const bgDepth = 'bg-opacity-100'
  const bgTransparent = `bg-transparent`
  const border = `border border-${color}`

  let prefix = ''

  if (inject) {
    prefix = `${inject}-${color} `
  }

  // 轮廓
  if (outline) {
    if (inject) {
      prefix = prefix + `${inject}-outline `
    }
    return prefix + `${text} ${border} ${bgTransparent}`
  }

  // 高亮
  if (light) {
    if (inject) {
      prefix = prefix + `${inject}-light `
    }
    return prefix + `${text} ${bg} ${bgLight}`
  }

  // 基础
  return prefix + `${textWhite} ${bg} ${bgDepth}`
}

// 创建颜色预设
export const createColorPresets = (prefix) => {
  const presets = {}
  colors.forEach((v) => (presets[v] = `${prefix}-${v}`))
  return presets
}

// 背景颜色预设
export const bgColorPresets = createColorPresets('bg')

// 文本颜色预设
export const textColorPresets = createColorPresets('text')

// 边框颜色
export const borderColorPresets = createColorPresets('border')
