<template>
	<view class="t-input">
		<input
			class="input"
			:class="[FocusStatus, Color, Size, Disabled, Primordial, Rounded]"
			:type="Type"
			:cursor="cursor"
			:value="VModelValue"
			:disabled="disabled"
			:auto-blur="autoBlur"
			:maxlength="maxlength"
			:password="applyPassword"
			:placeholder="Placeholder"
			:confirm-type="confirmType"
			:confirm-hold="confirmHold"
			:hold-keyboard="holdKeyboard"
			:selection-end="selectionEnd"
			:cursor-spacing="cursorSpacing"
			:adjust-position="adjustPosition"
			:selection-start="selectionStart"
			v-on:keyup.enter="confirm"
			@blur="blur"
			@focus="focus"
			@input="change"
			@confirm="confirm"
			@keyboardheightchange="keyboardheightchange"
		/>

		<t-icon v-if="ClearIconVisible" class="input-right-icon" type="close-circle" @click="reset" />

		<t-icon
			v-if="PasswordIconVisible"
			class="input-right-icon"
			:type="PasswordIcon"
			@click="togglePasswordVisible"
		/>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { FieldTrack } from '../t-field/mixin'
import { $P, $C, Color, createColorPresets, Emits, VModel, Size, Rounded } from '../../core'

/**
 * Input 输入框
 * @description 输入框组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/input.html
 *
 * @property {String} placeholder 占位符
 * @property {Number} maxlength 最大长度，默认为 -1, 无限长
 * @property {Boolean} disabled = [true|false] 禁用，默认为 false
 * @property {Boolean} primordial = [true|false] 原生样式，默认为 false
 * @property {Number} cursor = [0|....] 指定 focus 时的光标位置，默认为 0
 * @property {Boolean} autoBlur = [true|false] 键盘收起，自动失去焦点（只支持app）默认为false
 * @property {Boolean} adjustPosition = [true|false] 键盘弹起时，是否自动上推页面, 默认为true。支持	App-Android（vue 页面 softinputMode 为 adjustResize 时无效，使用 x5 内核时无效）、微信小程序、百度小程序、QQ小程序
 * 
 * @property {Number} selectionStart 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用，默认为 -1
 * @property {Number} selectionEnd 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用，默认为 -1
 * 
 * @property {Boolean} holdKeyboard = [true|false] focus时，点击页面的时候不收起键盘(微信小程序2.8.2)，默认为 false 收起
 * 
 * @property {Boolean} confirmHold = [true|false] 点击键盘右下角按钮时是否保持键盘不收起，默认为 false 收起
 * 
 * @property {Number} cursorSpacing 指定光标与键盘的距离，单位 px， 默认为0。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离，支持App、微信小程序、百度小程序、QQ小程序
 *
 * @property {String} confirmType = [send|search|next|go|done] 设置键盘右下角按钮的文字，仅在 type="text" 时生效
 *
 * 	@value send 文本
 * 	@value search 搜索
 * 	@value next 下一个
 * 	@value go 前往
 * 	@value done 完成
 *
 * @property {String} type = [text|number|digit|idcard|password] 类型，默认为 text
 *
 * 	@value text 文本
 * 	@value number 数字
 * 	@value idcard 身份证
 * 	@value password 密码
 * 	@value digit 带小数点的数字
 *
* @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为base
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
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为base
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
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 *
 * @event {Function} blur 失焦事件
 * @event {Function} click 点击事件
 * @event {Function} reset 重置事件
 * @event {Function} focus 聚焦事件
 * @event {Function} change 变更事件
 * @event {Function} confirm 确认事件
 * @event {Function} keyboardheightchange 键盘高度变化事件
 */
export default {
	name: 't-input',
	components: {
		tIcon
	},
	mixins: [
		FieldTrack('input'),
		VModel({ value: '' }),
		Rounded({ rounded: 'base' }),
		Color({ color: 'base', presets: createColorPresets('input') }),
		Emits(['click', 'keyboardheightchange']),
		Size({
			presets: {
				xs: 'px-1 py-1 text-xs',
				sm: 'px-2 py-1 text-sm',
				md: 'px-2 py-1 text-md',
				lg: 'px-2 py-2 text-lg'
			}
		})
	],
	emits: ['focus', 'blur', 'confirm', 'change', 'reset'],
	props: $P({
		type: 'text',
		cursor: 0,
		maxlength: -1,
		disabled: false,
		autoBlur: false,
		placeholder: '',
		confirmType: '',
		selectionEnd: -1,
		cursorSpacing: 0,
		primordial: false,
		confirmHold: false,
		selectionStart: -1,
		holdKeyboard: false,
		adjustPosition: true,
	}),
	data() {
		return {
			focusStatus: false, // 聚焦
			passwordVisible: false // 密码可见性
		}
	},
	computed: $C({
		Disabled: 'input-disabled', // 禁用
		FocusStatus: 'input-focus', // 聚焦状态
		Primordial: 'input-primordial', // 原生模式
		// 类型
		Type() {
			const { type, applyPassword } = this
			return !applyPassword ? 'text' : type
		},
		// 占位符
		Placeholder() {
			const { placeholder, disabled } = this
			if (disabled) {
				return '已禁用'
			}
			return placeholder
		},
		// 清除图标显示
		ClearIconVisible() {
			const { isPassword, HasValue } = this
			return !isPassword && HasValue
		},
		// 判断是否有值
		HasValue() {
			return this.VModelValue.length > 0
		},
		// 密码图标显示
		PasswordIconVisible() {
			const { isPassword, HasValue } = this
			return isPassword && HasValue
		},
		// 密码图标
		PasswordIcon() {
			const { passwordVisible } = this
			return passwordVisible ? 'eye-close' : 'eye'
		},
		// 密码类型
		isPassword() {
			const { type } = this
			return type === 'password'
		},
		// 应用密码形式
		applyPassword() {
			const { isPassword, passwordVisible } = this
			return isPassword && !passwordVisible
		}
	}),
	methods: {
		// 确定事件
		confirm(e) {
			this.$emit('confirm', e)
			this.updateVModelValue(e.detail.value)
		},
		// 变更事件
		change(e) {
			this.$emit('change', e)
			this.updateVModelValue(e.detail.value)
		},
		// 重置事件
		reset() {
			this.$emit('reset')
			this.updateVModelValue('')
		},
		// 聚焦事件
		focus(e) {
			this.updateFocusStatus(true)
			this.$emit('focus', e)
		},
		// 失焦事件
		blur(e) {
			this.updateFocusStatus(false)
			this.FieldTrack({ value: this.VModelValue, trigger: 'onBlur' })
			this.$emit('blur', e)
		},
		// 更新聚焦状态
		updateFocusStatus(v) {
			this.focusStatus = v
		},
		// 切换可见性
		togglePasswordVisible() {
			this.passwordVisible = !this.passwordVisible
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
// 容器
.t-input {
	.w-full;
	.relative;
}

// 默认样式
.input {
	.pr-6;
	.border;
	transition: box-shadow 0.25s ease-in-out;
}

// 右侧图标
.input-right-icon {
	.right-0;
	.absolute;
	top: 50%;
	color: #adbac7;
	transform: translate(-20rpx, -50%);

	/* #ifndef MP */
	.cursor-pointer;
	/* #endif */
}

// 聚焦
.input-focus {
	box-shadow: 0 0 0 4px rgba(var(--input-color), 15%);
}

// 颜色
.input {
	// 主要
	&-primary {
		.border-primary;
		--input-color: var(--primary);
	}

	// 次要
	&-secondary {
		.border-secondary;
		--input-color: var(--secondary);
	}

	// 强调
	&-accent {
		.border-accent;
		--input-color: var(--accent);
	}

	// 中和
	&-neutral {
		.border-neutral;
		--input-color: var(--neutral);
	}

	// 基础
	&-base {
		.border-base;
		--input-color: var(--base);
	}

	// 信息
	&-info {
		.border-info;
		--input-color: var(--info);
	}

	// 成功
	&-success {
		.border-success;
		--input-color: var(--success);
	}

	// 警告
	&-warning {
		.border-warning;
		--input-color: var(--warning);
	}

	// 错误
	&-error {
		.border-error;
		--input-color: var(--error);
	}
}

// 禁用
.input-disabled {
	.opacity-50;
	pointer-events: none;
}

// 原生样式
.input-primordial {
	.p-0;
	.pr-6;
	border: none;
	box-shadow: none;
}
</style>
