<template>
	<view class="t-divider" :class="[Vertical]">
		<view class="text" v-if="text">{{ text }}</view>
	</view>
</template>

<script>
import { $P, $C } from "../../core"

/**
 * Divider 分割线
 * @description 分割线组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/divider.html
 * 
 * @property {String} text 文本
 * @property {Boolean} vertical = [false|true] 竖排，默认为 false
 *
 * @event {Function} click 点击事件
 */
export default {
	props: $P({
		text: '', // 文本
		vertical: false // 竖排
	}),
	computed: $C({
		Vertical: 'divider-vertical' // 竖排
	})
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-divider {
	.h-1;
	.my-3;
	.flex;
	.items-center;
	color: #e9ecef;

	&::after,
	&::before {
		content: "";
		flex-grow: 1;
		height: 0.15rem;
		background-color: #e9ecef;
	}

	& > .text {
		.p-1;
	}
}

.divider-vertical {
	.flex-col;
	height: auto;
	/* #ifdef MP */
	height: 100%;
	/* #endif */
	width: 1rem;
	margin: 0 1rem;
	align-self: stretch;

	&::after,
	&::before {
		.flex-1;
		content: "";
		width: 0.125rem;
	}
}
</style>
