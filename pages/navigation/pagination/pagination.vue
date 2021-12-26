<template>
	<view class="pb-20">
		<t-nav-bar title="Pagination" sticky />

		<example title="基础" customClass="mt-8">
			<view class="ml-4">
				<t-pagination v-model="base" :total="20" />
			</view>
		</example>

		<example title="简易模式">
			<view class="ml-4">
				<t-pagination v-model="simple" simple :total="20" />
			</view>
		</example>
		
		<example title="颜色">
			<view class="ml-4">
				<t-pagination v-model="color" simple color="error" :total="20" />
			</view>
			
			<view class="ml-4 mt-4">
				<t-pagination v-model="color" simple color="error" light :total="20" />
			</view>
			
			<view class="ml-4 mt-4">
				<t-pagination v-model="color" simple color="error" outline :total="20" />
			</view>
		</example>
		
		<example title="圆角">
			<view class="ml-4">
				<t-pagination v-model="rounded" simple rounded="xl" :total="20" />
			</view>
		</example>
		
		<example title="阴影">
			<view class="ml-4">
				<t-pagination v-model="shadow" simple shadow="md" :total="20" />
			</view>
		</example>
		
		<example title="尺寸">
			<view class="ml-4">
				<t-pagination v-model="size" simple size="lg" :total="20" />
			</view>
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: 2,
			simple: 1,
			color: 1,
			rounded: 1,
			shadow: 3,
			size: 1
		}
	}
}
</script>
