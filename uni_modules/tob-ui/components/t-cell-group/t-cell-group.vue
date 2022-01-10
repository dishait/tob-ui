<template>
	<view class="t-cell-group" @click="click">
		<view v-if="title" class="cell-group-title">{{ title }}</view>
		<view :class="[inset, Rounded]" class="cell-group-inset">
			<slot />
		</view>
	</view>
</template>

<script>
import { $P, $C, Emits, Rounded } from '../../core/index.js'

/**
 * CellGroup 单元格组
 * @description 单元格组组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/cell.html
 * 
 * @property {String} title 标题
 * @property {Boolean} inset = [mx-1|mx-2|mx-3|mx-4|mx-5|...] 插入
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
 * @event {Function} click 点击事件
 */
export default {
	name: 't-cell-group',
	mixins: [Rounded(), Emits(['click'])],
	props: $P({
		title: '',
		inset: ''
	})
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-cell-group {
	.mt-2;
	overflow: hidden;
}

.cell-group {
	// 标题
	&-title {
		.p-2;
		.text-lg;
		.text-base;
	}

	// 圆角卡片
	&-inset {
		overflow: hidden;
	}
}
</style>
