<template>
	<view class="t-col" @click="click" :style="[Style]">
		<slot />
	</view>
</template>

<script>
import { $P, Emits } from '../../core'

/**
 * Row 布局列
 * @description 布局列组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/layout.html
 *
 * @property {Number} span = [1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24] 跨度，一行分为 24 份跨度，默认为 1
 * @property {Number} offset = [1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24] 偏移，与跨度相同计算规则，默认为 0
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-col',
	mixins: [Emits(['click'])],
	props: $P({
		span: 1,
		offset: 0
	}),
	inject: [
		'RowMx', // 左右边距
		'RowGutter' // 间隔
	],
	computed: {
		// 自定义style
		Style() {
			let { span, offset, RowGutter, RowMx } = this
			span = parseInt(span)
			offset = parseInt(offset)
			RowMx = RowMx ? RowMx : '0rpx'
			RowGutter = RowGutter ? RowGutter : '0rpx'
			// #ifdef MP
			let eachWidth = `(750rpx - ${RowMx} * 2) / 24`
			// #endif
			// #ifndef MP
			let eachWidth = `100% / 24`
			// #endif

			return {
				paddingLeft: RowGutter,
				paddingRight: RowGutter,
				marginLeft: `calc(${eachWidth} * ${offset})`,
				// #ifdef MP
				width: `calc(${eachWidth} * ${span} - ${RowGutter} * 2)`,
				// #endif
				// #ifndef MP
				width: `calc(${eachWidth} * ${span})`
				// #endif
			}
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-col {
	.text-center;
	.inline-block;
}
</style>
