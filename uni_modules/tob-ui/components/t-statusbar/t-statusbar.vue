<template>
	<view :class="[Color, Sticky]" @click="click" :style="[Height, ZIndex]"/>
</template>

<script>
import { $H, bgColorPresets } from "../../core"

const options = $H({
	designs: {
		emits: ['click'],
		color: {
			presets: bgColorPresets,
			default: 'bg-transparent',
		}
	},
	data: {
		Height: {
			height: "var(--status-bar-height)"
		}
	},
	props: {
		zIndex: 100,
		sticky: true
	},
	computed: {
		Sticky: 'sticky',
		ZIndex() {
			const { zIndex } = this
			return { zIndex }
		}
	}
})

/**
 * Statusbar
 * @description 状态栏组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/others/statusbar.html
 * 
 * @property {Number} zIndex = [100|....] 层级，默认为100
 * @property {Boolean} sticky = [false|true] 粘性定位，默认为true
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
 name: 't-statusbar',
 ...options
}
</script>