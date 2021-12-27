<template>
	<view :class="[customClass]">
		<view class="title">{{ title }}</view>
		<slot />
	</view>
</template>

<script>
export default {
	name: 'example',
	props: {
		customClass: {
			type: String,
			default: 'mt-18'
		},
		title: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "@/uni_modules/tob-ui/index.less";
.title {
	.ml-3;
	.mb-4;
	.text-xl;
}
</style>
