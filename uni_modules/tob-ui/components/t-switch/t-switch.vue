<template>
	<view class="t-switch-label" @click="click" :class="[Disabled]">
		<view class="t-switch" :class="[Checked, Color, Rounded, Size]" />
		<slot />
	</view>
</template>

<script>
import { FieldTrack } from "../t-field/mixin"
import { $P, $C, $M, Emits, Color, Size, Rounded, VModel, createColorPresets } from '../../core'

/**
 * Switch 开关
 * @description 开关组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/switch.html
 *
 * @property {Boolean} disabled = [true|false] 禁用
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
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 * 
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 full
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
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-switch',
	mixins: [
		Emits(['change']),
		FieldTrack('t-switch'),
		VModel({ value: false }),
		Rounded({ rounded: 'full' }),
		Color({ color: 'base', presets: createColorPresets('switch') }),
		Size({
			presets: {
				xs: 'switch-xs',
				sm: 'switch-sm',
				md: 'switch-md',
				lg: 'switch-lg',
			}
		})
	],
	emits: ['click'],
	props: $P({
		disabled: false // 禁用
	}),
	computed: $C({
		Disabled: 'switch-disabled', // 禁用
		// 选中状态
		Checked() {
			const { VModelValue } = this
			return VModelValue && 'switch-checked'
		}
	}),
	watch: {
		VModelValue(v) {
			// 触发变更事件
			this.change(v)
		}
	},
	methods: $M({
		toggle: true,
		// 点击事件
		click() {
			this.updateVModelValue(!this.VModelValue)
			this.$emit('click')
		}
	})
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

// label容器
.t-switch-label {
	.inline-flex;
	.items-center;
	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

// 基础样式
.t-switch {
	.mr-1;
	.bg-opacity-100;
	.opacity-60;
	.inline-block;
	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */

	border: 1.5px solid;
	transition: 0.25s ease-in-out;
	transition-property: box-shadow, opacity;
	box-shadow: calc(var(--offset) * -1) 0 0 2px #ffffff inset,
		0 0 0 2px #ffffff inset;
}

// 选中样式
.switch-checked {
	.opacity-100;
	box-shadow: var(--offset) 0 0 2px #ffffff inset, 0 0 0 2px #ffffff inset;
}

// 颜色
.switch {
	// 主要
	&-primary {
		.bg-primary;
		.border-primary;
	}

	// 次要
	&-secondary {
		.bg-secondary;
		.border-secondary;
	}

	// 强调
	&-accent {
		.bg-accent;
		.border-accent;
	}

	// 中和
	&-neutral {
		.bg-neutral;
		.border-neutral;
	}

	// 基础
	&-base {
		.bg-base;
		.border-base;
	}

	// 信息
	&-info {
		.bg-info;
		.border-info;
	}

	// 成功
	&-success {
		.bg-success;
		.border-success;
	}

	// 警告
	&-warning {
		.bg-warning;
		.border-warning;
	}

	// 错误
	&-error {
		.bg-error;
		.border-error;
	}
}

// 尺寸
.switch {
	// 小
	&-xs {
		--offset: 0.75rem;
		height: 1.25rem;
		width: 2rem;
	}

	// 小
	&-sm {
		--offset: 1rem;
		height: 1.2rem;
		width: 2.2rem;
	}

	// 基础
	&-md {
		--offset: 1.5rem;
		height: 1.5rem;
		width: 3rem;
	}

	// 大
	&-lg {
		--offset: 2rem;
		height: 2rem;
		width: 4rem;
	}
}

// 禁用
.switch-disabled {
	.opacity-50;
	cursor: not-allowed;
	pointer-events: none;
}
</style>
