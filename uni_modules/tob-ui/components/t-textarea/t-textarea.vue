<template>
	<view class="t-textarea" :class="[Size]">
		<textarea
			class="textarea"
			:class="[Size, FocusStatus, Color, Rounded, Disabled]"
			:focus="focus"
			:fixed="fixed"
			:cursor="cursor"
			:value="VModelValue"
			:auto-blur="autoBlur"
			:disabled="disabled"
			:maxlength="maxlength"
			:auto-height="autoHeight"
			:placeholder="placeholder"
			:confirm-type="confirmType"
			:confirm-hold="confirmHold"
			:selection-end="selectionEnd"
			:hold-keyboard="holdKeyboard"
			:cursor-spacing="cursorSpacing"
			:selection-start="selectionStart"
			:adjust-position="adjustPosition"
			:show-confirm-bar="showConfirmBar"
			:placeholder-style="placeholderStyle"
			:disable-default-padding="disableDefaultPadding"
			@blur="blur"
			@input="change"
			@click="click"
			@confirm="confirm"
			@focus="handleFocus"
			@lineChange="lineChange"
			@keyboardheightchange="keyboardheightchange"
		/>
		<t-icon v-if="clearIconVisible" @click="reset" class="textarea-clear-icon" type="close-circle" />
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { FieldTrack } from '../t-field/mixin'
import { $P, $M, $C, Color, createColorPresets, Emits, VModel, Size, Rounded } from '../../core'

/**
 * Textarea 文本区
 * @description 文本区组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/textarea.html
 *
 * @property {String} placeholder 输入框为空时占位符，默认为空
 *
 * @property {String} placeholderStyle 指定 placeholder 的样式
 *
 * @property {Boolean} disabled = [true|false]  是否禁用，默认为false
 *
 * @property {Number} maxlength = [140|....] 最大输入长度，设置为 -1 的时候不限制最大长度默认为 -1。
 *
 * @property {Boolean} autoHeight = [true|false] 是否自动增高，设置auto-height时，style.height不生效。默认为false
 *
 * @property {Boolean} fixed = [true|false] 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true。默认为false。各类小程序支持。
 *
 * @property {Number} cursorSpacing = [0|....] 指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离。默认为 0。app 与各类小程序支持。
 *
 * @property {Number} cursor = [0|....] 指定 focus 时的光标位置。默认为0
 *
 * @property {String} confirmType = [done] 设置键盘右下角按钮的文字，默认为 done。微信小程序，app和 vue 支持。微信小程序 (2.16.0+)、百度小程序 (3.130.1+)、快手小程序支持。
 * 
 * 	@value send 发送
 * 	@value search 搜索
 * 	@value next 下一个
 * 	@value go 前往
 * 	@value done 完成
 *
 * @property {Boolean} showConfirmBar = [false|true] 是否显示键盘上方带有”完成“按钮那一栏，默认为 false，微信小程序、百度小程序、QQ小程序支持。
 *
 * @property {Number} selectionStart = [-1|....] 光标起始位置，自动聚焦时有效，需与selection-end搭配使用，默认为 -1.
 *
 * @property {Number} selectionEnd = [-1|....] 光标结束位置，自动聚焦时有效，需与selection-start搭配使用，默认为 -1。
 *
 * @property {Boolean} adjustPosition = [true|false] 键盘弹起时，是否自动上推页面，默认为 true。仅 App-Android（softinputMode 为 adjustResize 时无效）、微信小程序、百度小程序、QQ小程序有效
 *
 * @property {Boolean} disableDefaultPadding = [true|false] 是否去掉 iOS 下的默认内边距，默认为 false。微信小程序2.10.0、飞书小程序3.46
 *
 * @property {Boolean} holdKeyboard = [true|false] focus时，点击页面的时候不收起键盘，默认为 false。仅支持微信小程序2.8.2
 *
 * @property {Boolean} autoBlur = [true|false] 	键盘收起时，是否自动失去焦点，默认为 false，App-vue 3.0.0+ ，App-nvue不支持
 *
 * @property {Boolean} confirmHold = [false|true] 点击键盘右下角按钮时是否保持键盘不收起，默认为 false
 *
 * @property {Boolean} focus = [true|false] 聚焦，默认为 false
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
 * @event {Function} blur 失焦事件
 * @event {Function} click 点击事件
 * @event {Function} reset 重置事件
 * @event {Function} focus 聚焦事件
 * @event {Function} change 变更事件
 * @event {Function} confirm 确认事件
 * @event {Function} lineChange 输入框行数变更
 * @event {Function} keyboardheightchange 键盘高度变更事件
 */
export default {
	name: 't-textarea',
	mixins: [
		VModel({ value: '' }),
		FieldTrack('textarea'),
		Rounded({ rounded: 'base' }),
		Emits(['click', 'confirm', 'keyboardheightchange', 'lineChange']),
		Color({ color: 'base', presets: createColorPresets('textarea') }),
		Size({
			presets: {
				xs: 'h-8',
				sm: 'h-12',
				md: 'h-15',
				lg: 'h-20'
			}
		})
	],
	components: {
		tIcon
	},
	emits: [
		'change', // 变更
		'blur', // 失焦
		'reset', // 重置
		'focus' // 聚焦
	],
	props: $P({
		cursor: 0,
		focus: false,
		fixed: false,
		maxlength: -1,
		autoBlur: false,
		disabled: false,
		placeholder: '',
		cursorSpacing: 0,
		selectionEnd: -1,
		autoHeight: false,
		selectionStart: -1,
		confirmHold: false,
		confirmType: 'done',
		holdKeyboard: false,
		showConfirmBar: true,
		adjustPosition: true,
		placeholderStyle: '',
		disableDefaultPadding: false,
	}),
	data() {
		return {
			focusStatus: false // 聚焦状态
		}
	},
	computed: $C({
		Disabled: 'textarea-disabled', // 禁用
		FocusStatus: 'textarea-focus', // 聚焦
		// 清除图标显示
		clearIconVisible() {
			const { VModelValue } = this
			return VModelValue.length > 0
		}
	}),
	watch: {
		// 监听外部focus，变更聚焦状态
		focus: {
			immediate: true,
			handler(v) {
				this.focusStatus = v
			}
		}
	},
	methods: $M({
		toggle: true,
		// 重置
		reset(e) {
			this.updateVModelValue('')
			this.$emit('reset', e)
		},
		// 输入事件
		change(e) {
			this.updateVModelValue(e.detail.value)
			this.$emit('change', e)
		},
		// 失焦事件
		blur(e) {
			this.toggle('focusStatus', false)
			this.FieldTrack({ value: this.VModelValue, trigger: 'onBlur' })
			this.$emit('blur', e)
		},
		// 聚焦事件
		handleFocus(e) {
			this.toggle('focusStatus', true)
			this.$emit('focus', e)
		}
	})
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-textarea {
	.flex;
	.relative;
}

// 默认样式
.textarea {
	.p-1;
	.pr-5;
	.flex-1;
	.relative;
	height: 100%;
	min-height: 3rem;
	border: 1.5px solid;
	transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

// 聚焦
.textarea-focus {
	box-shadow: 0 0 0 4px rgba(var(--textarea-color), 15%);
}

// 颜色
.textarea {
	// 主要
	&-primary {
		.border-primary;
		--textarea-color: var(--primary);
	}

	// 次要
	&-secondary {
		.border-secondary;
		--textarea-color: var(--secondary);
	}

	// 强调
	&-accent {
		.border-accent;
		--textarea-color: var(--accent);
	}

	// 中和
	&-neutral {
		.border-neutral;
		--textarea-color: var(--neutral);
	}

	// 基础
	&-base {
		.border-base;
		--textarea-color: var(--base);
	}

	// 信息
	&-info {
		.border-info;
		--textarea-color: var(--info);
	}

	// 成功
	&-success {
		.border-success;
		--textarea-color: var(--success);
	}

	// 警告
	&-warning {
		.border-warning;
		--textarea-color: var(--warning);
	}

	// 错误
	&-error {
		.border-error;
		--textarea-color: var(--error);
	}
}

// clear图标
.textarea-clear-icon {
	.right-0;
	.absolute;
	.text-base;
	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
	top: 30rpx;
	color: #adbac7;
	transform: translate(-20rpx, -50%);
}

// 禁用
.textarea-disabled {
	opacity: 0.5;
}
</style>
