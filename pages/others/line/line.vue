<template>
	<view class="pb-20">
		<t-nav-bar title="Line" sticky />

		<example customClass="mt-8" title="基础">
			<view class="mx-2">
				<t-line />
			</view>
		</example>

		<example title="尺寸">
			<view class="mx-2">
				<t-line size="w-60" />
			</view>
		</example>

		<example title="颜色">
			<view class="mx-2">
				<t-line color="info" />
			</view>
		</example>

		<example title="竖线">
			<view class="ml-5 h-20">
				<t-line vertical />
			</view>
		</example>
		
		<example title="虚线">
			<view class="mx-2">
				<t-line dashed />
			</view>
		</example>
	</view>
</template>
