<template>
	<view
		class="notice-bar-container"
		:class="[Shadow, Color, Rounded]"
		@click="click"
		:style="Visible"
	>
		<view class="t-notice-bar" :class="[Size]" :id="nanoid">
			<t-icon
				:type="leftIcon"
				class="notice-bar-left-icon"
				v-if="leftIcon"
				size="1.2em"
				@click="leftIconClick"
			/>
			<view class="notice-bar-content">
				<view class="notice-bar-item" :class="[Scrollable]" :style="[Delay, Duration]">
					<slot />
				</view>
			</view>

			<view class="notice-bar-action">
				<slot name="action" />
				<t-icon
					:type="closeIcon"
					class="notice-bar-close-icon"
					v-if="closeable"
					@click="closeIconClick"
				/>
				<t-icon
					:type="rightIcon"
					class="notice-bar-right-icon"
					v-if="rightIcon"
					@click="rightIconClick"
				/>
			</view>
		</view>
	</view>
</template>

<script>
import { $P, $C, $T, Emits, Color, Rounded, Size, Shadow } from '../../core/index.js'

/**
 * NoticeBar 通知栏
 * @description 通知栏组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/noticeBar.html
 *
 * @property {Boolean} light = [true|false] 亮色，默认为 true
 * @property {Boolean} outline = [true|false] 轮廓，默认为 false
 * @property {Boolean} closeable = [true|false] 可关闭，默认为 false
 * @property {Boolean} scrollable = [true|false] 可滚动，默认为 true
 *
 * @property {String} delay = [1s|0.5s|0.2s|....] 动画延迟，支持单位有 s，ms，默认为空
 * @property {String} duration = [8s|6s|4s|3s|....] 动画时长，支持单位有 s，ms，默认为 8s
 *
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为 success
 *
 * 	@value primary 主要
 * 	@value secondary 次要
 * 	@value accent 强调
 * 	@value neutral 中和
 *
 * 	@value info 信息
 * 	@value success 成功
 * 	@value warning 警告
 * 	@value error 错误
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 full
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
 * @property {String} leftIcon = [fire|bell|alert|notification|bulb|info-circle|folder|error|stop|....] 左侧图标，默认为 sound 
 * 
 * 	@value fire 热门 
 * 	@value bell 消息 
 * 	@value alert 注意 
 * 	@value notification 通知 
 * 	@value bulb 提醒 
 * 	@value info-circle 提示 
 * 	@value folder 文件夹 
 * 	@value error 出错 
 * 	@value stop 禁止 
 * 	@value sound 喇叭 
 * 
 * @property {String} rightIcon = [right|....] 右侧图标，默认为空 
 * 
 * 	@value right 右箭头 
 * 
 * @property {String} closeIcon = [close-circle|close|right|....] 关闭图标，默认当 closeable 为 true 时，走 close-circle 
 * 
 * 	@value close 关闭 
 * 	@value right 右箭头 
 * 	@value close-circle 关闭(圆形) 
 * 
 * @event {Function} click 点击事件 
 * @event {Function} leftIconClick 左侧图标点击事件 
 * @event {Function} rightIconClick 右侧图标点击事件 
 * @event {Function} closeIconClick 关闭图标点击事件 
 */
export default {
	name: 't-notice-bar',
	emits: ['closeIconClick'],
	mixins: [
		Shadow(),
		Rounded(),
		Color({ color: 'success', light: true }),
		Emits(['click', 'leftIconClick', 'rightIconClick']),
		Size({
			presets: {
				xs: 'py-1 px-2 text-xs',
				sm: 'py-2 px-2 text-sm',
				md: 'py-2 px-3 text-md',
				lg: 'py-3 px-3 text-lg'
			}
		})
	],
	props: $P({
		delay: '', // 延迟
		duration: '', // 时长
		rightIcon: '', // 右侧图标
		closeable: false, // 可关闭
		scrollable: true, // 开启滚动
		leftIcon: 'sound', // 左侧图标
		closeIcon: 'close-circle' // 关闭图标
	}),
	data() {
		return {
			visible: true, // 可见性
			realHeight: 0, // 真实高度
			nanoid: $T.nanoid(), // 唯一标识
			firstRenderStatus: true // 第一次渲染状态
		}
	},
	computed: $C({
		Scrollable: 'notice-bar-item-scrollable', // 滚动
		// 显示动画
		Visible() {
			let { visible, realHeight, firstRenderStatus } = this
			return `height: ${firstRenderStatus ? 'none' : visible ? realHeight : 0};`
		},
		// 延迟
		Delay() {
			const { delay } = this
			return delay ? { animationDelay: delay } : null
		},
		// 动画时长
		Duration() {
			const { duration } = this
			return duration ? { animationDuration: duration } : null
		}
	}),
	methods: {
		// 显示
		show() {
			this.visible = true
		},
		// 隐藏
		hidden() {
			this.visible = false
		},
		// 动作点击事件
		closeIconClick(e) {
			if (this.closeable) {
				this.hidden()
				this.$emit('closeIconClick', e)
			}
		},
		// 移除首次渲染状态
		unFirstRenderStatus() {
			this.firstRenderStatus = false
		},
		// 获取高度
		showRealHeight() {
			$T.query(this, `#${this.nanoid}`).then(res => {
				this.realHeight = `${res.height}px`
				this.unFirstRenderStatus()
			})
		}
	},
	mounted() {
		this.showRealHeight()
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-notice-bar {
	.flex;
	.items-center;
}

.notice-bar {
	// 容器
	&-container {
		overflow: hidden;
		transition: all 0.2s ease-in-out;
	}

	// 关闭图标
	&-right-icon,
	&-close-icon {
		.pl-2;
	}

	// 左侧图标
	&-left-icon {
		.pr-2;
	}

	// 内容
	&-content {
		.flex-1;
		overflow: hidden;
	}

	// 子项
	&-item {
		.inline-flex;
		min-width: 100%;

		// 滚动
		&-scrollable {
			white-space: nowrap;
			animation: 8s linear infinite loop;
		}
	}

	&-action {
		.flex;
		.items-center;
	}
}

// 滚动动画
@keyframes loop {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(-100%);
	}
}
</style>
