<template>
	<view class="pb-20">
		<t-nav-bar title="Switch" sticky />

		<example title="颜色" customClass="mt-8">
			<view class="ml-6">
				<view v-for="v of colors" class="m-2" :key="v.type">
					<t-switch v-model="color" :color="v.type">{{ v.desc }}</t-switch>
				</view>
			</view>
		</example>

		<example title="尺寸">
			<view class="ml-6">
				<view v-for="v of sizes" class="m-2" :key="v.type">
					<t-switch v-model="size" :size="v.type">{{ v.desc }}</t-switch>
				</view>
			</view>
		</example>

		<example title="圆角">
			<view class="ml-6">
				<view v-for="v of roundeds" class="m-2" :key="v.type">
					<t-switch v-model="rounded" :rounded="v.type">{{ v.desc }}</t-switch>
				</view>
			</view>
		</example>

		<example title="禁用">
			<view class="ml-6">
				<t-switch v-model="disabled" disabled>禁用</t-switch>
			</view>
		</example>
	</view>
</template>

<script>
import sizes from "@/design/sizes.js"
import colors from "@/design/colors.js"
import roundeds from "@/design/roundeds.js"
export default {
	data() {
		return {
			color: false,
			colors,
			size: false,
			sizes,
			roundeds,
			rounded: false,
			disabled: false
		}
	}
}
</script>
