<template>
	<view class="t-tab" :class="[Boxed, Bordered, Active, Disabled]" @click="click"><slot /></view>
</template>

<script>
import { InjectEffects } from "../../core"
/**
 * Tab 标签页项
 * @description 标签页项组件
 * @tutorial TODO 文档
 *
 * @property {String} name 选中标识，必填
 * @property {Boolean} disabled = [true|false] 禁用，默认为false
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-tab',
	mixins: [InjectEffects(['Tabs'])],
	data() {
		return {
			active: false // 活动态
		}
	},
	inject: {
		boxed: {
			from: 'TabsBoxed'
		},
		bordered: {
			from: 'TabsBordered'
		},
		TabsUpdateActive: {
			from: 'TabsUpdateActive'
		}
	},
	props: $P({
		disabled: false, // 禁用
		name: '', // 命名, 用于标识
	}),
	computed: {
		Boxed: 'tab-boxed', // 盒子形状
		Active: 'tab-active', // 活动态
		Disabled: 'tab-disabled', // 禁用
		Bordered: 'tab-bordered',  // 边框
	},
	methods: {
		click(e) {
			this.TabsUpdateActive(this.name)
			this.$emit('click', e)
		}
	},
	created() {
		// 初始化时收集活动态变更的effect
		const changeActive = status => this.toggle('active', status)
		this.TabsTrackEffect(this.name, changeActive)
	},
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';

.t-tab {
	.px-3;
	.relative;
	.flex-wrap;
	.inline-flex;
	.items-center;
	.justify-center;
	/* #ifndef MP-WEIXIN */
	.cursor-pointer;
	/* #endif */
	.bg-opacity-100;
	

	height: 2rem;
	color: #adb5bd;
	line-height: 2;
	user-select: none;
	font-size: 0.875rem;
	transition: all 0.2s ease-in-out;
}

.tab-active:not(.disabled) {
	color: black;
}

.tab-bordered {
	.border-base;
	border-bottom: 2px solid;
}

.tab-boxed.tab-active:not(.disabled) {
	.rounded;
	.text-white;
	.bg-primary;
}

.tab-disabled {
	.text-base;
	.bg-transparent;
	.cursor-not-allowed;
	.border-opacity-0;
}

@media screen and (min-width: 960px) {
	.t-tab:hover:not(.disabled) {
		color: black;
	}

	.tabs-boxed .tab-active:hover:not(.disabled) {
		.text-white;
	}
}
</style>
