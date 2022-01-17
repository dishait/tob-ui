<template>
	<view class="t-line" :class="[Color, Vertical, Dashed]" :style="[Length]" @click="click" />
</template>

<script>
import { $H, borderColorPresets } from "../../core"

const options = $H({
	designs: {
		emits: ['click'],
		color: {
			default: 'base',
			presets: borderColorPresets
		}
	},
	props: {
		dashed: false,
		length: '100%',
		vertical: false // 竖排
	},
	computed: {
		Dashed: 'line-dashed',
		Vertical: 'line-vertical', // 竖排
		Length() {
			const { vertical, length } = this
			const k = vertical ? 'height' : 'width'
			return { [k]: length }
		}
	}
})

/**
 * Line 线条
 * @description 线条组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/others/line.html
 * 
 * @property {Boolean} dashed = [true|false] 虚线，默认为false
 * @property {Boolean} vertical = [false|true] 竖排，默认为 false
 * @property {String} length = [100%|....] 长度，接收css单位，默认为100%
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
 * @property {String} size = [...] 尺寸，默认为w-full
 * 
 * @event {Function} click 点击事件
 */
export default {
	name: 't-line',
	...options
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-line {
	.inline-block;
	--border-opacity: 50%;
	border-bottom-style: solid;
	border-bottom-width: 1.5px;
	// 虚线
	&.line-dashed {
		border-bottom-style: dashed;
	}
}

.line {
	// 竖排
	&-vertical {
		border-bottom-style: none;
		border-bottom-width: 0px;
		border-left-style: solid;
		border-left-width: 1.5px;
		// 虚线
		&.line-dashed {
			border-left-style: dashed;
		}
	}
}
</style>
