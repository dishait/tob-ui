import { is } from '../tools/types.js'

// hack创建
export const createHack = (logic) => (schema = {}) => {
  const newSchema = {}
  for (const k in schema) {
    const v = schema[k]
    logic(k, v, newSchema)
  }
  return newSchema
}

// 字符串变量替换
export const variableReplace = (s, n) => {
  if (is('String', s)) {
    return s.replace(/\$/g, n)
  }
  return s
}
