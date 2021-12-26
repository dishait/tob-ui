# tob-ui-core 🐳

TOB UI 组件库的核心，用于支撑组件的快速开发！

<br />

## Motivation 🐇

1. 提高组件开发效率
2. 降低组件的维护成本
3. 抽离重复逻辑，缩小包体积

<br />

## Features 🦌

### 1. Hack 🐼

    vue options-api 的 hack，提供 options 之外的额外常用配置

<br />

#### Props 属性

类型推断

```js
import { $P } from 'tob-ui-core'
export default {
  props: $P({
    title: '',
    visible: false,
  }),
}
```

等价于

```js
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
```

<br />

#### Computed 计算属性

    逻辑简化

props 变量替换

```js
import { $C, $P } from 'tob-ui-core'
export default {
  props: $P({
    size: 'sm',
  }),
  computed: $C({
    Size: 'text-$', // $将动态替换为props的size，即输出text-sm
  }),
}
```

Truthy 时应用

```js
import { $C, $P } from 'tob-ui-core'
export default {
  props: $P({
    theme: '',
    visible: false,
  }),
  computed: $C({
    // Theme的值只在theme为truthy时应用
    // 即非空字符串时应用
    Theme: 'text-dark',
    // Visible的值只在visible为truthy时应用
    // 即为true时应用
    Visible: 'show',
  }),
}
```

对立判断

```js
import { $C, $P } from 'tob-ui-core'
export default {
  props: $P({
    dark: true,
    theme: 'dark',
    size: 'sm',
  }),
  computed: $C({
    // dark为true时应用text-white，反之则应用text-dark
    Dark: ['text-white', 'text-dark'],
    // 判断theme是否为dark
    // 是则应用text-white
    // 否则应用text-dark
    Theme: ['dark', 'text-white', 'text-dark'],
    // 判断size是否为lg
    // 是则应用text-dark
    // 否则应用text-<size>，size为动态量
    // 例如size为base，则Size的值为text-base
    Size: ['lg', 'text-dark', 'text-$'],
  }),
}
```

对象映射

```js
import { $C, $P } from 'tob-ui-core'
export default {
  props: $P({
    color: 'info',
  }),
  computed: $C({
    // color为对应的键时，将应用对应的值
    // 例如color为info，则Color的值为text-info
    // 又例如color为warning，则Color的值为text-warning

    // 当color的值无对应的键对应，则取值color
    // 例如color为text-dark时，则Color的值为text-dark
    Color: {
      info: 'text-info',
      warning: 'text-warning',
      error: 'bg-error text-error',
    },
  }),
}
```

原生兜底

```js
import { $C, $P } from 'tob-ui-core'
export default {
  props: $P({
    color: 'info',
    visible: false,
  }),
  computed: $C({
    // 遇到函数时将走原生计算属性模式
    Theme() {
      const { color, visible } = this
      const isDark = color === 'dark'
      const canShow = isDark && visible
      return canShow ? 'show' : null
    },
  }),
}
```

<br/>

#### Methods 方法

    逻辑复用

切换模式

```js
import { $M } from 'tob-ui-core'
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: $M({
    toggle: true, // 开启toggle
    handleClick() {
      // 将对visible不断取反
      this.toggle('visible')
    },
    show() {
      // 将设置visible为true
      this.toggle('visible', true)
    },
    hidden() {
      // 将设置visible为false
      this.toggle('visible', false)
    },
  }),
}
```

<br />

### 2. Design 🕊

    通用的设计系统
    mixin 时设置默认，同时暴露 props 用于用户修改

<br />

#### Color

    颜色

默认模式

```js
import { Color } from 'tob-ui-core'
export default {
  // 深色底，白色字
  mixins: [Color()],
}
```

高亮模式

```js
import { Color } from 'tob-ui-core'
export default {
  // 浅色底，深色字
  mixins: [Color({ light: true })],
}
```

轮廓模式

```js
import { Color } from 'tob-ui-core'
export default {
  // 深色边框，深色字，白色底
  mixins: [Color({ outline: true })],
}
```

预设

```js
import { Color } from 'tob-ui-core'
export default {
  mixins: [
    Color({
      presets: {
        dark: 'text-white bg-dark',
        light: 'text-dark bg-white',
      },
    }),
  ],
}
```

<br />

#### Rounded

    圆角

```js
import { Rounded } from 'tob-ui-core'
export default {
  mixins: [Rounded()],
}
```

<br />

#### Shadow

    阴影

```js
import { Shadow } from 'tob-ui-core'
export default {
  mixins: [Shadow()],
}
```

<br />

#### Size

预设

    尺寸

```js
import { Size } from 'tob-ui-core'
export default {
  mixins: [
    Size({
      sm: 'w-4 h-4 p-2',
      base: 'w-6 h-6 p-3',
      lg: 'w-8 h-8 p-3',
    }),
  ],
}
```

<br />

#### Flex

    justify与align

```js
import { Flex } from 'tob-ui-core'
export default {
  mixins: [Flex()],
  methods: {
    handle() {
      this.Justify // 主轴属性
      this.Align // 交叉轴属性
      this.Direction // 主轴属性
    },
  },
}
```

<br />

#### VModel

    vue3和vue2兼容是uniapp特有的，
    非uniapp环境下仅支持vue2

```js
import { VModel } from 'tob-ui-core'
export default {
  mixins: [VModel()],
  watch: {
    // 监听v-model值变化
    VModelValue(v) {
      this.$emit('change', v)
    },
  },
  methods: {
    handle() {
      // 获取v-model值
      this.VModelValue
      // 更新v-model值
      this.updateVModelValue('我是更新的值')
    },
  },
}
```

<br />

#### Effects

    副作用集合

供给 effects

```js
import { ProvideEffects } from 'tob-ui-core'
export default {
  mixins: [
    ProvideEffects({
      name: 'Foo',
    }),
  ],
  methods: {
    handle() {
      // 获取effect
      this.showEffect('custom')
      // 收集effect
      this.trackEffect('custom', () => 1)
      // 触发effect
      this.triggerEffect('custom', 100)
      // 触发所有effect
      this.triggerAllEffect(100)
      // 清理所有effect
      this.clearEffects()
      // 销毁effect
      this.destoryEffect('custom')
      // 判断effect存在
      this.hasEffect('custom')
      // 获取effect数量
      this.sizeEffects()
    },
  },
}
```

注入 effects

```js
import { InjectEffects } from 'tob-ui-core'
export default {
  // 必须以供给端相同的命名Foo为参数
  mixins: [
    InjectEffects({
      name: 'Foo',
    }),
  ],
  methods: {
    handle() {
      // 获取供给端effect
      this.FooShowEffect('custom')
      // 收集供给端effect
      this.FooTrackEffect('custom', () => 1)
      // 触发供给端effect
      this.FooTriggerEffect('custom', 100)
      // 触发供给端所有effect
      this.FooTriggerAllEffect(100)
      // 清理供给端所有effect
      this.FooClearEffects()
      // 销毁供给端effect
      this.FooDestoryEffect('custom')
      // 判断供给端effect存在
      this.FooHasEffect('custom')
      // 获取供给端effect数量
      this.FooSizeEffects()
    },
  },
}
```

<br />

#### Counter

    计数器

供给 counter

```js
import { ProvideCounter } from 'tob-ui-core'
export default {
  mixins: [
    ProvideCounter({
      name: 'Foo',
    }),
  ],
  methods: {
    handle() {
      // 获取counter
      this.counter
    },
  },
}
```

注入 counter

```js
import { InjectCounter } from 'tob-ui-core'
export default {
  // 必须以供给端相同的命名Foo为参数
  mixins: [
    InjectCounter({
      name: 'Foo',
    }),
  ],
  methods: {
    handle() {
      // 获取计数器
      this.FooShowCounter()
      // 计数器递增
      this.FooIncCounter()
      // 计数器递减
      this.FooDecCounter()
      // 使用计数器，从起始值递增
      const zero = this.FooUseCounter() // 输出0
      const one = this.FooUseCounter() // 输出1
    },
  },
}
```

<br />

#### Emits

    暴露事件

```js
import { Emits } from 'tob-ui-core'

export default {
  mixins: [Emits(['click'])],
  methods: {
    handle() {
      const e = '假装是$event'
      // 触发点击事件
      this.click(e)
    },
  },
}
```

<br />

### 3. Tools 🐬

    工具库，主要用来支撑 Hack 和 Design
    同时整合组件库的通用逻辑

<br />

## Inspire 🐋

    该模块受以下技术启发

1. TypeScript
2. @vue/reactivity
