<template>
	<view class="t-stepper" @click="click">
		<text class="stepper-action" @click="decrease" :class="[Disabled, DecreaseDisabled, Color, Rounded, Shadow, Size]">-</text>
		<input
			type="number"
			v-model="temp"
			:style="[InputWidth]"
			:disabled="disabled"
			class="stepper-input"
			:class="[Disabled, Color, Rounded, Shadow, Size]"
			@blur="blur"
			@input="change"
			@confirm="confirm"
		/>
		<text class="stepper-action" @click="increase" :class="[Disabled, IncreaseDisabled, Color, Rounded, Shadow, Size]">+</text>
	</view>
</template>

<script>
import { FieldTrack } from '../t-field/mixin'
import { $P, $C, VModel, Rounded, Shadow, Emits, Color, Size } from '../../core'

/**
 * Stepper 步进器
 * @description 步进器组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/stepper.html
 *
 * @property {Number} step 步长，默认为 1
 * @property {Number} max 最大值，默认为 10000
 * @property {Number} min 最小值，默认为 -10000
 * @property {Boolean} disabled 禁用，默认为 false
 * @property {String} inputWidth 输入框宽度，默认为 50rpx
 * @property {Boolean} integer = [true|false] 只允许整数，默认为 false
 *
 * @property {Boolean} light = [true|false] 高亮，默认为 false
 * @property {Boolean} outline = [true|false] 轮廓，默认为 false
 *
 * @property {String} color = [primary|secondary|accent|neutral|base|ghost|info|success|warning|error|...] 颜色，默认为 base
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
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为 none
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 base
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 * 	@value 2xl 超级大
 * 	@value 3xl 无敌大
 * 	@value full 圆
 *
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 *
 * @event {Function} blur 失焦事件
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 * @event {Function} confirm 确认事件
 */
export default {
	name: 't-stepper',
	mixins: [
		Shadow(),
		Emits(['click']),
		VModel({ value: 0 }),
		FieldTrack('stepper'),
		Rounded({ rounded: 'base' }),
		Color({ color: 'base', light: true, inject: 'stepper' }),
		Size({
			presets: {
				xs: 'w-4 h-4 text-xs',
				sm: 'w-5 h-5 text-sm',
				md: 'w-6 h-6 text-md',
				lg: 'w-7 h-7 text-lg'
			}
		})
	],
	emits: [
		'blur', // 失焦事件
		'change', // 变更事件
		'confirm' // 确认事件
	],
	props: $P({
		step: 1, // 步长
		max: 10000, // 最大值
		min: -10000, // 最小值
		disabled: false, // 禁用
		inputWidth: '50rpx', // 输入框宽度
		integer: false // 只允许整数输入
	}),
	data() {
		return {
			temp: 0 // 临时变量，用于动态设置input的值
		}
	},
	computed: $C({
		Disabled: 'stepper-disabled', // 禁用
		IncreaseDisabled: 'stepper-disabled', // 增加禁用样式
		DecreaseDisabled: 'stepper-disabled', // 减少禁用样式
		// 减少禁用
		decreaseDisabled() {
			const { VModelValue, min } = this
			return VModelValue <= min
		},
		// 增加禁用
		increaseDisabled() {
			const { VModelValue, max } = this
			return VModelValue >= max
		},
		// 输入框宽度
		InputWidth() {
			const { inputWidth } = this
			return inputWidth ? { width: inputWidth } : null
		}
	}),
	watch: {
		VModelValue: {
			immediate: true,
			handler(v) {
				this.temp = v
			}
		},
		temp(v) {
			this.updateVModelValue(v)
		}
	},
	methods: {
		// 输入事件
		change(e) {
			let v = e.detail.value
			this.updateVModelValue(v)
			this.$emit('change', v)
		},
		// 确认事件
		confirm(e) {
			let v = e.detail.value
			this.$emit('confirm', v)
		},
		// 失焦事件
		blur(e) {
			let v = e.detail.value

			v = this.format(v)

			this.$nextTick(() => {
				this.updateTemp(v)
			})

			this.FieldTrack({ value: v, trigger: 'onBlur' })
			this.$emit('blur', e)
		},
		// 格式化
		format(v) {
			const notEmpty = v !== ''
			const shouldParseInt = this.integer && notEmpty
			if (shouldParseInt) {
				v = parseInt(v)
			}

			if (this.increaseDisabled && v > this.max) {
				v = this.max
			}

			if (this.decreaseDisabled && v < this.min) {
				v = this.min
			}

			return v
		},
		// 增加
		increase() {
			const abled = !this.disabled && !this.increaseDisabled
			if (abled) {
				const useCount = this.useFormatCount(this.temp, this.step)
				const v = useCount((left, right) => left + right)

				this.updateVModelValue(v)
			}
		},
		// 减少
		decrease() {
			const abled = !this.disabled && !this.decreaseDisabled
			if (abled) {
				const useCount = this.useFormatCount(this.temp, this.step)
				const v = useCount((left, right) => left - right)
				this.updateVModelValue(v)
			}
		},
		// 更新中间值
		updateTemp(v) {
			this.temp = v
		},
		// 格式化计算，处理精度问题
		useFormatCount(left, right) {
			let [_left, leftSuffix] = String(left).split('.')
			const leftSuffixLen = leftSuffix ? leftSuffix.length : 0

			let [_right, rightSuffix] = String(right).split('.')
			const rightSuffixLen = rightSuffix ? rightSuffix.length : 0

			const maxSuffixLen = Math.max(leftSuffixLen, rightSuffixLen)

			const pow = Math.pow(10, maxSuffixLen)

			const useCount = count => {
				const origin = count(left * pow, right * pow) / pow
				const result = origin === 0 ? origin : origin.toFixed(maxSuffixLen)
				return Number(result)
			}
			return useCount
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';
.t-stepper {
	.flex;
	.text-center;
	.items-center;
}

.stepper-active() {
	// 轮廓
	&.stepper-outline {
		.text-white;
	}
	// 高亮
	&.stepper-light {
		.text-white;
		.bg-opacity-100;
	}

	&.stepper {
		// 主要
		&-primary {
			.bg-primary-focus;
		}
		// 次要
		&-secondary {
			.bg-secondary-focus;
		}
		// 强调
		&-accent {
			.bg-accent-focus;
		}
		// 中和
		&-neutral {
			.bg-neutral-focus;
		}
		// 基础
		&-base {
			.bg-base-focus;
		}
		// 信息
		&-info {
			.bg-info-focus;
		}
		// 成功
		&-success {
			.bg-success-focus;
		}
		// 警告
		&-warning {
			.bg-warning-focus;
		}
		// 错误
		&-error {
			.bg-error-focus;
		}
	}
}

.stepper {
	&-input {
		.px-1;
		.mx-1;
		.font-bold;
	}

	&-action {
		.flex;
		.items-center;
		.justify-center;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */

		transition: all 0.12s ease-in-out;
		&:active {
			.stepper-active();
			transform: scale(0.85);
		}
	}
}

// 禁用
.stepper-disabled {
	.opacity-30;
	.bg-opacity-40 !important;

	pointer-events: none;
	transition: all 0.12s ease-in-out;
	transform: scale(1) !important;
}
</style>
