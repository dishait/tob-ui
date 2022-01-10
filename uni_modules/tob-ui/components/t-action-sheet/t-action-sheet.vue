<template>
	<view class="action-sheet-mask" @click="maskClick" :class="[MaskVisible]" :style="[Style]">
		<view class="t-action-sheet" :class="[Visible, Rounded]" @click.stop="click">
			<view class="action-sheet-header" v-if="desc" @click="headerClick">{{ desc }}</view>

			<view class="action-sheet-main">
				<view
					class="action-sheet-item"
					v-for="v of actions"
					:key="v.name"
					@click="actionClick(v)"
					:class="[v.disabled && 'action-sheet-item-disabled', v.color]"
				>
					<text>{{ v.name }}</text>
					<text v-if="v.desc" class="action-sheet-item-desc">{{ v.desc }}</text>
				</view>
			</view>
			<view class="action-sheet-footer" v-if="cancelText" @click="cancelClick">
				<view class="action-sheet-divider" />
				<view class="action-sheet-cancel">{{ cancelText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { $P, $C, Emits, VModel, Rounded } from '../../core'

/**
 * ActionSheet 动作面板
 * @description 动作面板组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/feedback/actionSheet.html
 *
 * @property {String} desc 描述，位于面板头部
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为100
 * @property {Array} actions 动作集，支持选项 name，desc，color，disabled
 * @property {Array} cancelText = [取消|cancel|....] 取消文本，默认为空字符串，不显示
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 lg
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 * 	@value 2xl 超级大
 * 	@value 3xl 无敌大
 * 	@value full 圆
 *
 * @event {Function} click 点击事件
 * @event {Function} maskClick 蒙版点击事件
 * @event {Function} headerClick 头部点击事件
 * @event {Function} cancelClick 取消点击事件
 * @event {Function} actionClick 动作项点击事件
 */
export default {
	name: 't-action-sheet',
	mixins: [
		VModel({ value: {} }),
		Rounded({ rounded: 'lg' }),
		Emits(['click', 'headerClick'])
	],
	emits: [
		'maskClick', // 蒙版点击
		'actionClick', // 动作项点击
		'cancelClick' // 取消点击事件
	],
	props: $P({
		desc: '', // 描述
		zIndex: 100, // 层级
		actions: [], // 动作集
		cancelText: '' // 取消文本
	}),
	data() {
		return {
			visible: false // 可见性
		}
	},
	computed: $C({
		Visible: 'action-sheet-show', // 可见性
		// 蒙版可见性
		MaskVisible() {
			const { visible } = this
			return visible ? 'action-sheet-mask-show' : null
		},
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		}
	}),
	methods: {
		// 蒙版点击事件
		maskClick(e) {
			this.hidden()
			this.$emit('maskClick', e)
		},
		// 动作项点击事件
		actionClick(v) {
			if (!v.disabled) {
				this.updateVModelValue(v)
				this.$emit('actionClick', v)
				this.hidden()
			}
		},
		// 取消点击事件
		cancelClick(e) {
			if (this.cancelText) {
				this.hidden()
				this.$emit('cancelClick', e)
			}
		},
		// 显示
		show() {
			this.visible = true
		},
		// 隐藏
		hidden() {
			this.visible = false
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
@import (reference, less) "../../core/tool.less";

.t-action-sheet {
	.fixed;
	.w-full;
	.bottom-0;
	.bg-white;
	.shadow-xl;
	.opacity-50;
	.text-center;
	.bg-opacity-100;
	overflow: hidden;
	transition: all 0.25s ease;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	will-change: transform, opacity;
	// 只向下偏移95%，起点更高，更多时间做动画，提高流畅性
	transform: translateY(95%) translateZ(0);
}

.action-sheet {
	// sheet显示动画
	.t-action-sheet&-show {
		opacity: 1;
		transform: translateY(0);
	}

	// 头部
	&-header {
		.py-3;
		.text-md;
		color: #8c8c8c;
		border-bottom: 1px solid #f8f9fa;
	}

	// 子项目
	&-item {
		.py-3;
		.flex;
		.text-lg;
		.flex-col;
		.items-center;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */
		transition: all 0.2s ease-in-out;

		// 描述
		&-desc {
			.mt-1;
			.text-xs;
			color: #8c8c8c;
		}

		// 禁用
		&-disabled {
			opacity: 0.2;
			pointer-events: none;
		}
	}

	// 取消
	&-cancel {
		.py-3;
		color: #8c8c8c;
	}

	// 分割线
	&-divider {
		.h-1;
		background-color: #f1f3f5;
	}

	.ProvideMask();
}
</style>
