<template>
	<view @click="click">
		<slot />
	</view>
</template>

<script>
import { $P, $T, Emits } from '../../core'

const { is, not } = $T.types

/**
 * Form 表单
 * @description 表单组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/form.html
 *
 * @property {String} validateTrigger = [onBlur|onChange|manual] 校验时机，默认为 onBlur
 *
 * 	@value manual 手动校验
 * 	@value onBlur 失焦时校验
 * 	@value onChange 变更时校验
 *
 * @event {Function} click 点击事件
 * @event {Function} fail 校验失败事件
 */
export default {
	name: 't-form',
	mixins: [Emits(['click'])],
	emits: ['fail'],
	props: $P({
		validateTrigger: 'onBlur'
	}),
	provide() {
		const trackField = (name, useField) => (this.fields[name] = useField)
		return {
			FormTrackField: trackField,
			FormValidate: this.validate,
			FormValidateTrigger: this.validateTrigger
		}
	},
	data() {
		return {
			status: 'init',
			fields: {}, // 域集
			rules: [] // 规则集
		}
	},
	methods: {
		// 设置rules
		setRules(rules) {
			this.rules = rules
		},
		// 校验所有规则
		async validateAll(rules = this.rules) {
			this.status = 'pending'
			const finalResult = {}
			const willValidates = []
			for (let fieldName in this.fields) {
				const rule = rules[fieldName]
				willValidates.push(this.validate(fieldName, rule))
			}

			let results = await Promise.all(willValidates)
			results.forEach(v => {
				const { name, ...result } = v
				finalResult[name] = result
			})
			return { fields: finalResult, status: this.status }
		},
		// 校验单条规则
		async validate(fieldName, rule = this.rules[fieldName]) {
			let useField = this.fields[fieldName]
			const field = useField()
			// 不存在该校验规则集时直接成功
			if (is('Undefined', rule)) {
				return this.success(useField, fieldName, field.value)
			}

			// 每个field的规则集必须是数组类型
			if (not('Array', rule)) {
				throw new Error(`规则集必须是Array类型，${fieldName}规则集存在类型错误`)
			}

			for (let fn of rule) {
				// 每个规则必须是函数类型
				const isFn = not('Function', fn) && not('AsyncFunction', fn)
				if (isFn) {
					throw new Error(`规则集内规则必须是Function类型或者AsyncFunction类型，规则集${fieldName}内规则存在类型错误`)
				}
				try {
					const result = await Promise.resolve(fn(field))
					// 规则内返回的是String类型，则认为是校验失败
					if (is('String', result)) {
						throw new Error(result)
					}
				} catch (err) {
					return this.fail(useField, fieldName, field.value, err.message)
				}
			}
			return this.success(useField, fieldName, field.value)
		},
		// 失败时处理
		fail(useField, fieldName, value, errorMsg) {
			this.status = 'fail'
			const { type } = useField(errorMsg)
			const result = {
				name: fieldName,
				type,
				value,
				status: 'fail',
				errorMsg
			}
			this.$emit('fail', result)
			return result
		},
		// 成功时处理
		success(useField, fieldName, value) {
			if (this.status !== 'fail') {
				this.status = 'success'
			}
			const { type } = useField('')
			return {
				name: fieldName,
				type,
				value,
				status: 'success',
				errorMsg: ''
			}
		}
	}
}
</script>
