<template>
	<view class="t-step" @click="click">
		<view class="step-passageway" :class="[Status]" v-if="PassagewayVisible" />
		<view class="step-sign" :class="[Status]">
			<slot name="sign">{{ Sign }}</slot>
		</view>
		<slot />
	</view>
</template>

<script>
import { Emits, InjectCounter, InjectEffects } from '../../core'

/**
 * Steps 步骤条项
 * @description 步骤条项组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/steps.html
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-step',
	mixins: [Emits(['click']), InjectCounter('Steps'), InjectEffects('Steps')],
	inject: ['StepsSuccessColor', 'StepsFailColor'],
	data() {
		return {
			status: 'pending'
		}
	},
	computed: {
		// 标志
		Sign() {
			return this.counter + 1
		},
		// 状态
		Status() {
			const { Color, status } = this
			return Color[status] || null
		},
		// 颜色
		Color() {
			const { StepsSuccessColor, StepsFailColor } = this
			return {
				pending: null,
				fail: StepsFailColor,
				success: StepsSuccessColor
			}
		},
		// 通道可见性，排除首个通道
		PassagewayVisible() {
			return this.counter !== 0
		}
	},
	beforeMount() {
		const useStatus = (v = this.status) => (this.status = v)
		// 收集函数
		this.StepsTrackEffect(this.counter, useStatus)
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-step {
	.grid;

	min-width: 4rem;
	text-align: center;
	place-items: center;
	grid-template-rows: 40px 1fr;
	grid-template-columns: repeat(1, minmax(0, 1fr));
}

.step {
	// 通道
	&-passageway {
		.top-0;
		.w-full;
		height: 0.5rem;
		grid-row-start: 1;
		margin-left: -100%;
		grid-column-start: 1;
		background-color: #f1f3f5;
		transition: all 0.12s ease-in-out;
	}

	// 标志
	&-sign {
		.grid;
		.relative;
		.rounded-full;
		width: 2rem;
		height: 2rem;
		grid-row-start: 1;
		place-self: center;
		place-items: center;
		grid-column-start: 1;
		background-color: #f1f3f5;
		transition: all 0.16s ease-in-out;
	}
}

.step {
	// 主要
	&-primary {
		.bg-primary;
		.text-white;
	}

	// 次要
	&-secondary {
		.bg-secondary;
		.text-white;
	}

	// 强调
	&-accent {
		.bg-accent;
		.text-white;
	}

	// 中和
	&-neutral {
		.bg-neutral;
		.text-white;
	}

	// 基础
	&-base {
		.bg-neutral;
		.text-white;
	}

	// 信息
	&-info {
		.bg-info;
		.text-white;
	}

	// 成功
	&-success {
		.bg-success;
		.text-white;
	}

	// 警告
	&-warning {
		.bg-warning;
		.text-white;
	}

	// 错误
	&-error {
		.bg-error;
		.text-white;
	}
}
</style>
