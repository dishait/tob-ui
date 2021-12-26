import { not } from '../tools/types.js'

// Emits mixin
export default (emits = []) => {
  if (not('Array', emits)) {
    throw new Error('Emits参数必须是Array类型')
  }

  const methods = {}

  for (const k of emits) {
    methods[k] = function (e) {
      return this.$emit(k, e)
    }
  }
  return {
    // #ifdef VUE3
    emits,
    // #endif
    methods,
  }
}
