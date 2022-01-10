<template>
	<view class="t-grid" @click="click">
		<slot />
	</view>
</template>

<script>
import { $P, $C, Emits } from '../../core'

/**
 * Grid 宫格
 * @description 宫格组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/grid.html
 *
 * @property {Number} column = [3|4|5|6|....] 列数，默认为 4 列
 * @property {String} gutter = [5rpx|10rpx|20rpx|....] 间隔，默认为 10rpx
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-grid',
	mixins: [Emits(['click'])],
	props: $P({
		column: 4, // 列数
		gutter: '10rpx' // 间隔
	}),
	provide() {
		return {
			GridColumn: this.column,
			GridGutter: this.gutter
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-grid {
	.w-full;
}
</style>
