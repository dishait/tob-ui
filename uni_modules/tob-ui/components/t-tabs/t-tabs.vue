<template>
	<view class="t-tabs" :class="[Boxed]" @click="click"><slot /></view>
</template>

<script>
import { $P, $C, Emits, VModel, ProvideEffects } from '../../core'
/**
 * Tabs 标签页
 * @description 标签页组件
 * @tutorial TODO 文档
 *
 * @property {Boolean} boxed = [true|false] 盒子形状，默认为false
 * @property {Boolean} bordered = [true|false] 底边形状，默认为false
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-tabs',
	mixins: [
		ProvideEffects('Tabs'),
		Emits(['click', 'change']),
		VModel({
			value: ''
		})
	],
	props: $P({
		bordered: false, // 边框
		boxed: false, // 盒子形状
	}),
	provide() {
		const { boxed, bordered } = this
		
		const update = name => {
			this.updateVModelValue(name)
		}
		
		return {
			TabsBoxed: boxed,
			TabsBordered: bordered,
			TabsUpdateActive: update,
		}
	},
	computed: $C({
		Boxed: 'tabs-boxed' // 盒子
	}),
	watch: {
		VModelValue() {
			this.refreshAllActive()
			this.change()
		}
	},
	methods: {
		// 变更事件
		change() {
			this.$emit('change', this.VModelValue)
		},
		// 刷新所有活动态
		refreshAllActive() {
			this.triggerAllEffect(false)
			this.VModelValue.forEach(name => {
				this.triggerEffect(name, true)
			})
		}
	},
	mounted() {
		// 挂载后，刷新所有活动态，使得子项目状态与容器状态保持一致
		this.refreshAllActive()
	}
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';
.t-tabs {
	.flex-wrap;
	.inline-flex;
	.items-flex-end;
}

.tabs-boxed {
	.p-1;
	.rounded;
	.bg-base;
	.bg-opacity-20;
}
</style>
