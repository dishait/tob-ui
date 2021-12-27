<template>
	<view class="pb-20">
		<t-nav-bar title="Textarea" />

		<example title="颜色" customClass="mt-8">
			<view class="mx-6">
				<view class="mt-5" v-for="v of colors" :key="v.type">
					<t-textarea :color="v.type" v-model="color" :placeholder="v.desc" />
				</view>
			</view>
		</example>

		<example title="圆角">
			<view class="mx-6">
				<view class="mt-4" v-for="v of roundeds" :key="v.type">
					<t-textarea :rounded="v.type" v-model="rounded" :placeholder="v.desc" />
				</view>
			</view>
		</example>

		<example title="尺寸">
			<view class="mx-6">
				<view class="mt-4" v-for="v of sizes" :key="v.type">
					<t-textarea :size="v.type" v-model="size" :placeholder="v.desc" />
				</view>
			</view>
		</example>

		<example title="禁用">
			<view class="mx-6">
				<t-textarea v-model="disabled" disabled />
			</view>
		</example>
	</view>
</template>

<script>
import sizes from '@/design/sizes.js'
import colors from '@/design/colors.js'
import roundeds from '@/design/roundeds.js'
export default {
	data() {
		return {
			test: '',
			size: '',
			sizes,
			colors,
			roundeds: roundeds.filter(v => v.type !== 'full'),
			color: '',
			rounded: '',
			disabled: '',
			primordial: ''
		}
	}
}
</script>
