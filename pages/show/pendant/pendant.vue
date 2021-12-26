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
						<view class="bg-success w-3 h-3 rounded-full" />
					</t-pendant-item>
					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="徽标">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="bg-secondary text-white px-1 text-sm rounded-xl">99+</view>
					</t-pendant-item>

					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="新闻">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="bg-accent text-white px-1 text-sm rounded-xl">New</view>
					</t-pendant-item>

					<view class="content">内容</view>
				</t-pendant>
			</view>
		</example>

		<example title="下载">
			<view class="m-6">
				<t-pendant>
					<t-pendant-item>
						<view class="shadow-sm rounded-full w-5 h-5 flex items-center justify-center">
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
						<view class="bg-info px-1 text-white text-sm rounded">{{ i }}</view>
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
@import (reference, less) '@/uni_modules/tob-ui/index.less';

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
