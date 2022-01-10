<template>
	<view class="dialog-mask" :class="[MaskVisible]" @click="maskClick" :style="[Style]">
		<view class="t-dialog" :class="[Visible, Rounded, Size]" @click.stop="click">
			<view class="dialog-header">{{ title }}</view>
			<view class="dialog-main">{{ content }}</view>
			<view class="dialog-footer">
				<view
					class="dialog-cancel-text"
					v-if="cancelText"
					:class="[CancelColor]"
					@click.stop="cancel"
				>{{ cancelText }}</view>
				<view
					class="dialog-confirm-text"
					v-if="confirmText"
					:class="[ConfirmColor]"
					@click.stop="confirm"
				>{{ confirmText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { $P, $C, Rounded, Emits, Size, textColorPresets } from '../../core'

/**
 * Dialog 弹出框
 * @description 弹出框组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/feedback/dialog.html
 *
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为100
 * @property {Boolean} closeOnClickMask = [false|true] 点击蒙版关闭，默认为 true
 *
 * @event {Function} click 点击事件
 * @event {Function} cancel 取消事件
 * @event {Function} confirm 确认点击事件
 * @event {Function} maskClick 蒙版点击事件
 */
export default {
	name: 't-dialog',
	mixins: [
		Emits(['click']),
		Rounded({ sourceType: 'data', rounded: 'lg' }),
		Size({
			sourceType: 'data',
			presets: {
				xs: 'w-50',
				sm: 'w-55',
				md: 'w-60',
				lg: 'w-70'
			}
		})
	],
	emits: ['confirm', 'cancel', 'maskClick'],
	props: $P({
		zIndex: 100, // ZIndex
		closeOnClickMask: true // 点击蒙版关闭
	}),
	data() {
		return {
			title: '', // 标题
			content: '', // 内容
			visible: false, // 可见性
			cancelText: '取消', // 取消文本
			confirmText: '确认', // 确认文本
			cancelHandle: null, // 取消回调
			confirmHandle: null, // 确认回调
			cancelColor: 'base', // 取消颜色
			confirmColor: 'error' // 确认颜色
		}
	},
	computed: $C({
		// 可见性
		Visible: 'dialog-show',
		CancelColor: textColorPresets, // 取消文本颜色
		ConfirmColor: textColorPresets, // 确认文本颜色
		// 蒙版可见性
		MaskVisible() {
			const { visible } = this
			return visible ? 'dialog-mask-show' : null
		},
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		}
	}),
	methods: {
		// 蒙版点击事件
		maskClick(e) {
			this.$emit('maskClick', e)
			if (this.closeOnClickMask) {
				this.hidden()
			}
		},
		// 取消事件
		cancel(e) {
			this.$emit('cancel', e)
			if (typeof this.cancelHandle === 'function') {
				this.cancelHandle()
			}
			this.hidden()
		},
		// 确认事件
		confirm(e) {
			this.$emit('confirm', e)
			if (typeof this.confirmHandle === 'function') {
				this.confirmHandle()
			}
			this.hidden()
		},
		// 显示
		show(opts = {}) {
			this.update(opts)
			this.visible = true
		},
		// 隐藏
		hidden() {
			this.visible = false
		},
		// 更新
		update(opts = {}) {
			const {
				title = '',
				size = 'md',
				content = '',
				rounded = 'lg',
				cancelText = '取消',
				confirmText = '确认',
				cancelHandle = null,
				confirmHandle = null,
				cancelColor = 'base',
				confirmColor = 'error',
			} = opts

			Object.assign(this, {
				size,
				title,
				content,
				rounded,
				cancelText,
				confirmText,
				cancelColor,
				confirmColor,
				cancelHandle,
				confirmHandle
			})
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-dialog {
	.flex;
	.flex-col;
	.bg-white;
	.opacity-0;
	.text-center;
	.justify-between;
	overflow: hidden;
	transform: scale(0.8);
	transition: 0.15s ease-in-out;
	will-change: transform, opacity;
	transition-property: transform, opacity !important;
}

.dialog {
	// 显示
	&-show {
		opacity: 1;
		transform: scale(1);
	}

	// 头部
	&-header {
		.pt-4;
		.text-xl;
		.text-center;
		color: #495057;
		letter-spacing: 8rpx;
	}

	// 主要内容
	&-main {
		.p-5;
		.pt-3;
		color: #868e96;
		letter-spacing: 3rpx;
	}

	// 底部
	&-footer {
		.flex;
		.text-base;
		.font-bold;
	}

	// 取消文本和确定文本
	&-cancel-text,
	&-confirm-text {
		.p-3;
		.flex-1;
		letter-spacing: 10rpx;
	}

	&-mask {
		.fixed;
		.top-0;
		.left-0;
		.right-0;
		.bottom-0;
		.opacity-0;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */
		pointer-events: none;
		will-change: transform;
		transition: all 0.3s ease;
		background-color: rgba(38, 38, 38, 0.7);
		&-show {
			opacity: 1;
			pointer-events: auto;
		}
	}

	&-mask {
		.flex;
		.items-center;
		.justify-center;
	}
}
</style>
