<template>
	<view class="t-field" :class="[Align]" @click="click">
		<view class="field-label">
			<t-icon :type="labelIcon" v-if="labelIcon" class="mr-1" />
			<text>{{ label }}</text>
			<text class="text-error" v-if="required">*</text>
		</view>

		<view class="field-input">
			<slot />
			<view class="field-error-msg" :class="[ErrorMsg, Type]">{{ errorMsg }}</view>
		</view>
	</view>
</template>

<script>
import { $P, $C, $T, Emits, Flex } from '../../core'

/**
 * Field 表单域
 * @description 表单域组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/form.html
 *
 * @property {String} label 标签
 * @property {String} labelIcon 标签图标
 * @property {String} name 域名，用于标识规则，必填
 * @property {Boolean} required = [false|true] 显示必填，默认为false
 * @property {String} validateTrigger = [onBlur|onChange] 校验时机，默认走表单校验时机
 *
 * 	@value onBlur 失焦时校验
 * 	@value onChange 变更时校验
 *
 * @property {String} align = [start|center|end|baseline|stretch|...] 交叉轴对齐方式，默认为 start
 *
 *  @value start 头部
 * 	@value end 尾部
 * 	@value center 中间
 * 	@value baseline 文字基线对齐
 * 	@value stretch 填充整个容器高度
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-field',
	mixins: [Emits(['click']), Flex({ align: 'start' })],
	props: $P({
		label: '', // 标签
		labelIcon: '', // 标签图标
		required: false, // 显示必填
		name: '', // 用于标识规则，必填
		validateTrigger: '' // 校验时机
	}),
	inject: ['FormValidateTrigger', 'FormTrackField', 'FormValidate'],
	provide() {
		// 校验时机
		const validateTrigger = this.validateTrigger || this.FormValidateTrigger
		// 收集
		const track = ({ type = this.type, value, trigger }) => {
			this.type = type
			this.value = value
			const shouldVaildate = trigger === validateTrigger
			if (shouldVaildate) {
				this.FormValidate(this.name)
			}
		}

		return {
			FieldTrack: track
		}
	},
	data() {
		return {
			type: '', // 类型
			value: '', // 值
			errorMsg: '' // 错误信息
		}
	},
	computed: $C({
		ErrorMsg: 'field-error-msg-show', // 错误信息样式
		Type: ['textarea', 'field-error-msg-textarea', null]
	}),
	created() {
		const useField = errorMsg => {
			if ($T.types.not('Undefined', errorMsg)) {
				this.errorMsg = errorMsg
			}
			return {
				name: this.name,
				type: this.type,
				value: this.value,
				label: this.label
			}
		}
		if (!this.name) {
			throw new Error('t-field的props必须包含name')
		}
		this.FormTrackField(this.name, useField)
	}
}
</script>

<style lang="less">
@import (reference, less) "../../index.less";

// 默认样式
.t-field {
	.p-2;
	.py-3;
	.flex;

	.bg-white;
	.bg-opacity-100;
}

.field-label {
	width: 25%;
	.flex-shrink-0;
}

.field-input {
	.px-2;
	.flex-1;
}

.field-error-msg {
	.mt-1;
	.text-xs;
	.opacity-0;
	.text-error;
	transition: opacity 0.2s ease-in-out;

	// 需要特殊处理的textarea
	&-textarea {
		.mt-4;
	}

	&-show {
		.opacity-100;
	}
}
</style>
