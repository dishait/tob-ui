<template>
	<view
		class="t-nav-bar"
		:style="{ zIndex, height }"
		:class="[Sticky, Color, Shadow]"
		@click="click"
	>
		<view class="nav-bar-left" @click="leftClick">
			<slot name="left">
				<view class="nav-bar-left-seat">
					<t-icon class="nav-bar-left-arrow" v-if="leftIcon" :type="leftIcon" />
					<text class="nav-bar-left-text">{{ leftText }}</text>
				</view>
			</slot>
		</view>

		<view class="nav-bar-center" @click="centerClick">
			<slot>
				<text class="nav-bar-title">{{ title }}</text>
			</slot>
		</view>

		<view class="nav-bar-right" @click="rightClick">
			<slot name="right">
				<view class="nav-bar-right-seat">
					<text class="nav-bar-right-text" v-if="rightText">{{ rightText }}</text>
					<t-icon class="nav-bar-right-arrow" v-if="rightIcon" :type="rightIcon" />
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, Color, Shadow, Emits } from '../../core'

/**
 * NavBar 导航栏
 * @description 导航栏组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/navBar.html
 *
 * @property {String} title 标题
 * 
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为 100
 * @property {String} leftIcon 左侧图标，默认为 left 箭头，为空字符串时将不显示
 * @property {String} leftText 左侧文本
 * @property {String} rightIcon 右侧图标
 * @property {String} rightText 右侧文本
 *
 * @property {Number} delta = [1|2|3|....] 返回层级，默认为 1
 * @property {Boolean} sticky = [true|false] 粘性定位，默认为 false
 * @property {Boolean} customGo = [true|false] 自定义跳转，默认为 false 走 navigateBack
 * @property {String} height = [44px|48px] 高度，默认小程序端统一 48px，其他端统一 44px
 *
 *
 * @property {String} color = [primary|secondary|accent|neutral|base|info|success|warning|error|...] 类型，默认为空
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
 * @event {Function} click 点击事件
 * @event {Function} leftClick 左侧点击事件
 * @event {Function} rightClick 右侧点击事件
 * @event {Function} centerClick 中间点击事件
 */
export default {
	name: 't-nav-bar',
	mixins: [
		Shadow({ shadow: 'sm' }),
		Emits(['click', 'rightClick', 'centerClick']),
		Color({
			color: 'bg-white'
		})
	],
	emits: [
		'leftClick', // 左侧点击事件
		'rightClick', // 右侧点击事件
		'centerClick' // 中间点击事件
	],
	components: {
		tIcon
	},
	props: $P({
		title: '', // 标题
		delta: 1, // 返回层级
		zIndex: 100, // 视图层级
		leftText: '', // 左侧文本
		rightText: '', // 右侧文本
		rightIcon: '', // 右侧图标
		sticky: false, // 粘性定位
		leftIcon: 'left', // 左侧图标
		customGo: false, // 自定义跳转，默认走navigateBack
		height: '44px', // 高度
		// #ifdef MP
		height: '48px' // 高度
		// #endif
	}),
	computed: $C({
		Sticky: 'sticky top-0' // 粘性定位
	}),
	methods: {
		// 左侧点击事件
		leftClick(e) {
			this.$emit('leftClick', e)
			// 默认路由跳转
			if (!this.customGo) {
				this.back()
			}
		},
		// 返回
		back() {
			uni.navigateBack({
				delta: parseInt(this.delta)
			})
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
// 导航栏容器
.t-nav-bar {
	.flex;
	.px-2;
	.statusbar;
	.items-center;
	.justify-between;
}

.nav-bar {
	// 单独左侧
	&-left {
		.justify-start;
		// 文本
		&-text {
			.ml-1;
		}
	}

	// 单独右侧
	&-right {
		.justify-end;
		// 文本
		&-text {
			.mr-1;
		}
	}

	// 左右侧
	&-left,
	&-right {
		.flex-1;
		// 默认占位
		&-seat {
			.flex;
			.items-baseline;
		}
	}

	// 中间
	&-center {
		flex: 2;
		.justify-center;
	}

	// 统一
	&-left,
	&-right,
	&-center {
		.flex;
		.items-center;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */
	}

	// 默认标题
	&-title {
		.text-xl;
	}
}
</style>
