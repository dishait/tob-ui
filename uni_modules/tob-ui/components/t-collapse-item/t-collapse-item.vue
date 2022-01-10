<template>
	<view class="t-collapse-item" @click="click">
		<view class="collapse-item-row" @click="handleActive" :class="[Disabled, Border]">
			<slot name="title" :title="title">
				<view>{{ title }}</view>
			</slot>
			<slot name="right">
				<t-icon :type="rightIcon" class="collapse-item-arrow" :class="[Active]" />
			</slot>
		</view>
		<view :style="Style" class="collapse-item-container">
			<view :id="nanoid" class="py-1">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
import { $P, $M, $C, $T, InjectEffects } from '../../core'

/**
 * CollapseItem 折叠面板项
 * @description 折叠面板项组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/collapse.html
 *
 * @property {String} title 标题
 * @property {String} name 选中标识，必填
 * @property {String} rightIcon = [down] 右侧图标，默认为 down
 * @property {Boolean} disabled = [true|false] 禁用，默认为 false
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-collapse-item',
	mixins: [InjectEffects('Collapse')],
	emits: ['click'],
	props: $P({
		title: '', // 标题
		disabled: false, // 禁用
		name: '', // 命名，用于标识
		rightIcon: 'down', // 右侧图标
	}),
	inject: {
		CollapseUpdateActive: {
			from: 'CollapseUpdateActive'
		},
		border: {
			from: 'CollapseBorder'
		}
	},
	data() {
		return {
			realHeight: 0, // 真实高度
			active: false, // 激活状态
			nanoid: $T.nanoid() // 唯一标识
		}
	},
	computed: $C({
		Border: 'collapse-item-border', // 边框
		Active: 'collapse-item-arrow-rotate', // 箭头激活
		Disabled: 'collapse-item-row-disabled', // 禁用
		// 高度
		Style() {
			const { active, realHeight } = this
			const height = active ? realHeight : 0
			return `height: ${height};`
		}
	}),
	methods: $M({
		toggle: true,
		// 切换active事件
		handleActive() {
			this.CollapseUpdateActive(this.name)
		},
		// 点击事件
		click(e) {
			this.$emit('click', { name: this.name, active: this.active }, e)
		},
		// 获取真实高度
		showRealHeight() {
			$T.query(this, `#${this.nanoid}`).then(res => {
				this.realHeight = `calc(${res.height}px + 20rpx)`
			})
		}
	}),
	created() {
		// 初始化时收集活动态变更的effect
		const changeActive = status => this.toggle('active', status)
		this.CollapseTrackEffect(this.name, changeActive)
	},
	mounted() {
		// 获取真实高度
		this.showRealHeight()
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-collapse-item {
	.text-lg;
}

.collapse-item {
	// row
	&-row {
		.p-2;
		.flex;
		.items-center;
		.justify-between;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */
		pointer-events: auto;
		transition: all 0.2s ease-in-out;
		&:active {
			background-color: #f1f3f5;
		}

		// 禁用
		&-disabled {
			opacity: 0.2;
			pointer-events: none;
		}
	}

	&-border {
		border-bottom: 1px solid #f1f3f5;
	}

	// 箭头
	&-arrow {
		opacity: 0.5;
		transform-origin: center;
		transition: transform 0.2s ease-in-out;
		// 旋转
		&-rotate {
			transform: rotate(-180deg);
		}
	}

	// 容器
	&-container {
		.px-2;
		.text-base;
		overflow: hidden;
		transition: all 0.2s ease-in-out;
	}
}
</style>
