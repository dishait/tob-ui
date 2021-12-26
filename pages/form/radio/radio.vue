<template>
	<view class="pb-20">
		<t-nav-bar title="Radio" sticky />

		<example customClass="mt-8" title="颜色">
			<view class="ml-6">
				<t-radio-group v-model="color">
					<view v-for="v of colors" class="m-2" :key="v.type">
						<t-radio  :color="v.type" :value="v.type">{{ v.desc }}</t-radio>
					</view>
				</t-radio-group>
			</view>
		</example>
		
		
		<example title="圆角">
			<view class="ml-6">
				<t-radio-group v-model="rounded">
					<view v-for="v of roundeds" :key="v.type" class="m-2">
						<t-radio :rounded="v.type" :value="v.type">{{ v.desc }}</t-radio>
					</view>
					
				</t-radio-group>
			</view>
		</example>
		
		
		<example title="尺寸">
			<view class="ml-6">
				<t-radio-group v-model="size">
					<view v-for="v of sizes" :key="v.type" class="m-2">
						<t-radio :size="v.type" :value="v.type">{{ v.desc }}</t-radio>
					</view>
				</t-radio-group>
			</view>
		</example>
		
		
		<example title="禁用">
			<view class="ml-6">
				<t-radio-group v-model="abled">
					<view class="m-2">
						<t-radio value="abled">可用</t-radio>
					</view>
					<view class="m-2">
						<t-radio value="disabled" disabled>禁用</t-radio>
					</view>
				</t-radio-group>
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
			color: 'primary',
			roundeds,
			rounded: 'full',
			sizes,
			size: 'lg',
			abled: 'abled'
		}
	}
}
</script>
