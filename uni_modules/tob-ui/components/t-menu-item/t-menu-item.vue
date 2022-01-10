<template>
	<view
		class="t-menu-item"
		:class="[BorderColor, Disabled, Active, Bordered, Horizontal]"
		@click="click"
	>
		<view class="menu-item-content">
			<view class="menu-item-left">
				<t-icon v-if="icon" size="1.1em" :type="icon" class="menu-item-icon" />
				<slot />
			</view>
			<slot name="right" />
		</view>
	</view>
</template>

<script>
import { $P, $C, $M, InjectEffects } from '../../core'

/**
 * MenuItem 菜单项
 * @description 菜单项组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/menu.html
 * 
 * @property {String} icon 图标
 * @property {String} name 选中标识
 * @property {Boolean} disabled = [true|false] 禁用，默认为 false
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-menu-item',
	mixins: [InjectEffects('Menu')],
	emits: ['click'],
	inject: {
		// 更新状态
		MenuUpdateActive: {
			from: 'MenuUpdateActive'
		},
		// 边框颜色
		borderColor: {
			from: 'MenuBorderColor'
		},
		// 横排
		horizontal: {
			from: 'MenuHorizontal'
		},
		// 边框
		bordered: {
			from: 'MenuBordered'
		}
	},
	data() {
		return {
			active: false // 激活状态
		}
	},
	props: $P({
		icon: '', // 图标
		disabled: false, // 禁用
		name: '', // 命名，用于标识
	}),
	computed: $C({
		Active: 'menu-item-active', // 激活
		Disabled: 'menu-item-disabled', // 禁用
		Horizontal: 'menu-item-horizontal', // 横排
		Bordered: [null, 'menu-item-hidden-bordered'], // 边框
		// 边框颜色(兼容小程序端)
		BorderColor() {
			return this.borderColor
		}
	}),
	methods: $M({
		toggle: true,
		// 点击事件
		click(e) {
			this.MenuUpdateActive(this.name, true)
			this.$emit('click', this.name, e)
		}
	}),
	created() {
		const changeActive = status => this.toggle('active', status)
		this.MenuTrackEffect(this.name, changeActive)
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

/* #ifdef H5 */
@media screen and (min-width: 680px) {
	.t-menu-item:hover {
		border-left-width: 3px;
		background-color: #f1f3f5;
	}
}
/* #endif */

.t-menu-item {
	.p-2;
	.pl-3;
	.flex;
	.items-center;
	.text-currentColor;
	border-left-width: 0;
	border-left-style: solid;
	transition: all 0.15s linear;

	/* #ifdef H5 */
	.cursor-pointer;
	/* #endif */
}

.menu-item {
	// 左侧
	&-left {
		.flex;
		.items-center;
	}

	// 图标
	&-icon {
		.mr-1;
	}

	// 禁用
	&-disabled,
	&-disabled:hover {
		.opacity-20;
		.cursor-not-allowed;
		pointer-events: none;
	}

	// 活动态
	&-active:not(.disabled) {
		border-left-width: 3px;
		border-left-style: solid;
		background-color: #f1f3f5;
	}

	// 内容
	&-content {
		.flex;
		.w-full;
		.items-center;
		.justify-between;
	}

	// 隐藏边框
	&-hidden-bordered {
		border: none !important;
	}

	// 横排
	&-horizontal {
		border-left-width: 0px !important;
	}
}
</style>
