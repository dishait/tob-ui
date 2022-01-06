<template>
	<view class="pb-20">
		<t-nav-bar title="Stepper" sticky />

		<example title="颜色" customClass="mt-6">
			<view class="ml-6">
				<view class="mt-3" v-for="v in colors" :key="v.type">
					<t-stepper v-model="light" :color="v.type">{{ v.content }}</t-stepper>
				</view>
			</view>
		</example>

		<example title="阴影">
			<view class="ml-6">
				<view class="mt-3" v-for="v in shadows" :key="v.type">
					<t-stepper v-model="shadow" color=" " :shadow="v.type">{{ v.content }}</t-stepper>
				</view>
			</view>
		</example>

		<example title="圆角">
			<view class="ml-6">
				<view class="mt-3" v-for="v in roundeds" :key="v.type">
					<t-stepper v-model="rounded" color=" " shadow="sm" :rounded="v.type">{{ v.content }}</t-stepper>
				</view>
			</view>
		</example>

		<example title="尺寸">
			<view class="ml-6">
				<view class="mt-3" v-for="v in sizes" :key="v.type">
					<t-stepper v-model="size" color=" " shadow="sm" :size="v.type">{{ v.content }}</t-stepper>
				</view>
			</view>
		</example>

		<example title="禁用">
			<view class="ml-6">
				<t-stepper disabled v-model="disabled" />
			</view>
		</example>

		<example title="只允许整数">
			<view class="ml-6">
				<t-stepper integer v-model="integer" />
			</view>
		</example>

		<example title="范围(0-20)">
			<view class="ml-6">
				<t-stepper :max="20" :min="0" v-model="range" />
			</view>
		</example>

		<example title="步长(5)">
			<view class="ml-6">
				<t-stepper :step="5" v-model="step" />
			</view>
		</example>
	</view>
</template>

<script>
import sizes from "@/design/sizes.js"
import colors from "@/design/colors.js"
import shadows from "@/design/shadows.js"
import roundeds from "@/design/roundeds.js"
export default {
	data() {
		return {
			color: 0,
			colors,
			shadow: 0,
			shadows,
			light: 0,
			outline: 0,
			rounded: 0,
			roundeds,
			size: 0,
			sizes,
			disabled: 0,
			integer: 0,
			range: 0,
			step: 0
		}
	}
}
</script>
