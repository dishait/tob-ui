<template>
	<view class="pb-20">
		<t-nav-bar title="Divider" sticky />

		<example title="基础" customClass="mt-8">
			<view class="flex flex-col mx-3 my-10">
				<view class="content">内容</view>
				<t-divider />
				<view class="content">内容</view>
			</view>
		</example>
		
		<example title="竖排" customClass="mt-8">
			<view class="flex mx-3 my-10">
				<view class="content flex-1">内容</view>
				<t-divider vertical />
				<view class="content flex-1">内容</view>
			</view>
		</example>
		
		<example title="文本" customClass="mt-8">
			<view class="flex flex-col mx-3 my-10">
				<view class="content">内容</view>
				<t-divider text="OR" />
				<view class="content">内容</view>
			</view>
			
			<view class="flex mx-3 my-10">
				<view class="content flex-1">内容</view>
				<t-divider vertical text="OR" />
				<view class="content flex-1">内容</view>
			</view>
		</example>
	</view>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
@import (reference, less) '@/uni_modules/tob-ui/index.less';

.content {
	.h-20;
	.flex;
	.rounded;
	.bg-base;
	.text-base;
	.bg-opacity-10;
	.items-center;
	.justify-center;
}
</style>
