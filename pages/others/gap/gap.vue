<template>
	<view class="pb-20">
		<t-nav-bar title="Gap" sticky />
		
		<example customClass="mt-8" title="基础">
			<view class="mx-2">
				<t-gap />
			</view>
		</example>
		
		<example title="颜色">
			<view class="mx-2">
				<t-gap color="warning" />
			</view>
		</example>
		
		<example title="尺寸">
			<view class="mx-2">
				<t-gap size="lg" />
			</view>
		</example>
		
		<example title="圆角">
			<view class="mx-2">
				<t-gap rounded="lg" />
			</view>
		</example>
		
		<example title="阴影">
			<view class="mx-2">
				<t-gap shadow="md" />
			</view>
		</example>
	</view>
</template>
