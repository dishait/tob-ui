<template>
	<view
		class="t-grid-item"
		@click="click"
		:style="Style"
		:class="[Align, Justify, Direction, Color, Rounded, Shadow, Size]"
	>
		<slot>
			<t-icon :type="icon" v-if="icon" size="1.5em" />
			<text class="grid-item-text" v-if="text">{{ text }}</text>
		</slot>
	</view>
</template>

<script>
import { $P, $C, Color, Rounded, Shadow, Size, Flex } from '../../core'

/**
 * GirdItem 宫格项
 * @description 宫格项组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/grid.html
 *
 * @property {String} icon 图标
 * @property {String} text 文本
 * @property {String} to = [/pages/|....]跳转，只允许navigateTo
 * @property {Boolean} light = [true|false] 高亮，默认为false
 * @property {Boolean} outline = [true|false] 轮廓，默认为false
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
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 md
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
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为空
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
	name: 't-grid-item',
	mixins: [
		Shadow(),
		Rounded({ rounded: 'md' }),
		Color({ inject: 'grid-item' }),
		Size({
			presets: {
				xs: 'py-1 text-xs',
				sm: 'py-1 text-sm',
				md: 'py-2 text-md',
				lg: 'py-2 text-lg'
			}
		}),
		Flex({
			align: 'center',
			justify: 'center',
			direction: 'col'
		})
	],
	emits: ['click'],
	props: $P({
		to: '',
		icon: '', // 图标
		text: '' // 文本
	}),
	inject: ['GridGutter', 'GridColumn'],
	computed: $C({
		Style() {
			const { GridColumn, GridGutter } = this
			const width = GridGutter ? `calc(100% / ${GridColumn} - ${GridGutter} * 2);margin: ${GridGutter}` : `calc(100% / ${GridColumn})`
			return `width: ${width};`
		}
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
.t-grid-item {
	.inline-flex;

	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
	overflow: hidden;
	box-sizing: border-box;
	transition: all 0.15s ease-in-out;
	&:active {
		transform: scale(0.9);
	}
}

// 点击激活状态
.grid-item-active() {
	// 轮廓
	&.grid-item-outline {
		.text-white;
	}
	// 高亮
	&.grid-item-light {
		.text-white;
		.bg-opacity-100;
	}
	&.grid-item {
		// 主要
		&-primary {
			.bg-primary-focus;
		}
		// 次要
		&-secondary {
			.bg-secondary-focus;
		}
		// 强调
		&-accent {
			.bg-accent-focus;
		}
		// 中和
		&-neutral {
			.bg-neutral-focus;
		}
		// 基础
		&-base {
			.bg-base-focus;
		}
		// 信息
		&-info {
			.bg-info-focus;
		}
		// 成功
		&-success {
			.bg-success-focus;
		}
		// 警告
		&-warning {
			.bg-warning-focus;
		}
		// 错误
		&-error {
			.bg-error-focus;
		}
	}
}

// 激活
.t-grid-item:active {
	.grid-item-active();
}

// 占位
.grid-item {
	&-text {
		.m-1;
		.text-xs;
	}
}
</style>
