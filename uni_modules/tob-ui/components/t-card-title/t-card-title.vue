<template>
	<view class="t-card-title" :class="[Size]" @click="click">
		<slot />
	</view>
</template>

<script>
import { Emits, Size } from '../../core'

/**
 * CardTitle 卡片标题
 * @description 卡片标题组件
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
	name: 't-card-title',
	mixins: [
		Emits(['click']),
		Size({
			presets: {
				xs: 'text-xs mb-1',
				sm: 'font-semibold text-sm mb-1',
				md: 'font-bold text-md mb-2',
				lg: 'font-bold text-lg mb-2'
			}
		})
	]
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-card-title {
	line-height: 1.75rem;
}
</style>
