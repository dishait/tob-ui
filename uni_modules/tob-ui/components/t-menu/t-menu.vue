<template>
	<view class="t-menu" :class="[Shadow, Rounded, Horizontal, Size]" @click="click">
		<view v-if="title" class="menu-title">{{ title }}</view>
		<slot />
	</view>
</template>

<script>
import { $P, $C, Size, Shadow, Rounded, Emits, VModel, ProvideEffects, borderColorPresets } from '../../core'

/**
 * Menu 菜单
 * @description 菜单组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/menu.html
 * 
 * @property {String} title 标题，默认为 空
 * @property {Boolean} bordered = [false|true] 边框，默认为false
 * @property {Boolean} horizontal = [true|false] 横排，默认为false
 *
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为sm
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为base
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
 * @property {String} borderColor = [primary|secondary|accent|neutral|info|success|warning|error|...] 边框颜色，默认为primary
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
 *
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-menu',
	mixins: [
		Emits(['click']),
		VModel({ value: '' }),
		ProvideEffects('Menu'),
		Shadow({ shadow: 'sm' }),
		Rounded({ rounded: 'sm' }),
		Size({
			presets: {
				xs: 'w-25',
				sm: 'w-30',
				md: 'w-35',
				lg: 'w-40'
			}
		})
	],
	emits: ['change'],
	provide() {
		// 更新活动态
		const MenuUpdateActive = name => this.updateVModelValue(name)

		return {
			MenuUpdateActive, // 更新活动态
			MenuBordered: this.bordered, // 边框
			MenuHorizontal: this.horizontal, // 横排
			MenuBorderColor: this.BorderColor // 边框颜色
		}
	},
	props: $P({
		title: '', // 标题
		bordered: false, // 边框
		horizontal: false, // 横排
		borderColor: 'primary' // 边框颜色
	}),
	computed: $C({
		Horizontal: 'menu-horizontal', // 横排
		BorderColor: borderColorPresets // 边框颜色
	}),
	watch: {
		VModelValue() {
			// 每次更新，刷新所有活动态
			this.refreshAllActive()
			// 触发change事件
			this.change()
		}
	},
	methods: {
		// 变更事件
		change() {
			this.$emit('change', this.VModelValue)
		},
		// 刷新所有活动态
		refreshAllActive() {
			this.triggerAllEffect(false)
			this.triggerEffect(this.VModelValue, true)
		}
	},
	mounted() {
		// 挂载后，刷新所有活动态，使得子项目状态与容器状态保持一致
		this.refreshAllActive()
	}
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';

.t-menu {
	.inline-flex;
	.flex-col;
	overflow: hidden;

	// 横排
	&.menu-horizontal {
		.flex-row;

		& .menu-title {
			.flex;
			.items-center;
		}
	}
}

// 标题
.menu-title {
	.p-2;
	.text-sm;
	color: #868e96;
}
</style>
