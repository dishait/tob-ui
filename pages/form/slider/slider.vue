<template>
	<view class="pb-20">
		<t-nav-bar title="Slider" sticky />

		<example title="颜色" customClass="mt-8">
			<view v-for="v of colors" :key="v.type" class="m-2"><t-slider :color="v.type" /></view>
		</example>

		<example title="显示值">
			<view class="m-2"><t-slider showValue /></view>
		</example>

		<example title="单独改变各部分颜色">
			<view class="m-2">
				<t-slider blockColor="white" v-model="value" activeColor="#228be6" backgroundColor="#dee2e6" showValue />
			</view>
		</example>

		<example title="禁用">
			<view class="m-2"><t-slider disabled /></view>
		</example>
	</view>
</template>

<script>
import colors from '@/design/colors.js'
export default {
	data() {
		return {
			colors,
			color: 0,
			value: 0
		}
	}
}
</script>

