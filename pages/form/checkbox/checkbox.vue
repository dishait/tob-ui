<template>
	<view class="pb-20">
		<t-nav-bar title="Checkbox" sticky />

		<example customClass="mt-8" title="颜色">
			<view class="ml-6">
				<t-checkbox-group v-model="color">
					<view v-for="v of colors" class="m-2" :key="v.type">
						<t-checkbox :color="v.type" :value="v.type">{{ v.desc }}</t-checkbox>
					</view>
				</t-checkbox-group>
			</view>
		</example>
		
		
		<example title="圆角">
			<view class="ml-6">
				<t-checkbox-group v-model="rounded">
					<view v-for="v of roundeds" class="m-2" :key="v.type">
						<t-checkbox :rounded="v.type" :value="v.type">{{ v.desc }}</t-checkbox>
					</view>
				</t-checkbox-group>
			</view>
		</example>
		
		
		<example title="尺寸">
			<view class="ml-6">
				<t-checkbox-group v-model="size">
					<view v-for="v of sizes" :key="v.type" class="m-2">
						<t-checkbox :size="v.type" :value="v.type">{{ v.desc }}</t-checkbox>
					</view>
				</t-checkbox-group>
			</view>
		</example>
		
		
		<example title="禁用">
			<view class="ml-6">
				<t-checkbox-group v-model="abled">
					<view class="m-2">
						<t-checkbox value="abled">可用</t-checkbox>
					</view>
					<view class="m-2">
						<t-checkbox value="disabled" disabled>禁用</t-checkbox>
					</view>
				</t-checkbox-group>
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
			colors,
			color: ['primary'],
			roundeds,
			rounded: [],
			sizes,
			size: ['lg'],
			abled: ['abled']
		}
	}
}
</script>
