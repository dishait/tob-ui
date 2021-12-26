<template>
	<view class="pb-20">
		<t-nav-bar title="Search" sticky />

		<example customClass="mt-8" title="颜色">
			<view class="mx-6">
				<t-search v-model="value" color="success" />
			</view>

			<view class="mx-6 mt-4">
				<t-search v-model="value" color="success" light />
			</view>

			<view class="mx-6 mt-4">
				<t-search v-model="value" color="success" outline />
			</view>
		</example>

		<example title="插槽">
			<view class="mx-6">
				<t-search v-model="value" color="error" outline>
					<template #prefix>
						<t-tag size="sm" color="error" class="mr-2" light>NEWS</t-tag>
					</template>
				</t-search>
			</view>
			
			<view class="mx-6 mt-4">
				<t-search v-model="value" color="error" outline>
					<t-tag size="sm" color="error" class="ml-2" light>99+</t-tag>
				</t-search>
			</view>
		</example>
		
		<example title="图标">
			<view class="mx-6">
				<t-search v-model="value" color="primary" light leftIcon="shopping" clearIcon="close" />
			</view>
		</example>
		
		
		<example title="圆角">
			<view class="mx-6">
				<t-search v-model="value" color="accent" light rounded="full" />
			</view>
		</example>
		
		<example title="阴影">
			<view class="mx-6">
				<t-search v-model="value" color=" " rounded="full" shadow="sm" />
			</view>
		</example>
		
		<example title="尺寸">
			<view class="mx-6">
				<t-search v-model="value" color="secondary" light size="lg"/>
			</view>
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: ''
		}
	}
}
</script>

