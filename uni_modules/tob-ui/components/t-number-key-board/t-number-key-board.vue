<template>
	<view class="t-number-key-board-mask" @click="maskClick" :class="[Visible]" :style="[Style]">
		<view class="t-number-key-board" @click.stop="click">
			<view class="number-key-board-main">
				<view
					class="number-key-board-item"
					@click.stop="appendValue(v)"
					v-for="v of values"
					:key="v"
				>{{ v }}</view>
			</view>
			<view class="number-key-board-aside">
				<view class="number-key-board-undo" @click.stop="undo">回退</view>
				<view class="number-key-board-clear" @click.stop="clear">清空</view>
			</view>
		</view>
	</view>
</template>

<script>
import { $P, $C, Emits, VModel } from "../../core"

/**
 * NumberKeyBoard 数字键盘
 * @description 数字键盘组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/numberKeyBoard.html
 * 
 * @property {Number} maxlength 最大长度，默认为 100
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为100
 * @property {Arrary} values 待选值，默认为 [1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0, '.']
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 * @event {Function} maskClick 蒙版点击事件
 */
export default {
	name: 't-number-key-board',
	mixins: [VModel({ value: '' }), Emits(['click', 'change'])],
	emits: [
		'maskClick' // 蒙版点击事件
	],
	props: $P({
		zIndex: 100, // 层级
		maxlength: 100, // 最大长度
		values: [1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0, '.'] // 待选值
	}),
	data() {
		return {
			visible: false // 显示
		}
	},
	computed: $C({
		Visible: 'number-key-board-show',// 可见性
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		}
	}),
	watch: {
		VModelValue(v) {
			// 触发变更事件
			this.change(v)
		}
	},
	methods: {
		// 蒙版点击事件
		maskClick(e) {
			this.$emit('maskClick', e)
			this.hidden()
		},
		// 回退
		undo() {
			const end = this.VModelValue.length - 1
			const v = this.VModelValue.substring(0, end)
			this.updateVModelValue(v)
		},
		// 清空
		clear() {
			this.updateVModelValue('')
		},
		// 显示
		show() {
			this.visible = true
		},
		// 隐藏
		hidden() {
			this.visible = false
		},
		// 追加值
		appendValue(v) {
			const { maxlength } = this
			v = this.VModelValue + v
			if (v.length <= maxlength) {
				this.updateVModelValue(v)
			}
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-number-key-board-mask {
	.fixed;
	.top-0;
	.left-0;
	.right-0;
	.bottom-0;
	.opacity-0;
	transition: all 0.35s ease;
	transform: translate(0, 100%);
}

.t-number-key-board {
	.py-1;
	.px-2;
	.flex;
	.fixed;
	.bottom-0;
	.flex-wrap;
	.justify-between;

	height: 35vh;
	width: calc(100% - 40rpx);
	background-color: #f5f5f5;
}

.number-key-board {
	&-main {
		.flex;
		.flex-wrap;

		width: 75%;
		height: 35vh;
	}

	&-item {
		.m-1;
		.flex;
		.rounded;
		.text-2xl;
		.bg-white;
		.items-center;
		.bg-opacity-100;
		.justify-center;
		// 动画
		transition: all 0.1s ease;
		width: calc(100% / 3 - 20rpx);
		&:active {
			.bg-opacity-20;
			transform: scale(0.98) !important;
		}
	}

	&-aside {
		.flex;
		.flex-col;
		.items-center;

		height: 35vh;
		width: calc(25% - 20rpx);
	}

	&-undo,
	&-clear {
		.my-1;
		.flex;
		.w-full;
		.text-xl;
		.rounded;
		.bg-white;
		.items-center;
		.justify-center;

		height: calc(20vh - 20rpx);
		// 动画
		transition: all 0.1s ease;
		&:active {
			.bg-opacity-20;
			transform: scale(0.98) !important;
		}
	}

	&-show {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
