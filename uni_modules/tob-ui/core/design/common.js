import $P from '../hack/props.js'

// 简化base
export const simplifyBase = (prefix, type) => {
  const isBase = type === 'base'
  return isBase ? prefix : `${prefix}-${type}`
}

// 创建数据源
export const createSource = (type, payload) => {
  if (type === 'props') {
    return {
      props: $P(payload),
    }
  }

  if (type === 'data') {
    return {
      data() {
        return payload
      },
    }
  }

  throw new Error('sourceType只支持props和data')
}
