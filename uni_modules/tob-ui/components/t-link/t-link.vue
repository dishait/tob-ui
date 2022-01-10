<template>
	<view class="t-link" :class="[Color, Size, Focus]" @click="click">
		<slot />
	</view>
</template>

<script>
import { $P, $C, Size, Color, textColorPresets } from '../../core'

/**
 * Link 链接
 * @description 链接组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/link.html
 * 
 * @property {String} to = [/pages/|....]跳转，只允许navigateTo
 * @property {String} color = [primary|secondary|accent|neutral|base|info|success|warning|error|...] 颜色，默认为空
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
	name: 't-link',
	emits: ['click'],
	mixins: [
		Color({
			inject: 'link',
			presets: textColorPresets
		}),
		Size({
			presets: {
				xs: 'text-xs',
				sm: 'text-sm',
				md: 'text-md',
				lg: 'text-lg',
			}
		})
	],
	props: $P({
		to: '', // 跳转
		focus: false // 聚焦
	}),
	computed: $C({
		Focus: 'link-focus' // 聚焦
	}),
	methods: {
		// 点击事件
		click(e) {
			const url = this.to
			if (url) {
				uni.navigateTo({ url })
			}
			this.$emit('click', e)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-link {
	.inline-block;
	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

// 聚焦
.link-focus,
.t-link:hover {
	.underline;
}

// 点击激活状态
.link-active() {
	&.text {
		// 主要
		&-primary {
			.text-primary-focus;
		}
		// 次要
		&-secondary {
			.text-secondary-focus;
		}
		// 强调
		&-accent {
			.text-accent-focus;
		}
		// 中和
		&-neutral {
			.text-neutral-focus;
		}
		// 基础
		&-base {
			.text-base-focus;
		}
		// 信息
		&-info {
			.text-info-focus;
		}
		// 成功
		&-success {
			.text-success-focus;
		}
		// 警告
		&-warning {
			.text-warning-focus;
		}
		// 错误
		&-error {
			.text-error-focus;
		}
	}
}

// 激活
.t-link:hover,
.t-link:active {
	.link-active();
}
</style>
