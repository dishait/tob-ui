<template>
	<view class="pb-20">
		<t-nav-bar title="Link" sticky />

		<example customClass="mt-8" title="颜色">
			<view v-for="v of colors" class="mt-2 ml-5" :key="v.type">
				<t-link :color="v.type">{{ v.desc }}链接</t-link>
			</view>
		</example>

		<example title="尺寸">
			<view v-for="v of sizes" class="mt-2 ml-5" :key="v.type">
				<t-link :size="v.type">{{ v.desc }}链接</t-link>
			</view>
		</example>

		<example title="跳转">
			<view class="mt-2 ml-5">
				<t-link color="base" to="/pages/base/button/button">前往 Button 页</t-link>
			</view>
		</example>
	</view>
</template>

<script>
import sizes from '@/design/sizes.js'
import colors from '@/design/colors.js'
export default {
	data() {
		return {
			sizes,
			colors
		}
	}
}
</script>

