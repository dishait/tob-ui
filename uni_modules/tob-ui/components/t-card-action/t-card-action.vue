<template>
	<view class="t-card-action" :class="[Justify, Align, Size]" @click="click">
		<slot />
	</view>
</template>

<script>
import { Flex, Emits, Size } from '../../core'

/**
 * CardAction 卡片动作区域
 * @description 卡片动作区域组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/card.html
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
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 * 
 * @event {Function} click 点击事件
 */
export default {
	name: 't-card-action',
	mixins: [
		Flex(),
		Emits(['click']),
		Size({
			presets: {
				xs: 'py-1',
				sm: 'py-2',
				md: 'py-3',
				lg: 'py-4'
			}
		})
	]
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-card-action {
	.flex;
	.flex-wrap;
}
</style>
