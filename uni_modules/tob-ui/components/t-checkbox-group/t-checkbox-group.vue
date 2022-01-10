<template>
	<view @click="click">
		<slot />
	</view>
</template>

<script>
import { FieldTrack } from "../t-field/mixin"
import { Emits, ProvideEffects, VModel } from "../../core"

/**
 * CheckboxGroup 复选框组
 * @description 复选框组组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/checkbox.html
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	mixins: [
		FieldTrack('checkbox'),
		Emits(['click', 'change']),
		ProvideEffects('CheckBoxGroup'),
		VModel({
			value: []
		})
	],
	provide() {
		const update = value => {
			// 有则清除，无则添加
			const arr = this.VModelValue
			const i = arr.findIndex(v => v === value)
			i !== -1 ? arr.splice(i, 1) : arr.push(value)
			const newArr = arr.splice(0)
			this.updateVModelValue(newArr)
		}
		return {
			CheckBoxGroupUpdateCheckeds: update
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
		change(v) {
			this.$emit('change', v)
		},
		// 刷新所有活动态
		refreshAllActive() {
			this.triggerAllEffect(false)
			this.VModelValue.forEach(value => {
				this.triggerEffect(value, true)
			})
		}
	},
	mounted() {
		// 挂载后，刷新所有活动态，使得子项目状态与容器状态保持一致
		this.refreshAllActive()
	}
}
</script>
