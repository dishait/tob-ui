<template>
	<view
		class="t-tag"
		:class="[Color, Rounded, Shadow, Size, Visible]"
		@click="click"
		v-if="visibleTemp"
	>
		<t-icon v-if="leftIcon" :type="leftIcon" class="tag-left-icon" />
		<slot />
		<t-icon v-if="rightIcon" :type="rightIcon" class="tag-right-icon" />
		<t-icon v-if="closeable" @click="close" :type="closeIcon" class="tag-close-icon" />
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, Emits, Size, Color, Shadow, Rounded } from '../../core'

/**
 * Tag 标签
 * @description 标签组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/tag.html
 * 
 * @property {String} leftIcon 左侧图标
 * @property {String} rightIcon 右侧图标
 * @property {Boolean} light = [true|false] 高亮，默认为false
 * @property {Boolean} outline = [true|false] 轮廓，默认为false
 * @property {Boolean} closeable = [true|false] 可关闭，默认为false
 * 
 * @property {String} closeIcon = [close-circle|close|....] 关闭图标，默认为 close-circle
 *
 * @property {String} shadow = [none|sm|base|md|lg|xl|....] 阴影，默认为 none
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 base
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
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为 base
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
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 *
 * @event {Function} click 点击事件
 */
export default {
	mixins: [
		Shadow(),
		Emits(['click']),
		Color({ color: 'base' }),
		Rounded({ rounded: 'base' }),
		Size({
			presets: {
				xs: 'px-1 h-4 text-xs', // 超小
				sm: 'px-2 h-4 text-sm', // 小
				md: 'px-2 h-5 text-md', // 中
				lg: 'px-2 h-6 text-lg' // 大
			}
		})
	],
	emits: ['close'],
	components: {
		tIcon
	},
	props: $P({
		leftIcon: '',
		rightIcon: '',
		closeable: false,
		closeIcon: 'close-circle'
	}),
	data() {
		return {
			visible: true,
			visibleTemp: true
		}
	},
	computed: $C({
		Visible: ['', 'tag-hidden']
	}),
	methods: {
		// 关闭事件
		close(e) {
			this.$emit('close', e)
			this.hidden()
		},
		// 显示
		show() {
			this.visible = true
			this.visibleTemp = true
		},
		// 隐藏
		hidden() {
			this.visible = false
			const endTime = 250
			setTimeout(() => this.visibleTemp = false, endTime)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-tag {
	.inline-flex;
	.items-center;
	transform: scale(1);
	transform-origin: center;
	transition: all 0.2s ease-in-out;
}

.tag {
	// 左图标
	&-left-icon {
		margin-right: 8rpx;
	}

	// 右图标与离开图标
	&-right-icon,
	&-close-icon {
		margin-left: 8rpx;
	}

	// 隐藏
	&-hidden {
		transform: scale(0);
	}
}
</style>
