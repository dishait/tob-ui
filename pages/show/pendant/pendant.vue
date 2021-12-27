<template>
	<view class="pb-20">
		<t-nav-bar title="Pendant" sticky />

		<view class="mt-5">
			<t-notice-bar leftIcon="bell" :scrollable="false" size="sm">挂件比徽标更通用，可以往四周各个位置挂元素</t-notice-bar>
		</view>

		<example title="在线" customClass="mt-8">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="bg-success rounded-full h-3 w-3" />
					</t-pendant-item>
					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="徽标">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="bg-secondary rounded-xl text-white text-sm px-1">99+</view>
					</t-pendant-item>

					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="新闻">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="bg-accent rounded-xl text-white text-sm px-1">New</view>
					</t-pendant-item>

					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="下载">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="rounded-full flex h-5 shadow-sm w-5 items-center justify-center">
							<t-icon type="cloud-download" />
						</view>
					</t-pendant-item>

					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="位置">
			<view class="m-6 ml-8">
				<t-pendant>
					<t-pendant-item v-for="(v, i) of positions" :key="v" :position="v">
						<view class="bg-info rounded text-white text-sm px-1">{{ i }}</view>
					</t-pendant-item>

					<view class="content" />
				</t-pendant>
			</view>
		</example>
	</view>
</template>

<script>
import { positions } from './data.js'
export default {
	data() {
		return {
			positions
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "@/uni_modules/tob-ui/index.less";

.content {
	.h-28;
	.w-32;
	.flex;
	.bg-base;
	.text-base;
	.rounded-md;
	.items-center;
	.bg-opacity-10;
	.justify-center;
}
</style>
