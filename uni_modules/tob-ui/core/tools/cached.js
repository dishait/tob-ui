// 缓存函数
export default (fn) => {
  const cache = Object.create(null)
  return (str) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
