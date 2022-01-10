<template>
	<view class="t-card-body" :class="[Size]" @click="click">
		<slot />
	</view>
</template>

<script>
import { Emits, Size } from '../../core'

/**
 * CardBody 卡片体
 * @description 卡片体组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/card.html
 * 
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 * 
 * @event {Function} click 点击事件
 */
export default {
	name: 't-card-body',
	mixins: [
		Emits(['click']),
		Size({
			presets: {
				xs: 'p-4',
				sm: 'p-3',
				md: 'p-2',
				lg: 'p-1'
			}
		})
	]
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-card-body {
	.flex;
	.flex-col;
	flex: 1 1 auto;
}
</style>
