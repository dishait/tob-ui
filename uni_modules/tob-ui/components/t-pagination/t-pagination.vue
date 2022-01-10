<template>
	<view class="t-pagination" :class="[Color, Shadow, Rounded, Size]" @click="click">
		<view class="pagination-left-icon" :class="[PrevDisable]" @click="prev">
			<t-icon :type="prevDisable ? 'stop' : 'left'" />
		</view>
		<view v-if="!simple">
			<text v-if="prevEllipsisVisible" @click="prevPage" class="pagination-ellipsis">...</text>
			<text
				v-for="v of items"
				:key="v"
				@click="itemClick(v)"
				class="pagination-item pagination-no-current"
				:class="VModelValue === v && 'pagination-current'"
			>{{ v }}</text>
			<text v-if="nextEllipsisVisible" @click="nextPage" class="pagination-ellipsis">...</text>
		</view>
		<text class="pagination-item" v-else>{{ VModelValue }} / {{ total }}</text>
		<view class="pagination-right-icon" :class="[NextDisable]" @click="next">
			<t-icon :type="nextDisable ? 'stop' : 'right'" />
		</view>
	</view>
</template>

<script>
import tIcon from '../t-icon/t-icon.vue'
import { $P, $C, Size, Color, VModel, Emits, Shadow, Rounded } from '../../core'

/**
 * Pagination 分页
 * @description 分页组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/pagination.html
 *
 * @property {Boolean} light = [true|false] 亮色，默认为 false
 * @property {Boolean} outline = [true|false] 轮廓，默认为 false
 * @property {Boolean} simple = [true|false] 简单模式，默认为 false
 * @property {Number} pageSize = [3|4|5|....] 每次显示多少页，默认为4，保持在5以内会美观
 * @property {Number} total = [4|5|10|20|99|....] 总页数，默认为4，保持在99以内会更美观，大数据情况尽量用简单模式会更美观
 *
 * @property {String} size = [xs|sm|md|lg|...] 大小，默认为md
 *
 * 	@value xs 小
 * 	@value sm 基础
 * 	@value md 大
 * 	@value lg 超大
 *
 * @property {String} color = [primary|secondary|accent|neutral|base|info|success|warning|error|...] 类型，默认为空
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
 *  @value white 白底黑字
 *
 * @property {String} shadow = [sm|base|md|lg|xl|...] 类型，默认为sm
 *
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 bsae
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
 * @event {Function} click 点击事件
 * @event {Function} change 变更事件
 */
export default {
	name: 't-pagination',
	mixins: [
		Color(),
		VModel({
			value: 0
		}),
		Shadow({
			shadow: 'sm'
		}),
		Rounded({
			rounded: 'base'
		}),
		Emits(['click', 'change']),
		Size({
			presets: {
				xs: 'h-7 text-xs',
				sm: 'h-6 text-sm',
				md: 'h-7 text-md',
				lg: 'h-8 px-1 text-lg'
			}
		})
	],
	components: {
		tIcon
	},
	props: $P({
		total: 4, // 总页数
		pageSize: 4, // 每次显示多少页
		simple: false // 简易模式
	}),
	computed: $C({
		PrevDisable: 'pagination-disable', // 上一项禁用样式
		NextDisable: 'pagination-disable', // 下一项禁用样式
		// 上一项禁用
		prevDisable() {
			return this.VModelValue <= 1
		},
		// 下一项禁用
		nextDisable() {
			return this.VModelValue === this.total
		},
		// 当前显示的项目
		items() {
			const { currentPageGroup, pageSize } = this
			const container = new Array(pageSize).fill(0)
			const handleRange = (v, i) => i + 1 + (currentPageGroup - 1) * pageSize
			return container.map(handleRange)
		},
		// 总页数
		pageCount() {
			const { pageSize, total } = this
			return Math.ceil(total / pageSize)
		},
		// 当前页组
		currentPageGroup() {
			const { VModelValue, pageSize } = this
			return Math.ceil(VModelValue / pageSize)
		},
		// 上一项省略号可见性
		prevEllipsisVisible() {
			const { currentPageGroup } = this
			return currentPageGroup > 1
		},
		// 下一项省略号可见性
		nextEllipsisVisible() {
			const { currentPageGroup, pageCount } = this
			return pageCount - currentPageGroup > 0
		}
	}),
	watch: {
		VModelValue(v) {
			// 触发变更事件
			this.change({
				current: v, // 当前所处页
				isStart: this.prevDisable, // 是否是第一页
				isEnd: this.nextDisable // 是否是最后一页
			})
		}
	},
	methods: {
		// 上一页
		prevPage() {
			this.updateVModelValue(this.VModelValue - this.pageSize)
		},
		// 下一页
		nextPage() {
			this.updateVModelValue(this.VModelValue + this.pageSize)
		},
		// 上一项
		prev() {
			if (!this.prevDisable) {
				this.updateVModelValue(this.VModelValue - 1)
			}
		},
		// 下一项
		next() {
			if (!this.nextDisable) {
				this.updateVModelValue(this.VModelValue + 1)
			}
		},
		// 项目点击事件(只在非简易模式有效)
		itemClick(v) {
			this.updateVModelValue(v)
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
// 分页
.t-pagination {
	.inline-flex;
	.items-center;
}

.pagination {
	// 非选中
	&-item&-no-current {
		color: #ced4da;
	}

	// 选中
	&-item&-current {
		color: currentColor;
	}

	// 项目
	&-item {
		.px-2;
		.font-bold;
		transition: all 0.15s ease-in-out;

		/* #ifdef H5 */
		.cursor-pointer;
		&:hover {
			color: currentColor;
		}
		/* #endif */
	}

	// 左右图标
	&-left-icon,
	&-right-icon {
		.px-2;
		.font-bold;
		.inline-flex;
		.items-center;
		.justify-center;
		.opacity-50;

		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */

		transition: transform 0.15s ease-in-out;

		&:active {
			.opacity-100;
			transform: scale(0.85);
		}
	}

	// 禁用
	&-disable {
		opacity: 0.5;
		pointer-events: none;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}

	// 省略号
	&-ellipsis {
		.font-bold;
		color: #ced4da;
		/* #ifdef H5 */
		.cursor-pointer;
		/* #endif */
	}
}
</style>
