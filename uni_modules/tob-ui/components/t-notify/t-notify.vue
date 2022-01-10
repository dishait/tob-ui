<template>
	<view class="t-notify" :style="[Style]" :class="[Visible, Color]" @click="click">
		<slot :content="content">
			<text>{{ content }}</text>
		</slot>
	</view>
</template>

<script>
import { $C, $P, Emits, bgColorPresets } from '../../core'

let timeout
const debounce = fn => {
	return function (delay = 500) {
		clearTimeout(timeout)
		timeout = setTimeout(fn.bind(this), delay)
	}
}

/**
 * Notify 消息
 * @description 消息组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/feedback/notify.html
 *
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为100
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-notify',
	mixins: [Emits(['click'])],
	emits: ['change'],
	props: $P({
		zIndex: 100 // 层级
	}),
	data() {
		return {
			delay: 3000, // 延迟
			content: '', // 内容
			visible: false, // 可见性
			color: 'success' // 颜色
		}
	},
	computed: $C({
		Color: bgColorPresets, // 颜色
		Visible: 'notify-show', // 可见性
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		}
	}),
	watch: {
		visible(v) {
			this.$emit('change', v)
		}
	},
	methods: {
		// 显示
		show(opts = {}) {
			const { manual } = opts
			this.update(opts)
			this.visible = true
			// 非手动自动延迟隐藏
			if (!manual) {
				this.delayHidden(this.delay)
			}
		},
		// 隐藏
		hidden() {
			this.visible = false
			clearTimeout(timeout)
		},
		// 延迟隐藏
		delayHidden: debounce(function () {
			this.hidden()
		}),
		// 更新
		update(opts = {}) {
			const { content, color = 'success', delay = 3000 } = opts
			Object.assign(this, {
				delay,
				color,
				content
			})
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-notify {
	.flex;
	.fixed;
	.w-full;
	.opacity-0;
	.text-white;
	.items-center;
	.justify-center;

	/* #ifndef MP */
	.top-0;
	.statusbar;
	height: 44px;
	transform: translateY(-100%);
	/* #endif */

	/* #ifdef MP */
	.p-1;
	transform: scale(1.2);
	top: calc(48px + var(--status-bar-height));
	/* #endif */

	will-change: transform;
	transition: all 0.2s ease-in-out;
}

.notify {
	// 显示
	&-show {
		.opacity-100;
		/* #ifndef MP */
		transform: translateY(0);
		/* #endif */
		/* #ifdef MP */
		transform: scale(1);
		/* #endif */
	}
}
</style>
