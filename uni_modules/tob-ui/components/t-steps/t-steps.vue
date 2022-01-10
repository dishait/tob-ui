<template>
	<view class="t-steps" @click="click">
		<slot />
	</view>
</template>

<script>
import { $P, $C, Emits, ProvideCounter, ProvideEffects, createColorPresets } from '../../core'

// 预设颜色
const presetColors = createColorPresets('step')

/**
 * Steps 步骤条
 * @description 步骤条组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/steps.html
 *
 * @property {Number} current 当前进度，默认为0
 * 
 * @property {Boolean} fail = [true|false] 是否失败，默认为 false
 *
 * @property {String} successColor = [primary|secondary|accent|neutral|info|success|warning|error] 成功颜色，默认为 success
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
 * @property {String} failColor = [primary|secondary|accent|neutral|info|success|warning|error] 失败颜色，默认为 error
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
 * @event {Function} fail 失败事件
 * @event {Function} click 点击事件
 * @event {Function} reset 重置事件
 * @event {Function} success 成功事件
 */
export default {
	name: 't-steps',
	mixins: [Emits(['click']), ProvideCounter('Steps'), ProvideEffects('Steps')],
	emits: ['fail', 'success'],
	props: $P({
		current: 0, // 当前步骤
		fail: false, // 失败
		failColor: 'error', // 失败时颜色
		successColor: 'success' // 成功时颜色
	}),
	provide() {
		return {
			StepsFailColor: this.FailColor,
			StepsSuccessColor: this.SuccessColor
		}
	},
	computed: $C({
		FailColor: presetColors, // 失败颜色
		SuccessColor: presetColors // 成功颜色
	}),
	watch: {
		current(newIndex, oldIndex) {
			// 失败熔断
			if (this.fail) return

			const shouldReset = oldIndex !== 0 && newIndex === 0
			if (shouldReset) {
				return this.reset()
			}
			const current = this.range(newIndex)
			this.setSuccess(current)
		},
		fail(v) {
			const nextStepError = v === true
			if (nextStepError) {
				const current = this.range()
				this.setFail(current)
			}
		}
	},
	methods: {
		// 初始化
		initStatus() {
			const current = this.range()
			for (let i = 0; i <= current; i++) {
				this.setSuccess(i)
			}

			if (this.fail) {
				this.setFail(current)
			}
		},
		// 重置
		reset() {
			this.triggerAllEffect('pending')
			this.setSuccess(0)
			this.$emit('reset')
		},
		// 设置成功
		setSuccess(i) {
			this.$emit('success', i)
			return this.triggerEffect(i, 'success')
		},
		// 设置失败
		setFail(i) {
			this.$emit('fail', i)
			return this.triggerEffect(i, 'fail')
		},
		// 范围
		range(i = this.current) {
			const storeRange = this.sizeEffects() - 1
			const corssRange = i > storeRange
			return corssRange ? storeRange : i
		}
	},
	mounted() {
		// vue3下微信小程序端父级mounted比beforeMounted先跑，所以要到下一个Tick执行
		this.$nextTick(() => this.initStatus())
	}
}
</script>

<style scoped lang="less">
.t-steps {
	display: grid;
	grid-auto-flow: column;
}
</style>
