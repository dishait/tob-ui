<template>
	<view class="img-container" :class="[Size, Loading, Rounded, Shadow, Status, Fail]">
		<view class="img-loading-seat">
			<slot name="loading" v-if="loading"></slot>
		</view>

		<view class="img-fail-seat" v-if="fail">
			<slot name="fail">
				<t-icon type="file-image" size="1.8em" />
			</slot>
		</view>

		<image
			v-if="!fail"
			:src="src"
			:mode="mode"
			:webp="webp"
			class="t-img"
			:lazy-load="lazyLoad"
			:draggable="draggable"
			:class="[Size, Rounded]"
			:show-menu-by-longpress="showMenuByLongpress"
			@click="click"
			@error="error"
			@load="success"
		/>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $C, $P, Size, Emits, Shadow, Rounded } from '../../core'

/**
 * Img 图片
 * @description 图片组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/img.html
 * 
 * @property {String} src 图片地址
 * @property {Boolean} webp = [true|false] 解析 webp 格式，默认为 false 不解析(微信小程序)
 * @property {Boolean} lazyLoad = [true|false] 懒加载，默认为 false (微信小程序、百度小程序、字节跳动小程序、飞书小程序)
 *
 * @property {Boolean} showMenuByLongpress = [true|false] 开启长按图片显示识别小程序码菜单，默认为 false (微信小程序)
 *
 * @property {Boolean} draggable = [true|false] 鼠标长按是否能拖动图片(微信小程序)，默认为 false
 *
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 *
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为 none
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 none
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
 * @property {String} status = [online|offline] 尺寸，默认为空
 *
 * 	@value online 在线
 * 	@value offline 离线
 *
 * @property {String} mode = [scaleToFill|aspectFit|aspectFill|widthFix|heightFix|top|bottom|center|left|right|top left|top right|bottom left|bottom right] 裁切模式，默认为 scaleToFill
 *
 * 	@value scaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
 * 	@value aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
 * 	@value aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
 * 	@value widthFix 宽度不变，高度自动变化，保持原图宽高比不变
 * 	@value heightFix 高度不变，宽度自动变化，保持原图宽高比不变 App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3
 * 	@value top 不缩放图片，只显示图片的顶部区域
 * 	@value bottom 不缩放图片，只显示图片的底部区域
 * 	@value center 不缩放图片，只显示图片的中间区域
 * 	@value left 不缩放图片，只显示图片的左边区域
 * 	@value right 不缩放图片，只显示图片的右边区域
 * 	@value top left 不缩放图片，只显示图片的左上边区域
 * 	@value top right 不缩放图片，只显示图片的右上边区域
 * 	@value bottom left 不缩放图片，只显示图片的左下边区域
 * 	@value bottom right 不缩放图片，只显示图片的右下边区域
 *
 * @event {Function} click 点击事件
 * @event {Function} error 加载错误事件
 * @event {Function} success 图片载入完毕事件
 */
export default {
	name: 't-img',
	mixins: [
		Shadow(),
		Rounded(),
		Emits(['click']),
		Size({
			presets: {
				xs: 'h-10 w-14 text-xs', // 超小
				sm: 'h-14 w-18 text-sm', // 小
				md: 'h-20 w-25 text-md', // 中
				lg: 'h-28 w-32 text-lg' // 大
			}
		})
	],
	emits: ['error', 'success'],
	components: {
		tIcon
	},
	props: $P({
		src: '',
		status: '',
		webp: false,
		lazyLoad: false,
		draggable: true,
		mode: 'scaleToFill',
		showMenuByLongpress: false
	}),
	computed: $C({
		Fail: 'img-bg-color',
		Loading: 'img-loading img-bg-color',
		Status: {
			online: 'img-$',
			offline: 'img-$'
		}
	}),
	data() {
		return {
			fail: false,
			loading: true
		}
	},
	methods: {
		// 加载完毕事件
		success(e) {
			this.loading = false
			this.$emit('success', e)
		},
		// 错误事件
		error(e) {
			this.fail = true
			this.loading = false
			this.$emit('error', e)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-img {
	.absolute;
}

.img {
	// 容器
	&-container {
		.flex;
		.relative;
		.items-center;
		.justify-center;
		overflow: hidden;
	}

	// 占位
	&-loading-seat,
	&-fail-seat {
		.absolute;
		top: 50%;
		left: 50%;
		color: #adb5bd;
		transform: translate(-50%, -50%);
	}

	// 加载中
	&-loading {
		animation: blink 1s ease-in-out infinite;
	}

	// 背景色
	&-bg-color {
		background-color: #f8f9fa;
	}

	// 状态
	&-online::after,
	&-offline::after {
		.block;
		.absolute;
		.rounded-full;
		top: 6%;
		right: 6%;
		content: "";
		width: 0.5em;
		height: 0.5em;
		box-shadow: 0 0 0 2px #ffffff;
	}

	// 在线状态
	&-online::after {
		.bg-success;
	}

	// 离线状态
	&-offline::after {
		.bg-error;
	}
}

@keyframes blink {
	0% {
		opacity: 1;
	}

	60% {
		opacity: 0.4;
	}

	100% {
		opacity: 1;
	}
}
</style>
