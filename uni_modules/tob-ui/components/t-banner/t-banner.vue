<template>
	<view class="t-banner">
		<swiper
			:class="[Size]"
			:current="current"
			:autoplay="autoplay"
			:interval="interval"
			:duration="duration"
			:circular="circular"
			:vertical="vertical"
			:touchable="touchable"
			:nextMargin="nextMargin"
			:active-class="activeClass"
			:disableTouch="disableTouch"
			:acceleration="acceleration"
			:currentItemId="currentItemId"
			:changing-class="changingClass"
			:indicator-dots="indicatorDots"
			:previousMargin="previousMargin"
			:easingFunction="easingFunction"
			:indicator-color="indicatorColor"
			:displayMultipleItems="displayMultipleItems"
			:skipHiddenItemLayout="skipHiddenItemLayout"
			:indicator-active-color="indicatorActiveColor"
			:disableProgrammaticAnimation="disableProgrammaticAnimation"
			@click="click"
			@change="change"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item :item-id="itemId" v-for="(v, i) of list" :key="i" @click="itemClick(v)">
				<t-img
					:src="v.url"
					:size="Img.size"
					:webp="Img.webp"
					:mode="Img.mode"
					:status="Img.status"
					:shadow="Img.shadow"
					:rounded="Img.rounded"
					:lazyLoad="Img.lazyLoad"
					:draggable="Img.draggable"
					:showMenuByLongpress="Img.showMenuByLongpress"
				/>
			</swiper-item>
		</swiper>

		<slot name="indicator" :current="currentIndex + 1" :total="total" />
	</view>
</template>

<script>
import tImg from '../t-img/t-img.vue'
import { $P, Emits, Size } from '../../core/index.js'

/**
 * Banner 轮播图
 * @description 轮播图组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/banner.html
 *
 * @property {Number} duration = [250|500|....] 滑动动画时长，默认为 500
 * @property {String} indicatorColor = [#868e96|....] 指示点颜色，默认为 #868e96
 * @property {Boolean} indicatorDots = [true|false] 显示面板指示点，默认为 true 显示
 * @property {String} indicatorActiveColor = [white] 当前选中的指示点颜色，默认为 white 白色
 *
 * @property {String} activeClass  swiper-item 可见时的 class，仅支持支付宝小程序
 * @property {String} changingClass  acceleration 设置为 {{true}} 时且处于滑动过程中，中间若干屏处于可见时的 class，仅支持支付宝小程序
 *
 * @property {Number} current = [0|....] 当前所在滑块的 index，默认为 0
 * @property {Boolean} autoplay = [true|false] 是否自动切换，默认为true，自动切换
 * @property {String} currentItemId 当前所在滑块的 item-id ，不能与 current 被同时指定，支付宝小程序不支持
 * @property {Number} interval = [3000|5000|10000|....] 自动切换时间间隔，默认为5000
 *
 * @property {Boolean} circular = [true|false] 是否采用衔接滑动，即播放到末尾后重新回到开头，默认为 true，衔接滑动
 *
 * @property {Boolean} vertical = [true|false] 滑动方向是否为纵向，默认为false，横向
 *
 * @property {String} previousMargin = [-1rpx|....] 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值，默认为 -1rpx，字节跳动小程序、飞书小程序不支持
 *
 * @property {String} nextMargin = [-1rpx|....] 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值，默认为 -1rpx，字节跳动小程序、飞书小程序不支持
 *
 * @property {Boolean} acceleration = [true|false] 当开启时，会根据滑动速度，连续滑动多屏，默认为 false，仅支持支付宝小程序
 *
 * @property {Boolean} disableProgrammaticAnimation = [true|false] 是否禁用代码变动触发 swiper 切换时使用动画，默认为 false，仅支持支付宝小程序
 *
 * @property {Number} displayMultipleItems = [1|....] 同时显示的滑块数量，默认为1，支付宝小程序不支持
  *
  * @property {Boolean} skipHiddenItemLayout = [true|false] 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息，默认为 false，仅支持 App、微信小程序
  *
  * @property {Boolean} disableTouch = [true|false] 是否禁止用户  touch 操作，默认为 false，不禁止
  *
  * @property {Boolean} touchable = [true|false] 是否监听用户的触摸事件，只在初始化时有效，不能动态变更，默认为 true，监听用户触摸
  *
  * @property {String} easingFunction = [default|linear|easeInCubic|easeOutCubic|easeInOutCubic] 指定 swiper 切换缓动动画类型，仅支持微信小程序、快手小程序，默认为 default
  *
  * @property {Object} img 图片属性，可参考 t-img 组件 props
  *
  * @property {Array} list 轮播图列表，元素必须是包含 url 的对象
  * @property {String} size = [xs|sm|md|lg|...] 大小，默认为 md
  *
  * 	@value xs 小
  * 	@value sm 基础
  * 	@value md 大
  * 	@value lg 超大
  *
  * @event {Function} click 点击事件
  * @event {Function} change 变更事件
  * @event {Function} itemClick 子项点击事件
  * @event {Function} animationfinish 动画结束事件
  * @event {Function} transition swiperItem 位置变动事件
  */
export default {
	name: 't-banner',
	mixins: [
		Emits(['click', 'transition', 'animationfinish']),
		Size({
			presets: {
				xs: 'w-full h-25',
				sm: 'w-full h-28',
				md: 'w-full h-35',
				lg: 'w-full h-40'
			}
		})
	],
	components: {
		tImg
	},
	emits: ['change', 'itemClick'],
	props: $P({
		img: {},
		list: [],
		itemId: '',
		current: 0,
		duration: 500,
		circular: true,
		interval: 5000,
		autoplay: true,
		touchable: true,
		vertical: false,
		activeClass: '',
		changingClass: '',
		currentItemId: '',
		nextMargin: '-1rpx',
		disableTouch: false,
		indicatorDots: true,
		acceleration: false,
		previousMargin: '-1rpx',
		displayMultipleItems: 1,
		indicatorColor: '#868e96',
		easingFunction: 'default',
		skipHiddenItemLayout: false,
		indicatorActiveColor: 'white',
		disableProgrammaticAnimation: false
	}),
	data() {
		return {
			currentIndex: 0 // 当前值
		}
	},
	computed: {
		// 总数
		total() {
			const { list } = this
			return list ? list.length : 0
		},
		// 图片
		Img() {
			const { img } = this
			return Object.assign(
				{
					status: '',
					webp: false,
					shadow: 'none',
					rounded: 'none',
					lazyLoad: false,
					draggable: true,
					mode: 'aspectFill',
					size: 'w-full h-full',
					showMenuByLongpress: false
				},
				img
			)
		}
	},
	methods: {
		// 变更事件
		change(e) {
			this.currentIndex = e.detail.current
			this.$emit('change', e)
		},
		// 项目点击
		itemClick(v) {
			this.$emit('itemClick', v)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-banner {
	.w-full;
	.h-full;
	.relative;
}
</style>
