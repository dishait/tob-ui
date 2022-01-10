<template>
	<view class="t-pendant" @click="click">
		<slot />
	</view>
</template>

<script>
import { Emits } from "../../core"

/**
 * Pendant 挂件
 * @description 挂件组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/pendant.html
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-pendant',
	mixins: [Emits(['click'])]
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-pendant {
	.relative;
	width: fit-content;
}
</style>

