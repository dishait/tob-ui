import $P from '../hack/props.js'

// vModel mixin(uniapp专属)
export default (opts = {}) => {
  const { value } = opts
  return {
    // #ifdef VUE3
    emits: ['input', 'update:modelValue'],
    // #endif
    props: $P({
      // #ifdef VUE2
      value,
      // #endif
      // #ifdef VUE3
      modelValue: value,
      // #endif
    }),
    computed: {
      VModelValue() {
        // #ifdef VUE2
        const { value } = this
        return value
        // #endif

        // #ifdef VUE3
        const { modelValue } = this
        return modelValue
        // #endif
      },
    },
    methods: {
      updateVModelValue(v) {
        // #ifdef VUE2 || MP-WEIXIN
        this.$emit('input', v)
        // #endif
        // #ifdef VUE3
        this.$emit('update:modelValue', v)
        // #endif
      },
    },
  }
}
