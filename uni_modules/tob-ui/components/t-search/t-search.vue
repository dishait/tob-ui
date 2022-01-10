<template>
	<view class="t-search" :class="[Size, Rounded, Shadow, Color]" @click="click">
		<view class="search-prefix-seat">
			<slot name="prefix">
				<t-icon :type="leftIcon" class="search-left-icon" size="1.2em" @click="leftIconClick" />
			</slot>
		</view>
		<input
			:value="VModelValue"
			:maxlength="maxlength"
			:placeholder="placeholder"
			:class="[InputTextAlign]"
			class="search-input"
			placeholder-class="search-input-placeholder"
			@blur="blur"
			@input="input"
			@click="click"
			@focus="focus"
			@confirm="confirm"
			@keyboardheightchange="keyboardheightchange"
		/>

		<t-icon
			:type="clearIcon"
			:class="[ClearIconVisible]"
			class="search-claer-icon"
			@click="clearIconClick"
		/>

		<slot />
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, Size, Emits, Rounded, VModel, Shadow, Color } from '../../core/index.js'

/**
 * Search 搜索框
 * @description 搜索框组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/form/search.html
 *
 * @property {String} placeholder 占位符，默认为请输入
 * @property {String} leftIcon 左侧图标，默认为 search
 * @property {String} maxlength 最大长度，默认为 -1，无限长
 * @property {String} clearIcon 清除图标，默认为 close-circle
 * 
 * @property {Boolean} light = [true|false] 亮色，默认为 false
 * @property {Boolean} outline = [true|false] 轮廓，默认为 false
 *
 * @property {Boolean} clearable = [true|false] 是否能清除，默认为 true，开启清除
 *
 * @property {String} inputTextAlign = [left|center|right] 输入框文本对齐，默认为 left，左对齐
 *
 * 	@value left 左对齐
 * 	@value center 居中
 * 	@value right 右对齐
 *
 * @property {String} color = [primary|secondary|accent|neutral|base|info|success|warning|error|...] 类型，默认为 base
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
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为 none
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 * 
 * @event {Function} blur 失焦事件
 * @event {Function} clear 清除事件
 * @event {Function} click 点击事件
 * @event {Function} focus 聚焦事件
 * @event {Function} change 变更事件
 * @event {Function} confirm 确认事件
 * @event {Function} leftIconClick 左侧图标点击事件
 * @event {Function} keyboardheightchange 键盘高度变更事件
 */
export default {
	name: 't-search',
	mixins: [
		Shadow(),
		VModel({ value: '' }),
		Emits(['click', 'blur', 'focus', 'change', 'confirm', 'leftIconClick', 'keyboardheightchange']),
		Color({ color: 'base' }),
		Rounded({ rounded: 'base' }),
		Size({
			presets: {
				xs: 'p-1 text-xs',
				sm: 'p-1 text-sm',
				md: 'p-2 text-md',
				lg: 'p-2 text-lg',
			}
		})
	],
	emits: ['clear'],
	components: {
		tIcon
	},
	props: $P({
		maxlength: -1, // 最大长度
		clearable: true, // 开启清理
		leftIcon: 'search', // 左侧图标
		placeholder: '搜索', // 占位符
		clearIcon: 'close-circle', // 清除图标
		inputTextAlign: 'left' // 输入框文本对齐
	}),
	computed: $C({
		// 输入框文本对齐
		InputTextAlign: {
			left: 'text-left',
			right: 'text-right',
			center: 'text-center'
		},
		// 清除图标可见性
		ClearIconVisible() {
			const { VModelValue, clearable } = this
			const visible = VModelValue && clearable
			return visible ? 'search-claer-icon-show' : null
		}
	}),
	methods: {
		// 清除点击事件
		clearIconClick(e) {
			// 清理
			if (this.clearable) {
				this.clear()
			}
		},
		// 输入事件
		input(e) {
			this.updateVModelValue(e.detail.value)
			this.change(e)
		},
		// 清空
		clear() {
			this.updateVModelValue('')
			this.$emit('clear')
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-search {
	.flex;
	.items-center;
	.justify-between;
}

.search {
	// 前缀占位
	&-prefix-seat {
		.flex;
		.items-center;
		.justify-center;
	}

	// 左侧图标
	&-left-icon {
		.mr-1;
	}

	// 清除图标
	&-claer-icon {
		.ml-2;
		opacity: 0;
		transform: scale(0);
		transition: all 0.2s ease-in-out;
		// 显示
		&-show {
			opacity: 1;
			transform: scale(1);
		}
	}

	// 输入框
	&-input {
		.flex-1;
		// 占位符
		/deep/ &-placeholder {
			color: inherit;
		}
	}
}
</style>
