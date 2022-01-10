<template>
	<slider
		class="t-slider"
		:class="[Disabled]"
		:min="min"
		:max="max"
		:step="step"
		:value="VModelValue"
		:disabled="disabled"
		:show-value="showValue"
		:block-size="blockSize"
		:block-color="BlockColor"
		:active-color="ActiveColor"
		:background-color="BackgroundColor"
		@click="click"
		@change="change"
		@changing="changing"
	/>
</template>

<script>
import { FieldTrack } from '../t-field/mixin'
import { $P, $C, Emits, VModel } from '../../core'

/**
 * Slider 滑块
 * @description 滑块组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/slider.html
 *
 * @property {Number} min 最小值，默认为 0
 * @property {Number} max 最大值，默认为 100
 * @property {Boolean} disabled = [true|false] 禁用，默认为false
 * @property {Number} step 步长，取值必须大于 0，并且可被(max - min)整除，默认为 1
 *
 * @property {String} blockColor 滑块颜色，用于自定义颜色
 * @property {Boolean} showValue  = [true|false]  是否显示当前 value
 * @property {String} backgroundColor 滑块右侧背景条的颜色，用于自定义颜色
 * @property {String} activeColor 滑块左侧已选择部分的线条颜色，用于自定义颜色
 *
 * @property {Number} blockSize = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28] 滑块的大小，取值范围为 12 - 28，默认为 20
 *
 * @property {String} color = [primary|secondary|accent|neutral|base|info|success|warning|error] 颜色，默认为 base
 *
 * 	@value primary 主要
 * 	@value secondary 次要
 * 	@value accent 强调
 * 	@value neutral 中和
 * 	@value base 基础
 *
 * 	@value info 信息
 * 	@value success 成功
 * 	@value warning 警告
 * 	@value error 错误
 *
 * @event {Function} click 点击事件
 * @event {Function} changing 拖动事件
 * @event {Function} change 拖动后变更事件
 */
export default {
	name: 't-slider',
	mixins: [VModel({ value: 0 }), Emits(['click']), FieldTrack('slider')],
	emits: ['change', 'changing'],
	props: $P({
		min: 0, // 最小值
		max: 100, // 最大值
		color: 'base', // 颜色
		disabled: false, // 禁用
		blockColor: '', // 滑块颜色
		showValue: false, // 是否显示当前 value
		backgroundColor: '', // 滑块右侧背景条的颜色
		activeColor: '', // 滑块左侧已选择部分的线条颜色
		blockSize: 15, // 滑块的大小，取值范围为 12 - 28
		step: 1 // 步长，取值必须大于 0，并且可被(max - min)整除
	}),
	computed: $C({
		Disabled: 'slider-disabled',
		// 滑块颜色
		BlockColor() {
			const { color, blockColor } = this
			return blockColor ? blockColor : `rgb(var(--${color}))`
		},
		// 滑块左侧已选择部分的线条颜色
		ActiveColor() {
			const { color, activeColor } = this
			return activeColor ? activeColor : `rgb(var(--${color}), 80%)`
		},
		// 滑块右侧背景条的颜色
		BackgroundColor() {
			const { color, backgroundColor } = this
			return backgroundColor ? backgroundColor : `rgb(var(--${color}), 30%)`
		}
	}),
	methods: {
		// 拖动后变更事件
		change(e) {
			this.updateVModelValue(e.detail.value)
			this.$emit('change', e)
		},
		// 拖动事件
		changing(e) {
			this.updateVModelValue(e.detail.value)
			this.$emit('changing', e)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.slider-disabled {
	.opacity-40;
}
</style>
