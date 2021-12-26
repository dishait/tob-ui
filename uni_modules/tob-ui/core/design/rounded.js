import { simplifyBase, createSource } from './common.js'

// 圆角mixin
export default (opts = {}) => {
  const { rounded = 'none', sourceType = 'props' } = opts
  return {
    ...createSource(sourceType, { rounded }),
    computed: {
      Rounded() {
        const { rounded } = this
        const inPresets = presets.includes(rounded)
        return inPresets ? simplifyBase('rounded', rounded) : rounded
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
  '2xl', // 超级大
  '3xl', // 无敌大
  'full', // 圆
]
