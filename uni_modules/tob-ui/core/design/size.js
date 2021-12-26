import { not } from '../tools/types.js'
import { createSource } from './common.js'
import { variableReplace } from '../hack/common.js'

// 尺寸mixin
export default (opts = {}) => {
  const { size = 'md', presets = {}, sourceType = 'props' } = opts

  if (not('Object', presets)) {
    throw new Error('design-size的preset配置必须是对象类型')
  }

  return {
    ...createSource(sourceType, { size }),
    computed: {
      Size() {
        let { size } = this
        return presets[size] ? variableReplace(presets[size], size) : size
      },
    },
  }
}
