<template>
	<view class="t-pendant-item" :class="[Position]" @click="click">
		<slot />
	</view>
</template>

<script>
import { $P, $C, Emits } from '../../core'

/**
 * PendantItem 挂件项
 * @description 挂件项组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/show/pendant.html
 * 
 * @property {String} position = [left-top|center-top|right-top|left-middle|center-middle|right-middle|left-bottom|center-bottom|right-bottom] 位置，默认为 右上角
 *
 *	@value left-top 左上
 *	@value center-top 中上
 *	@value right-top 右上
 *	@value left-middle 左中
 *	@value center-middle 中
 *	@value right-middle 右中
 *	@value left-bottom 左下
 *	@value center-bottom 中下
 *	@value right-bottom 右下
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-pendant-item',
	mixins: [Emits(['click'])],
	props: $P({
		position: 'right-top'
	}),
	computed: $C({
		Position: {
			'left-top': 'pendant-start',
			'center-top': 'pendant-center',
			'right-top': 'pendant-end',

			'left-middle': 'pendant-middle pendant-start',
			'center-middle': 'pendant-middle pendant-center',
			'right-middle': 'pendant-middle pendant-end',

			'left-bottom': 'pendant-bottom pendant-start',
			'center-bottom': 'pendant-bottom pendant-center',
			'right-bottom': 'pendant-bottom pendant-end'
		}
	})
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";

.t-pendant-item {
	.absolute;
	--t-translate-x: 50%;
	--t-translate-y: -50%;
	transform: translateX(var(--t-translate-x)) translateY(var(--t-translate-y));

	&.pendant {
		&-start {
			.left-0;
			--t-translate-x: -50%;
		}

		&-center {
			right: 50%;
			--t-translate-x: 50%;
		}

		&-end {
			.right-0;
			--t-translate-x: 50%;
		}

		&-bottom {
			.bottom-0;
			--t-translate-y: 50%;
		}

		&-middle {
			top: 50%;
			--t-translate-y: -50%;
		}

		&-top {
			.top-0;
			--t-translate-y: -50%;
		}
	}
}
</style>
