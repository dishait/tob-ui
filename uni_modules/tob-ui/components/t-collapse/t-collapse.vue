<template>
	<view @click="$emit('click', $event)">
		<slot />
	</view>
</template>

<script>
import { $P, Emits, VModel, ProvideEffects } from '../../core'

/**
 * Collapse 折叠面板
 * @description 折叠面板组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/collapse.html
 *
 * @property {Boolean} border = [true|false] 边框，默认为false
 * @property {Boolean} accordion = [true|false] 手风琴模式，默认为 false
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-collapse',
	mixins: [
		Emits(['click']),
		ProvideEffects('Collapse'),
		VModel({
			value: []
		})
	],
	emits: ['change'],
	props: $P({
		border: false, // 边框
		accordion: false // 手风琴模式
	}),
	provide() {
		// 更新
		const update = name => {
			let arr = []
			// 手风琴模式
			if (this.accordion) {
				const shouldAppend = !this.VModelValue.includes(name)
				if (shouldAppend) {
					arr.push(name)
				}
			} else {
				// 默认模式，有则清除，无则添加
				arr = this.VModelValue
				const i = arr.findIndex(v => v === name)
				i !== -1 ? arr.splice(i, 1) : arr.push(name)
			}
			const newArr = arr.splice(0)
			this.updateVModelValue(newArr)
		}

		return {
			CollapseBorder: this.border,
			CollapseUpdateActive: update
		}
	},
	watch: {
		VModelValue() {
			// 每次更新，刷新所有活动态
			this.refreshAllActive()
			// 触发change事件
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
