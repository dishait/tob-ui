<template>
	<view class="pb-20">
		<t-nav-bar title="Btn" sticky />
		
		<example title="颜色" customClass="mt-10">
			<view class="container">
				<t-btn v-for="v in colors" :key="v.type" class="item" :color="v.type">{{ v.desc }}</t-btn>
			</view>
		</example>

		<example title="高亮">
			<view class="container">
				<t-btn v-for="v in colors" :key="v.type" class="item" :color="v.type" light>{{ v.desc }}</t-btn>
			</view>
		</example>

		<example title="轮廓">
			<view class="container">
				<t-btn v-for="v in colors" :key="v.type" class="item" :color="v.type" outline>{{ v.desc }}</t-btn>
			</view>
		</example>

		<example title="幽灵">
			<view class="container">
				<t-btn ghost class="item">幽灵</t-btn>
			</view>
		</example>

		<example title="尺寸">
			<view class="container">
				<t-btn v-for="v in sizes" :key="v.type" class="item" :size="v.type">{{ v.desc }}</t-btn>
			</view>
		</example>

		<example title="圆角">
			<view class="container">
				<t-btn v-for="v in roundeds" :key="v.type" class="item" :rounded="v.type">{{ v.desc }}</t-btn>
			</view>
		</example>
		
		<example title="阴影">
			<view class="container">
				<t-btn v-for="v in shadows" :key="v.type" class="item" :shadow="v.type" ghost>{{ v.desc }}</t-btn>
			</view>
		</example>
	

		<example title="禁用">
			<view class="container">
				<t-btn v-for="v in colors" :key="v.type" class="item" :color="v.type" disabled>{{ v.desc }}</t-btn>
			</view>
		</example>

		<example title="块级元素">
			<view class="mx-3">
				<t-btn block>块级</t-btn>
			</view>
		</example>

		<example title="加载中">
			<view class="container">
				<t-btn class="item" loading>加载中</t-btn>
			</view>
		</example>
		
		
	</view>
</template>

<script>
import sizes from '@/design/sizes.js'
import colors from '@/design/colors.js'
import shadows from '@/design/shadows.js'
import roundeds from '@/design/roundeds.js'
export default {
	data() {
		return {
			sizes,
			colors,
			shadows,
			roundeds
		}
	}
}
</script>

<style lang="less">
@import (reference) '@/uni_modules/tob-ui/index.less';

.container {
	.mx-2;
	.flex;
	.flex-wrap;
}

.item {
	.mx-3;
	.my-2;
}
</style>


