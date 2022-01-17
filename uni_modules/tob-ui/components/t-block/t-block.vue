<template>
	<view
		:hover-class="hoverClass"
		:hover-stay-time="hoverStayTime"
		:hover-start-time="hoverStartTime"
		:hover-stop-propagation="hoverStopPropagation"
		:class="[Size, Color, Shadow, Rounded, Flex, Align, Justify, Direction, tClass]"
		@click="click"
	>
		<slot />
	</view>
</template>

<script>
import { $H } from '../../core'

const options = $H({
	designs: {
		emits: ['click'],
		open: ['color', 'rounded', 'shadow', 'size', 'flex'],
	},
	props: {
		tClass: '',
		flex: false,
		hoverStayTime: 40,
		hoverClass: 'none',
		hoverStartTime: 50,
		hoverStopPropagation: false
	},
	computed: {
		Flex: 'flex'
	}
})

/**
 * Block 块
 * @description 块组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/block.html
 * @property {String} tClass = [...] 扩展样式，默认为空
 * @property {Boolean} light = [true|false] 高亮，默认为false
 * @property {Boolean} outline = [true|false] 轮廓，默认为false
 * @property {String} flex = [true|false] 定义该块为flex块，默认为flex
 * @property {Number} hoverStartTime = [50|....] 按住后多久出现点击态，默认为 50，单位毫秒
 * @property {Number} hoverStayTime = [400|....] 手指松开后点击态保留时间，默认为 400，单位毫秒
 * @property {String} hoverClass = [none|....] 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果，默认为 none
 * @property {Boolean} hoverStopPropagation = [true|false] 	指定是否阻止本节点的祖先节点出现点击态，App、H5、支付宝小程序、百度小程序不支持（支付宝小程序、百度小程序文档中都有此属性，实测未支持），默认为 false
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
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 none
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
 * @property {String} size = [...] 尺寸，默认为空
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
	name: 't-block',
	...options
}
</script>
