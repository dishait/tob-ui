<template>
	<view @click="click">
		<slot />
	</view>
</template>

<script>
import { FieldTrack } from "../t-field/mixin"
import { VModel, Emits, ProvideEffects } from "../../core"

/**
 * RadioGroup 单选框组
 * @description 单选框组组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/radio.html
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-radio-group',
	mixins: [
		Emits(['click']),
		FieldTrack('radio'),
		VModel({ value: '' }),
		ProvideEffects('RadioGroup')
	],
	emits: ['change'],
	provide() {
		const update = value => this.updateVModelValue(value)
		return {
			RadioGroupUpdateChecked: update
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
			this.triggerEffect(this.VModelValue, true)
		}
	},
	mounted() {
		// 挂载后，刷新所有活动态，使得子项目状态与容器状态保持一致
		this.refreshAllActive()
	}
}
</script>
