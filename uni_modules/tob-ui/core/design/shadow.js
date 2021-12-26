import { simplifyBase, createSource } from './common.js'

// 阴影mixin
export default (opts = {}) => {
  const { shadow = 'none', sourceType = 'props' } = opts
  return {
    ...createSource(sourceType, { shadow }),
    computed: {
      Shadow() {
        const { shadow } = this
        const inPresets = presets.includes(shadow)
        return inPresets ? simplifyBase('shadow', shadow) : shadow
      },
    },
  }
}

// 预设
const presets = [
  'none', // 无
  'sm', // 小
  'base', // 基础
  'md', // 中
  'lg', // 大
  'xl', // 超大
]
