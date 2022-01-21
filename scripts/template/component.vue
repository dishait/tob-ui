<template>
    <view class="t-{{name}}" @click="click">
        <slot />
    </view>
</template>

<script>
import { $H } from '../../core'

const options = $H({
    designs: {
        emits: ['click'],
        open: [],
    },
    props: {},
    computed: {}
})

/**
 * {{up name}} {{desc}}
 * @description {{desc}}组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/{{type}}/{{name}}.html
 * @property {String} simple = [...] ，默认为
 * 
 * @property {String} complex = [A|B|C|...] ，默认为
 * 
 * 	@value A 描述
 * 	@value B 描述
 * 	@value C 描述
 * 
 * @event {Function} click 点击事件
 */
export default {
    name: `t-{{name}}`,
    ...options
}
</script>
