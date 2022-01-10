<template>
	<view class="t-breadcrumbs" :class="[Size, Color]">
		<view class="breadcrumbs-ul">
			<view class="breadcrumbs-li" v-for="(v, i) of list" :key="i">
				<t-icon v-if="ShouldShowArrow(i)" type="right" class="breadcrumbs-icon" />

				<t-icon v-if="leftIcon" :type="leftIcon" class="breadcrumbs-icon" />
				<view class="breadcrumbs-a" :class="[Color]" @click="click(v, i)">{{ v }}</view>

				<t-icon v-if="rightIcon" :type="rightIcon" class="breadcrumbs-icon" />
			</view>
		</view>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, Size, Color, textColorPresets } from '../../core'

/**
 * Breadcrumbs 面包屑
 * @description 面包屑组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/breadcrumbs.html
 * @property {String} leftIcon 前缀图标
 * @property {String} rightIcon 后缀图标
 * @property {Arrary} list 路径列表，项目为String类型
 *
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
	name: 't-breadcrumbs',
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
	emits: ['click'],
	components: {
		tIcon
	},
	props: $P({
		list: [], // 列表
		leftIcon: '', // 左侧图标
		rightIcon: '' // 右侧图标
	}),
	methods: {
		// 点击事件
		click(v, i) {
			this.$emit('click', v, i, this.list)
		},
		// 显示箭头判断
		ShouldShowArrow(i) {
			return i !== 0
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-breadcrumbs {
	.py-1;
	max-width: 100%;
	overflow-x: auto;
}

.breadcrumbs {
	// 图标
	&-icon {
		.mx-1;
	}

	&-ul {
		.flex;
		.items-center;
		white-space: nowrap;
		min-height: min-content;
	}

	&-li {
		.flex;
		.items-center;
	}

	// 链接
	&-a {
		.flex;
		.items-center;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */

		&:hover,
		&:active {
			.underline;
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
	}
}
</style>
