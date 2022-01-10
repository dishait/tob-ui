<template>
	<view class="t-row" :class="[Align, Justify]" :style="[Style]" @click="click">
		<slot />
	</view>
</template>

<script>
import { $P, $C, Flex, Emits } from '../../core'

/**
 * Row 布局行
 * @description 布局行组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/layout.html
 *
 * @property {String} mx = [0rpx|10rpx|20rpx|30rpx|....] 左右边距
 * @property {String} my = [0rpx|10rpx|20rpx|30rpx|....] 上下边距
 * @property {String} gutter = [0rpx|10rpx|20rpx|30rpx|....] 栅格间隔，默认为空
 *
 * @property {String} align = [start|center|end|baseline|stretch] 交叉轴对齐方式，默认为 stretch 填充整个容器高度
 *
 *  @value start 头部
 * 	@value end 尾部
 * 	@value center 中间
 * 	@value baseline 文字基线对齐
 * 	@value stretch 填充整个容器高度
 *
 * @property {String} justify = [start|end|around|center|between|evenly] 主轴对齐方式，默认为 start 头部
 *
 *  @value start 头部
 * 	@value end 尾部
 *  @value around 等比
 * 	@value center 中间
 *  @value between 靠两头
 *  @value evenly 等距
 *
 * @event {Function} click 点击事件
 */
export default {
	mixins: [Flex(), Emits(['click'])],
	props: $P({
		mx: '',
		my: '',
		gutter: ''
	}),
	computed: $C({
		Style() {
			const { mx, my } = this
			return {
				marginTop: my,
				marginLeft: mx,
				marginRight: mx,
				marginBottom: my
			}
		}
	}),
	provide() {
		return {
			RowMx: this.mx, // 左右边距
			RowGutter: this.gutter // 间隔
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-row {
	.flex;
}
</style>
