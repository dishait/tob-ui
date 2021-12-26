import cached from '../tools/cached.js'
import { is, showType } from '../tools/types.js'
import { createHack, variableReplace } from './common.js'

// 扩展配置
const extendConfig = (k, v, newSchema) => {
  // 原生函数模式
  if (is('Function', v)) {
    return (newSchema[k] = v)
  }

  // 预取的键
  const pk = lowercaseInitials(k)

  // 字符模式
  if (is('String', v)) {
    return (newSchema[k] = strMode(pk, v))
  }

  // 数组模式
  if (is('Array', v)) {
    return (newSchema[k] = arrMode(pk, k, v))
  }

  // 对象模式
  if (is('Object', v)) {
    return (newSchema[k] = objMode(pk, v))
  }

  // 其他类型的配置统统不支持
  throw new Error(`computed生成器暂不支持键${k}的配置类型${showType(v)}`)
}

export default createHack(extendConfig)

// 字符串模式
const strMode = (pk, v) => {
  return function () {
    const pv = this[pk]
    return pv ? variableReplace(v, pv) : null
  }
}

// 数组模式
const arrMode = (pk, k, v) => {
  const { length: len } = v
  const illegal = len <= 1 || len > 3
  if (illegal) {
    throw new Error(`computed生成器暂不支键${k}的数组配置，数组配置长度只允许为2或3`)
  }

  const opposition = len === 2
  if (opposition) {
    const [Truthy, Falsy] = v
    return function () {
      const pv = this[pk]
      const result = pv ? Truthy : Falsy
      return variableReplace(result, pv)
    }
  }

  const ternary = len === 3
  if (ternary) {
    const [condition, Truthy, Falsy] = v
    return function () {
      const pv = this[pk]
      const result = pv === condition ? Truthy : Falsy
      return variableReplace(result, pv)
    }
  }
}

// 对象模式
const objMode = (pk, v) => {
  // 原生getter和setter，https://cn.vuejs.org/v2/api/#computed
  if (is('Function', v.get) && is('Function', v.set)) {
    return v
  }

  return function () {
    const pv = this[pk]
    const preset = v[pv]
    return preset ? variableReplace(preset, pv) : pv
  }
}

// 首字母小写化
const lowercaseInitials = cached((v) => v.charAt(0).toLowerCase() + v.slice(1))
