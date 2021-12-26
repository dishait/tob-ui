// 类型判断
export const is = (t, v) => showType(v) === t

// 类型判断(非)
export const not = (t, v) => !is(t, v)

// 类型获取
export const showType = (v) => {
  const origin = Object.prototype.toString.call(v)
  return origin.slice(8, -1)
}

export default {
  is,
  not,
  showType,
}
