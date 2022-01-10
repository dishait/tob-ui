<template>
	<view class="popup-mask" :class="[maskVisible, Mode]" @click="maskClick" :style="{ zIndex }">
		<view
			class="t-popup"
			:style="{ zIndex }"
			:class="[visible, Rounded, Statusbar]"
			@click.stop="click"
		>
			<slot />
			<t-icon
				v-if="closeIcon"
				:type="closeIcon"
				class="popup-close-icon"
				:class="[CloseIconPosition]"
				@click="hidden"
				size="1.3em"
			/>
		</view>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, $M, Emits, VModel, Rounded } from '../../core'

// 应该应用statusbar的mode
const shouldApplyStatusbarModes = ['top', 'left', 'right']

/**
 * Popup 弹出层
 * @description 弹出层组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/popup.html
 *
 * @property {String} closeIcon = [close|close-circle|....] 关闭图标，默认为空，为空时不显示
 *
 * 	@value close 关闭
 * 	@value close-circle 圆形
 *
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为100
 *
 * @property {String} closeIconPosition = [left-0 top-0|right-0 top-0|bottom-0 left-0|bottom-0 right-0|...] 关闭图标位置，默认为空，不同模式不同位置
 *
 * @property {Boolean} applyStatusbar = [true|false] 应用状态栏，默认为true，只在top，left，right等模式下起效果
 *
 *
 * @property {Boolean} closeOnMaskClick = [true|false] 点击蒙版关闭，默认开启
 *
 * @property {String} mode = [top|bottom|center|left|right] 模式，默认为 center
 *
 * 	@value top 顶部
 * 	@value bottom 底部
 * 	@value center 中间
 * 	@value left 左侧
 * 	@value right 右侧
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 none，无圆角
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
 * @event {Function} maskClick 蒙版点击
 */
export default {
	name: 't-popup',
	mixins: [Rounded(), VModel({ value: false }), Emits(['click'])],
	emits: ['maskClick'],
	components: {
		tIcon
	},
	props: $P({
		zIndex: 100, // 层级
		mode: 'center', // 位置
		closeIcon: '', // 关闭图标
		applyStatusbar: true, // 应用状态栏
		closeIconPosition: '', // 关闭图标位置
		closeOnMaskClick: true // 点击蒙版关闭
	}),
	data() {
		return {
			timer: null, // 定时器
			visible: '', // 可视化样式
			maskVisible: '', // 蒙版可视化样式
			animationLock: false // 动画锁
		}
	},
	computed: $C({
		// 位置
		Mode: {
			top: 'popup-$',
			left: 'popup-$',
			right: 'popup-$',
			bottom: 'popup-$',
			center: 'popup-$'
		},
		// 关闭图标位置
		CloseIconPosition() {
			const { mode, closeIconPosition } = this
			if (!closeIconPosition) {
				return `popup-${mode}-close-icon-positon`
			}
			return closeIconPosition
		},
		// 状态栏
		Statusbar() {
			const { mode, applyStatusbar } = this
			const inModes = shouldApplyStatusbarModes.includes(mode)
			return inModes && applyStatusbar && 'statusbar'
		}
	}),
	watch: {
		VModelValue(v) {
			// 运行可见性任务
			this.runVisibleTask(v)
		},
		mode() {
			// 只会在切换mode时锁动画
			this.lockAnimation()
		}
	},
	methods: $M({
		toggle: true,
		// 蒙版点击事件
		maskClick(e) {
			this.$emit('maskClick', e)
			if (this.closeOnMaskClick) {
				this.hidden()
			}
		},
		// 运行可见性任务
		runVisibleTask(v) {
			if (v) {
				clearTimeout(this.timer)
				this.maskVisible = 'popup-mask-show'
				this.$nextTick(() => {
					if (this.animationLock) {
						this.timer = setTimeout(() => {
							this.unlockAnimation()
							this.visible = 'popup-show'
						}, 210)
					} else {
						this.visible = 'popup-show'
					}
				})
			} else {
				this.visible = ''
				this.maskVisible = ''
			}
		},
		// 锁动画
		lockAnimation() {
			this.toggle('animationLock', true)
		},
		// 解动画
		unlockAnimation() {
			this.toggle('animationLock', false)
		},
		// 显示
		show() {
			this.updateVModelValue(true)
		},
		// 隐藏
		hidden() {
			clearTimeout(this.timer)
			this.updateVModelValue(false)
		}
	})
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
@import (reference, less) "../../core/tool.less";

.t-popup {
	.relative;
	.bg-white;
	.opacity-0;
	.inline-block;
	transition: all 0.2s ease;
	will-change: transform, opacity;
}

.popup {
	// 关闭图标
	&-close-icon {
		.absolute;
		.opacity-50;
	}

	// 显示
	&-show {
		.opacity-100;
	}

	// 左侧
	&-left {
		.t-popup {
			.h-full;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			transform: translateX(-100%);
		}

		.popup-show {
			transform: translateX(0);
		}

		&-close-icon-positon {
			right: 15rpx;
			top: calc(var(--status-bar-height));
		}
	}

	// 右侧
	&-right {
		.t-popup {
			.h-full;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			transform: translateX(100vw);
		}

		.popup-show {
			transform: translateX(calc(100vw - 100%));
		}

		&-close-icon-positon {
			left: 15rpx;
			top: calc(var(--status-bar-height));
		}
	}

	// 居中
	&-center {
		.flex;
		.items-center;
		.justify-center;

		.t-popup {
			transform: scale(0);
		}

		.popup-show {
			transform: scale(1);
		}

		&-close-icon-positon {
			top: 15rpx;
			right: 15rpx;
		}
	}

	// 顶部
	&-top {
		.t-popup {
			.w-full;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			transform: translateY(-100%);
		}

		.popup-show {
			transform: translateY(0);
		}

		&-close-icon-positon {
			right: 15rpx;
			bottom: 15rpx;
		}
	}

	// 底部
	&-bottom {
		.t-popup {
			.w-full;
			transform: translateY(100vh);
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

		.popup-show {
			transform: translateY(calc(100vh - 100%));
		}

		&-close-icon-positon {
			top: 15rpx;
			right: 15rpx;
		}
	}

	.ProvideMask();
}
</style>
