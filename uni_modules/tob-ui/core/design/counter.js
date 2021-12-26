import { not } from '../tools/types.js'

// 提供计数器依赖
export const ProvideCounter = name => {
  if (not('String', name)) {
    throw new Error('counter的依赖配置必须包含name且类型为字符串')
  }
  return {
    data() {
      return {
        counter: 0,
      }
    },
    provide() {
      return {
        // 使用计数器
        [`${name}UseCounter`]: () => this.counter++,
        // 获取计数器
        [`${name}ShowCounter`]: () => this.counter,
        // 计数器递增
        [`${name}IncCounter`]: () => ++this.counter,
        // 计数器递减
        [`${name}DecCounter`]: () => --this.counter,
      }
    },
  }
}

// 注入计算器依赖
export const InjectCounter = name => {
  if (not('String', name)) {
    throw new Error('counter的注入配置必须包含name且类型为字符串')
  }

  return {
    data() {
      return {
        counter: this[`${name}UseCounter`](),
      }
    },
    inject: {
      // 使用计数器
      [`${name}UseCounter`]: {
        default: () => {},
      },
      // 获取计数器
      [`${name}ShowCounter`]: {
        default: () => {},
      },
      // 计数器递增
      [`${name}IncCounter`]: {
        default: () => {},
      },
      // 计数器递减
      [`${name}DecCounter`]: {
        default: () => {},
      },
    },
  }
}
