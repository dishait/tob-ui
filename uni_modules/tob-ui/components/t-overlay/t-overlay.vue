<template>
	<view class="t-overlay" :class="[Visible, SlotCenter]" :style="[Style]" @click="click"><slot /></view>
</template>

<script>
 import { $P, $C } from "../../core"
 
/**
 * Overlay 遮罩
 * @description 遮罩组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/feedback/overlay.html
 * 
 * @property {Number} zIndex = [98|99|100|101|...] 层级，默认为100
 * @property {Boolean} slotCenter = [false|true] 嵌入内容居中，默认为true
 * @property {Boolean} closeOnClickMask = [false|true] 点击蒙版关闭，默认为true
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-overlay',
	emits: ['click'],
	props: $P({
		zIndex: 100, // 层级
		slotCenter: true, // 嵌入内容居中
		closeOnClickMask: true // 点击蒙版关闭
	}),
	data() {
		return {
			visible: false // 可见性
		}
	},
	computed: $C({
		Visible: 'overlay-show', // 可见性
		SlotCenter: 'overlay-center',  // 嵌入内容居中
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		}
	}),
	methods: {
		// 点击事件
		click(e) {
			this.$emit('click', e)
			if (this.closeOnClickMask) {
				this.hidden()
			}
		},
		// 显示
		show() {
			this.visible = true
		},
		// 隐藏
		hidden() {
			this.visible = false
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';
.t-overlay {
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
	transition: all 0.3s ease;
	will-change: transform, opacity;
	background-color: rgba(38, 38, 38, 0.7);
}

.overlay {
	// 显示
	&-show {
		opacity: 1;
		pointer-events: auto;
	}
	
	// 嵌入内容居中
	&-center {
		.flex;
		.items-center;
		.justify-center;
	}
}
</style>
