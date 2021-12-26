<template>
	<view class="t-back-top" :class="[Color, Rounded, Shadow, Size, Visible]" :style="{ right, bottom }" @click="click"><t-icon :type="icon" /></view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, Color, Rounded, Shadow, Size } from '../../core'

uni.useBackTopMixin = (topBounds = 50) => {
	return {
		onPageScroll(e) {
			uni.$emit('_backTop', e.scrollTop >= topBounds)
		}
	}
}

/**
 * BackTop 回到顶部
 * @description 回到顶部组件
 * @tutorial TODO 文档
 *
 * @property {String} right = [50rpx] 右边，默认为50rpx
 * @property {Boolean} light = [true|false] 亮色，默认为false
 * @property {Boolean} outline = [true|false] 轮廓，默认为false
 * @property {String} icon = [arrowup|totop|caret-up|...] 类型，默认为caret-up
 *
 * @property {String} bottom = [50rpx|calc(50rpx + 50px)|...] 底部，默认为50rpx，h5的tabbar页面请再加50px，即calc(50rpx + 50px)
 *
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 *
 * @property {String} color = [primary|secondary|accent|neutral|base|info|success|warning|error|...] 类型，默认为空，白底黑字
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
 * @property {String} shadow = [sm|base|md|lg|xl|...] 类型，默认为sm
 *
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为full，圆
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 * 	@value 2xl 超级大
 * 	@value 3xl 非常大
 * 	@value full 圆
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-back-top',
	mixins: [
		Color({ color: 'bg-white' }),
		Shadow({ shadow: 'sm' }),
		Size({
			presets: {
				xs: 'text-xs w-7 h-7 font-semibold',
				sm: 'text-sm w-8 h-8 font-semibold',
				md: 'text-md w-8 h-8 font-bold',
				lg: 'text-lg w-9 h-9 font-bold'
			}
		}),
		Rounded({ rounded: 'full' })
	],
	emits: ['click'],
	components: {
		tIcon
	},
	props: $P({
		icon: 'caret-up', // 图标
		right: '50rpx', // 距离右侧位置
		bottom: '50rpx' // 距离底部位置
	}),
	data() {
		return {
			visible: false // 可见性
		}
	},
	computed: $C({
		Visible: 'back-top-show' // 可见性
	}),
	methods: {
		// 点击事件
		click(e) {
			this.$emit('click', e)
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 150
			})
		},
		// 显示事件
		visibleEvent(visible) {
			this.visible = visible
		},
		// 创建显示事件
		createVisibleEvent() {
			uni.$on('_backTop', this.visibleEvent)
		},
		// 销毁显示事件
		destroyVisibleEvent() {
			uni.$off('_backTop', this.visibleEvent)
		}
	},
	created() {
		// 创建显示事件
		this.createVisibleEvent()
	},
	destroyed() {
		// 销毁显示事件
		this.destroyVisibleEvent()
	}
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';
.t-back-top {
	.fixed;
	.opacity-0;
	.inline-flex;
	.items-center;
	.justify-center;

	pointer-events: none;
	transform: scale(0.5);
	transition-property: opacity transform;
	transition: 0.3s ease-in-out;

	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

.back-top-show {
	.opacity-100;

	transform: scale(1);
	pointer-events: auto;
	&:active {
		transform: scale(0.8);
	}
}
</style>
