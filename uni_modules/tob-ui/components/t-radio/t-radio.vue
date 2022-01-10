<template>
	<view @click="click" class="t-radio-label" :class="[Disabled]">
		<view class="radio" :class="[Checked, Color, Size, Rounded]" />
		<slot />
	</view>
</template>

<script>
import { $P, $C, $M, Color, Size, Rounded, InjectEffects, createColorPresets } from '../../core'

/**
 * Radio 单选框
 * @description 单选框组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/radio.html
 *
 * @property {Boolean} disabled = [true|false] 禁用
 * @property {String} value 标识，会被 t-radio-group 记录
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
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error] 颜色，默认为 base
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
 * @event {Function} click 点击事件
 */
export default {
	name: 't-radio',
	mixins: [
		InjectEffects('RadioGroup'),
		Rounded({ rounded: 'full' }),
		Color({ color: 'base', presets: createColorPresets('radio') }),
		Size({
			presets: {
				xs: 'w-2 h-2',
				sm: 'w-3 h-3',
				md: 'w-4 h-4',
				lg: 'w-5 h-5'
			}
		})
	],
	emits: ['click'],
	data() {
		return {
			checked: false // 选中
		}
	},
	props: $P({
		disabled: false, // 是否禁用
		value: '', // 标识，会被radio-group的change记录
	}),
	inject: ['RadioGroupUpdateChecked'],
	computed: $C({
		Checked: 'radio-checked', // 选中
		Disabled: 'radio-disabled' // 禁用
	}),
	methods: $M({
		toggle: true,
		// 点击事件
		click(e) {
			this.RadioGroupUpdateChecked(this.value)
			this.$emit('click', this.value, e)
		}
	}),
	created() {
		// 初始化
		const changeChecked = status => this.toggle('checked', status)
		this.RadioGroupTrackEffect(this.value, changeChecked)
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

// label容器
.t-radio-label {
	.inline-flex;
	.items-center;
	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

// 单选框默认样式
.radio {
	.mr-1;
	border: 1.5px solid;
	transition: background, box-shadow 0.2s ease-in-out;
}

// 生成box-shadow函数
.generateBoxShadow(@v) {
	box-shadow: 0 0 0 @v #ffffff inset, 0 0 0 @v #ffffff inset, 0 0 0;
}

// 选中状态
.radio-checked {
	animation: radiomark 0.2s ease-in-out;
	.generateBoxShadow(4px);
}

// 颜色
.radio {
	// 主要
	&-primary {
		.border-primary;
		&.radio-checked {
			.bg-primary;
		}
	}

	// 次要
	&-secondary {
		.border-secondary;
		&.radio-checked {
			.bg-secondary;
		}
	}

	// 强调
	&-accent {
		.border-accent;
		&.radio-checked {
			.bg-accent;
		}
	}

	// 中和
	&-neutral {
		.border-neutral;
		&.radio-checked {
			.bg-neutral;
		}
	}

	// 基础
	&-base {
		.border-base;
		&.radio-checked {
			.bg-base;
		}
	}

	// 信息
	&-info {
		.border-info;
		&.radio-checked {
			.bg-info;
		}
	}

	// 成功
	&-success {
		.border-success;
		&.radio-checked {
			.bg-success;
		}
	}

	// 警告
	&-warning {
		.border-warning;
		&.radio-checked {
			.bg-warning;
		}
	}

	// 错误
	&-error {
		.border-error;
		&.radio-checked {
			.bg-error;
		}
	}
}

// 禁用
.radio-disabled {
	opacity: 0.5;
	cursor: not-allowed;
	pointer-events: none;
}

// 动画
@keyframes radiomark {
	0% {
		.generateBoxShadow(12px);
	}

	50% {
		.generateBoxShadow(3px);
	}

	to {
		.generateBoxShadow(4px);
	}
}
</style>
