<template>
	<view
		class="t-card"
		:class="[Shadow, Color, Rounded, Size, Align, Justify, Direction]"
		@click="click"
	>
		<slot />
	</view>
</template>

<script>
import { $C, $P, Size, Flex, Color, Emits, Shadow, Rounded } from '../../core'

/**
 * Card 卡片
 * @description 卡片组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/card.html
 * 
 * @property {Boolean} light = [true|false] 高亮，默认为 false
 * @property {Boolean} outline = [true|false] 轮廓，默认为 false
 * 
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为 sm
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
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
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为空
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
 * @property {String} align = [start|center|end|baseline|stretch|...] 交叉轴对齐方式，默认为 stretch 填充整个容器高度
 *
 *  @value start 头部
 * 	@value end 尾部
 * 	@value center 中间
 * 	@value baseline 文字基线对齐
 * 	@value stretch 填充整个容器高度
 *
 * @property {String} justify = [start|end|around|center|between|evenly] 主轴对齐方式，默认为 start
 *
 *  @value start 头部
 * 	@value end 尾部
 *  @value around 等比
 * 	@value center 中间
 *  @value between 靠两头
 *  @value evenly 等距
 * 
 * @property {String} direction = [row|col|row-reverse|col-reverse] 方向，默认为 col 竖排
 *
 *  @value row 横排
 * 	@value col 竖排
 *  @value row-reverse 反向横排
 * 	@value col-reverse 反向竖排
 * 
 * @event {Function} click 点击事件
 */
export default {
	name: 't-card',
	mixins: [
		Color(),
		Emits(['click']),
		Shadow({ shadow: 'sm' }),
		Flex({ direction: 'col' }),
		Rounded({ rounded: 'base' }),
		Size({
			presets: {
				xs: 'w-55',
				sm: 'w-60',
				md: 'w-65',
				lg: 'w-70'
			}
		})
	]
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-card {
	.flex;
	overflow: hidden;
}
</style>
