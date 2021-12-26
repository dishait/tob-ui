import { createSource } from './common.js'

// flex mixin
export default (opts = {}) => {
  const {
    justify = 'start',
    align = 'stretch',
    direction = 'row',
    sourceType = 'props',
  } = opts
  return {
    ...createSource(sourceType, { justify, align, direction }),
    computed: {
      Align() {
        const { align } = this
        return alignPresets[align] || align
      },
      Justify() {
        const { justify } = this
        return justifyPresets[justify] || justify
      },
      Direction() {
        const { direction } = this
        return directionPresets[direction] || direction
      },
    },
  }
}

// 主轴预设
const justifyPresets = {
  end: 'justify-end', // 尾部
  start: 'justify-start', // 头部
  center: 'justify-center', // 中间
  around: 'justify-around', // 等比
  evenly: 'justify-evenly', // 等距
  between: 'justify-between', // 靠两头
}

// 交叉轴预设
const alignPresets = {
  end: 'items-flex-end', // 尾部
  center: 'items-center', // 中间
  stretch: 'items-stretch', // 填充
  start: 'items-flex-start', // 头部
  baseline: 'items-baseline', // 基线对齐
}

// 方向预设
const directionPresets = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
}
