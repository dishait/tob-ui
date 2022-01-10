<template>
	<view class="t-dropdown-menu" @click="click" :style="[Style]">
		<view class="dropdown-menu-mask" :class="[MaskVisible]" @click="maskClick" />
		<view class="dropdown-menu-row" :class="[Disabled, Shadow]">
			<view
				:key="k"
				v-for="(v, k) of VModelValue"
				class="dropdown-menu-row-item"
				@click="optionsRowClick(k, v)"
				:class="[active === k && OptionsRowActive]"
			>{{ options[k][v] }}</view>
		</view>

		<view class="dropdown-menu" :class="[Rounded]" :style="dropdownMenuDynamicHeight">
			<view
				class="dropdown-menu-item"
				v-for="(v, i) of options[active]"
				@click.stop="menuItemClick(active, i)"
				:key="i"
			>
				<slot :text="v" :index="i" :type="active" :isActive="i === VModelValue[active]">
					<view class="dropdown-menu-item-container" :class="i === VModelValue[active] && ActiveColor">
						<text>{{ v }}</text>
						<t-icon type="check" v-if="i === VModelValue[active]" size="1.1em" />
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, Emits, VModel, textColorPresets, Shadow, Rounded } from '../../core'

/**
 * DropdownMenu 下拉菜单
 * @description 下拉菜单组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/feedback/dropdownMenu.html
 * 
 * @property {Object} options 选项
 * @property {Object} menuItemHeights 子项目高度
 * @property {Boolean} disabled = [true|false] 禁用
 * @property {Number} zIndex = [98|99|100|101|....] 层级，默认为100
 * @property {Boolean} closeOnSelected = [true|false] 选中后关闭，默认开启
 * @property {Boolean} closeOnClickMask = [true|false] 点击蒙版关闭，默认开启
 * @property {String} activeColor = [primary|secondary|accent|neutral|info|success|warning|error|...] 选中颜色，只有文本颜色，默认为 error 红色
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
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为 sm
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
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 * @event {Function} maskClick 蒙版点击事件
 * @event {Function} menuItemClick 面板项点击事件
 * @event {Function} optionsRowClick 选项点击事件
 */
export default {
	name: 't-dropdown-menu',
	mixins: [
		Emits(['click']),
		VModel({ value: {} }),
		Shadow({ shadow: 'sm' }),
		Rounded({ rounded: 'base' }),
	],
	emits: [
		'change', // 变更事件
		'maskClick', // 蒙版点击事件
		'menuItemClick', // 面板项点击事件
		'optionsRowClick' // 选项点击事件
	],
	components: {
		tIcon
	},
	props: $P({
		zIndex: 100, // 层级
		options: {}, // 选项
		disabled: false, // 禁用
		menuItemHeights: {}, // 子项目高度
		activeColor: 'error', // 选中的颜色
		closeOnSelected: true, // 选中后关闭
		closeOnClickMask: true // 点击蒙版关闭
	}),
	data() {
		return {
			active: null, // 活动标识
			visible: false // 可见性
		}
	},
	computed: $C({
		ActiveColor: textColorPresets, // 活动态颜色
		Disabled: 'dropdown-menu-row-disabled', // 禁用
		// 自定义样式
		Style() {
			const { zIndex } = this
			return { zIndex }
		},
		// 蒙版可见性
		MaskVisible() {
			const { visible } = this
			return visible ? 'dropdown-menu-mask-show' : null
		},
		// 选项row激活
		OptionsRowActive() {
			const { visible, ActiveColor } = this
			if (visible) {
				return `dropdown-menu-row-item-active ${ActiveColor}`
			}
			return null
		},
		// 动态高度
		dropdownMenuDynamicHeight() {
			const { options, active, visible, menuItemHeights } = this
			const { length } = options[active] || []
			const height = `calc(${length} * ${menuItemHeights[active] || '100%'})`
			return `height: ${visible ? height : 0}`
		}
	}),
	watch: {
		// 触发变更事件
		VModelValue(v) {
			this.change(v)
		}
	},
	methods: {
		// 面板项点击事件
		menuItemClick(k, i) {
			this.updateVModelValue({ ...this.VModelValue, [k]: i })
			this.$emit('menuItemClick', { type: k, value: i })
			if (this.closeOnSelected) {
				this.hidden()
			}
		},
		// 蒙版点击事件
		maskClick(e) {
			this.$emit('maskClick', e)
			if (this.closeOnClickMask) {
				this.hidden()
			}
		},
		// 选项点击事件
		optionsRowClick(k, v) {
			this.updateActive(k)
			this.$emit('optionsRowClick', { type: k })
		},
		// 变更事件
		change(v) {
			this.$emit('change', v)
		},
		// 更新活动标识
		updateActive(v) {
			const shouldHidden = this.active === v && this.visible
			if (shouldHidden) {
				return this.hidden()
			}
			this.show()
			this.active = v
		},
		// 显示面板
		show() {
			this.visible = true
		},
		// 隐藏面板
		hidden() {
			this.visible = false
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
@import (reference, less) "../../core/tool.less";

.t-dropdown-menu {
	.relative;
}

.dropdown-menu {
	.w-full;
	.absolute;
	.bg-white;
	overflow: hidden;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	transition: all 0.15s ease-in-out;

	// 面板项
	&-item {
		// 面板项容器
		&-container {
			.py-2;
			.px-5;
			.flex;
			.items-center;
			.justify-between;
		}
	}

	// 面板row
	&-row {
		.py-2;
		.flex;
		.bg-white;
		.relative;
		.text-center;

		// 面板row禁用
		&-disabled {
			.opacity-40;
			pointer-events: none;
		}

		// 面板row项
		&-item {
			.flex-1;
			.inline-flex;
			.items-center;
			.justify-center;
			// 三角形箭头
			&::after {
				.ml-1;
				.opacity-40;
				content: "";
				transition: all 0.2s ease-in-out;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 6px solid currentColor;
			}
			// 三角箭头旋转
			&-active&::after {
				transform: rotate(180deg);
			}
		}
	}

	.ProvideMask();
}
</style>
