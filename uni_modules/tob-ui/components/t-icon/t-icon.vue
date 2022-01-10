<template>
	<text
		class="t-icon"
		:class="[classPrefix, Color, Type]"
		:style="{ fontSize: size }"
		@click="click"
	/>
</template>

<script>
import { $P, $C, Emits, Color, textColorPresets } from '../../core'

/**
 * Icon 图标
 * @description 图标组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/icon.html
 *
 * @property {String} type 类型
 * @property {String} classPrefix = [tob-ui-icon|iconfont|...] 默认为tob-ui-icon，前缀
 * @property {String} size 尺寸，默认继承父级，允许接受单位有rpx，px，em等
 * 
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色类型，默认空，继承父级颜色
 *
 * 	@value primary 主色
 * 	@value secondary 次要色
 * 	@value accent 强调色
 * 	@value neutral 中和色
 * 	@value base 基础色
 *
 * 	@value info 信息
 * 	@value success 成功
 *  @value warning 警告
 * 	@value error 错误
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-icon',
	mixins: [Emits(['click']), Color({ presets: textColorPresets })],
	props: $P({
		type: '', // 类型
		size: 'inherit', // 尺寸
		classPrefix: 'tob-ui-icon' // 前缀
	}),
	computed: $C({
		Type() {
			const { type } = this
			const hasIconPrefix = type.slice(0, 5).includes('icon-')
			return hasIconPrefix ? type : `icon-${type}`
		}
	})
}
</script>

<style scoped lang="less">
@import "./icon.css";
@import (reference, less) "../../index.less";

.t-icon {
	.inline-block;
}
</style>
