import { createHack } from './common.js'
import { showType } from '../tools/types.js'

// 类型推断
const typeInference = (k, v, newSchema) => {
  const t = showType(v)
  const type = types[t]
  if (type) {
    return (newSchema[k] = createProp(type, v))
  }

  throw new Error(`props生成器暂不支持键${k}的类型${t}`)
}

// props生成器
export default createHack(typeInference)

const types = {
  Number,
  String,
  Boolean,
  Object,
  Array,
  Function,
}

// 创建新的prop
const createProp = (type, v) => {
  return {
    type,
    default: isQuote(type) ? () => v : v,
  }
}

// 引用类型判断
const isQuote = (type) => ![Number, String, Boolean].includes(type)
