<template>
	<view :class="[Color, Shadow, Rounded, Size]" />
</template>

<script>
import { $H } from "../../core"
	
const options = $H({
	designs: {
		color: {
			light: true,
			default: 'base'
		},
		open: ['shadow', 'rounded'],
		size: {
			presets: {
				xs: 'h-2',
				sm: 'h-4',
				md: 'h-7',
				lg: 'h-10'
			}
		}
	}
})

/**
 * Gap 间隔槽
 * @description 间隔槽组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/others/gap.html
 * 
 * @property {Boolean} light = [true|false] 亮色，默认为 false
 * @property {Boolean} outline = [true|false] 轮廓，默认为 false
 * 
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为 base
 *
 * 	@value primary 主要
 * 	@value secondary 次要
 * 	@value accent 强调
 * 	@value neutral 中和
 *
 * 	@value info 信息
 * 	@value success 成功
 * 	@value warning 警告
 * 	@value error 错误
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 none
  * 
 * 	@value none 无 
 * 	@value sm 小 
 * 	@value base 基础 
 * 	@value md 中 
 * 	@value lg 大 
 * 	@value xl 超大 
 * 	@value 2xl 超级大 
 * 	@value 3xl 非常大 
 * 	@value full 圆 
 * 
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md 
 * 
 * 	@value xs 超小 
 * 	@value sm 小 
 *  @value md 中 
 * 	@value lg 大 
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
 */
export default {
	name: 't-gap',
	...options
}
</script>

