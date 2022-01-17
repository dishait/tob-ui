<template>
	<view :class="[Disabled, Color]" :style="[OffsetTop, ZIndex]">
		<slot />
	</view>
</template>

<script>
import { $H, bgColorPresets } from "../../core"

// 预设高度
const hights = {
	// #ifdef MP
	navBar: `calc(48px + var(--status-bar-height))`,
	//  #endif
	// #ifndef MP
	navBar: `calc(44px + var(--status-bar-height))`,
	// #endif
	statusBar: 'var(--status-bar-height)'
}

const options = $H({
	designs: {
		emits: ['click'],
		color: {
			default: 'bg-white',
			presets: bgColorPresets
		}
	},
	props: {
		zIndex: 100,
		offsetTop: '0',
		disabled: false
	},
	computed: {
		Disabled: ['', 'sticky'],
		ZIndex() {
			const { zIndex } = this
			return { zIndex }
		},
		OffsetTop() {
			const { offsetTop } = this
			let top = offsetTop.replace(/Height$/, '')
			top = hights[top] ? hights[top] : top
			return { top }
		}
	}
})

/**
 * Sticky 吸顶
 * @description 吸顶组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/others/sticky.html
 * 
 * @property {Number} zIndex = [100|....] 层级，默认为100
 * @property {Boolean} disabled = [false|true] 禁用，默认为false
 * @property {String} offsetTop = [0|navBarHeight|statusBarHeight|....] 吸顶时与顶部的距离
 * 
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为白色背景
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
 * @event {Function} click 点击事件
 */
export default {
	name: 't-sticky',
	...options
}
</script>
