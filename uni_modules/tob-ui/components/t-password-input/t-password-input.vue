<template>
	<view class="t-password-input" @click="click" :style="[Style]">
		<text
			class="password-input-item"
			:class="[focus && FocusIndex === i && 'password-input-item-twinkle', FocusIndex > i && Visible, Size, Rounded, Color, Shadow]"
			v-for="(v, i) of length"
			:key="v"
		>{{ visible ? values[i] || '' : '' }}</text>
	</view>
</template>

<script>
import { $P, $C, Emits, Size, Rounded, Color, Shadow } from '../../core'

/**
 * PasswordInput 密码输入框
 * @description 密码输入框组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/passwordInput.html
 * 
 * @property {String} values 值
 * @property {Number} length 长度，默认为 5
 * @property {Boolean} focus = [true|false] 聚焦，默认为 true
 * @property {Boolean} visible = [true|false] 可见性，默认为 false
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为 100
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
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为 base
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
 * @event {Function} change 变更事件
 */
export default {
	name: 't-password-input',
	mixins: [
		Shadow(),
		Emits(['click', 'change']),
		Rounded({ rounded: 'base' }),
		Color({ color: 'base', light: true }),
		Size({
			presets: {
				xs: 'text-xs',
				sm: 'text-sm',
				md: 'py-1 text-md',
				lg: 'py-1 text-lg'
			}
		}),
	],
	props: $P({
		values: '', // 值
		length: 5, // 长度
		zIndex: 100, // 层级
		focus: true, // 聚焦
		visible: false // 可见性
	}),
	computed: $C({
		// 聚焦标识
		FocusIndex() {
			const { values } = this
			return values.length
		},
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		},
		// 可见性
		Visible: [null, 'password-input-item-point']
	}),
	watch: {
		values(v) {
			this.change(v)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
// 容器
.t-password-input {
	.flex;
	.w-full;
	.font-bold;
	position: relative;
}

// 项目
.password-input-item {
	.mx-1;
	.flex;
	.flex-1;
	.items-center;
	.justify-center;

	min-height: 60rpx;

	// 闪烁的 |
	&-twinkle::after {
		content: "|";
		animation: 0.6s steps(36) infinite alternate twinkle;
	}

	// 点占位
	&-point::after {
		.w-2;
		.h-2;
		.rounded-full;

		content: "";
		background-color: currentColor;
	}
}

// 闪烁动画
@keyframes twinkle {
	0% {
		opacity: 10%;
	}

	100% {
		opacity: 1;
	}
}
</style>
