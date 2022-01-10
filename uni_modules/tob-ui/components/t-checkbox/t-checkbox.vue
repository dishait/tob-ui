<template>
	<view @click="click" class="t-checkbox-label" :class="[Disabled]">
		<view class="checkbox" :class="[Checked, Color, Size, Rounded]" />
		<slot />
	</view>
</template>

<script>
import { $P, $C, $M, Color, Size, Rounded, InjectEffects, createColorPresets } from '../../core'

/**
 * Checkbox 复选框
 * @description 复选框组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/checkbox.html
 *
 * @property {String} value 标识，会被checkbox-group记录
 * @property {Boolean} disabled = [true|false] 禁用
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
	name: 't-checkbox',
	mixins: [
		Rounded({ rounded: 'lg' }),
		InjectEffects('CheckBoxGroup'),
		Color({ color: 'base', presets: createColorPresets('checkbox') }),
		Size({
			presets: {
				xs: 'w-2 h-2',
				sm: 'w-3 h-3',
				md: 'w-4 h-4',
				lg: 'w-5 h-5'
			}
		})
	],
	data() {
		return {
			checked: false // 选中
		}
	},
	props: $P({
		disabled: false, // 是否禁用
		value: '', // 标识，会被checkbox-group的change记录
	}),
	inject: ['CheckBoxGroupUpdateCheckeds'],
	computed: $C({
		Checked: 'checkbox-checked', // 选中
		Disabled: 'checkbox-disabled' // 禁用
	}),
	methods: $M({
		toggle: true,
		// 点击事件
		click(e) {
			const { value, checked } = this
			this.CheckBoxGroupUpdateCheckeds(value)
			this.$emit('click', { value, checked }, e)
		}
	}),
	created() {
		// 初始化
		const changeChecked = status => this.toggle('checked', status)
		this.CheckBoxGroupTrackEffect(this.value, changeChecked)
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

// label容器
.t-checkbox-label {
	.inline-flex;
	.items-center;
	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

.checkbox {
	.mr-1;
	border: 1.5px solid;
}

.checkbox.checkbox-checked {
	background-repeat: no-repeat;
	animation: checkmark 0.2s ease-in-out;
	background-image: linear-gradient(
			-45deg,
			transparent 65%,
			rgb(var(--checked-bg)) 0
		),
		linear-gradient(45deg, transparent 75%, rgb(var(--checked-bg)) 0),
		linear-gradient(-45deg, rgb(var(--checked-bg)) 40%, transparent 0),
		linear-gradient(
			45deg,
			rgb(var(--checked-bg)) 30%,
			#ffffff 0,
			#ffffff 40%,
			transparent 0
		),
		linear-gradient(-45deg, #ffffff 50%, rgb(var(--checked-bg)) 0);
}

// 颜色
.checkbox {
	// 主要
	&-primary {
		.border-primary;
		&.checkbox-checked {
			.bg-primary;
		}
		--checked-bg: var(--primary);
	}

	// 次要
	&-secondary {
		.border-secondary;
		&.checkbox-checked {
			.bg-secondary;
		}
		--checked-bg: var(--secondary);
	}

	// 强调
	&-accent {
		.border-accent;
		&.checkbox-checked {
			.bg-accent;
		}
		--checked-bg: var(--accent);
	}

	// 中和
	&-neutral {
		.border-neutral;
		&.checkbox-checked {
			.bg-neutral;
		}
		--checked-bg: var(--neutral);
	}

	// 基础
	&-base {
		.border-base;
		&.checkbox-checked {
			.bg-base;
		}
		--checked-bg: var(--base);
	}

	// 信息
	&-info {
		.border-info;
		&.checkbox-checked {
			.bg-info;
		}
		--checked-bg: var(--info);
	}

	// 成功
	&-success {
		.border-success;
		&.checkbox-checked {
			.bg-success;
		}
		--checked-bg: var(--success);
	}

	// 警告
	&-warning {
		.border-warning;
		&.checkbox-checked {
			.bg-warning;
		}
		--checked-bg: var(--warning);
	}

	// 错误
	&-error {
		.border-error;
		&.checkbox-checked {
			.bg-error;
		}
		--checked-bg: var(--error);
	}
}

// 禁用
.checkbox-disabled {
	opacity: 0.5;
	cursor: not-allowed;
	pointer-events: none;
}

@keyframes checkmark {
	0% {
		background-position-y: 5px;
	}

	50% {
		background-position-y: -2px;
	}

	to {
		background-position-y: 0;
	}
}
</style>
