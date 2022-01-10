<template>
	<view class="t-cell" @click="click" :class="[Center]">
		<slot name="left">
			<view>
				<view class="cell-title">
					<t-icon v-if="leftIcon" :type="leftIcon" class="cell-left-icon" />
					<text>{{ title }}</text>
				</view>
				<view v-if="desc" class="cell-desc">{{ desc }}</view>
			</view>
		</slot>
		<slot name="right">
			<view class="cell-value">
				<text>{{ value }}</text>
				<t-icon v-if="rightIcon" :type="rightIcon" class="cell-right-icon" />
			</view>
		</slot>
	</view>
</template>

<script>
import { $P, $C, Emits } from '../../core/index.js'

/**
 * Cell 单元格
 * @description 单元格组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/cell.html
 * 
 * @property {String} desc 描述
 * @property {String} title 标题，默认为空
 * @property {String} value 内容，默认为空
 * @property {String} leftIcon 左图标，默认为空
 * @property {String} rightIcon = [right|....] 右图标，默认为空
 * @property {String} to = [/pages/|....]跳转，只允许navigateTo
 * @property {Boolean} center = [false|true] 垂直居中，默认为 false
 * 
 * @event {Function} click 点击事件
 */
export default {
	name: 't-cell',
	emits: ['click'],
	props: $P({
		to: '', // 跳转
		desc: '', // 描述
		title: '', // 标题
		value: '', // 内容
		leftIcon: '', // 左图标
		rightIcon: '', // 右图标
		center: false, // 垂直居中
	}),
	computed: $C({
		Center: 'cell-center' // 垂直居中
	}),
	methods: {
		// 点击事件
		click(e) {
			const url = this.to
			if (url) {
				uni.navigateTo({ url })
			}
			this.$emit('click', e)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-cell {
	.p-2;
	.px-3;
	.flex;
	.bg-white;
	.border-base;
	.bg-opacity-100;
	.justify-between;
	.items-flex-start;
	border-bottom: 1px solid #f1f3f5;
	transition: all 0.12s ease-in-out;

	&:active {
		.bg-opacity-50;
		.border-transparent;
		transform: scale(0.98);
	}

	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

.cell {
	// 垂直居中
	&-center {
		.items-center;
	}

	// 标题
	&-title {
		.text-lg;
	}

	// 标题与内容内对齐
	&-title,
	&-value {
		.flex;
		.items-baseline;
	}

	// 描述
	&-desc {
		.py-1;
		.text-sm;
		.text-base;
	}

	// 内容
	&-value {
		.text-base;
	}

	// 左图标
	&-left-icon {
		.mr-1;
	}

	// 右图标
	&-right-icon {
		.ml-1;
	}
}
</style>
