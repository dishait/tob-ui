<template>
	<view class="pb-20">
		<view class="title">
			<t-icon type="fire" class="mr-1" />
			<text>TOB UI</text>
		</view>
		
		<view class="m-4 mt-6">
			<text class="type">Base</text>
			<view class="container">
				<view class="item" v-for="v of base" :key="v.name" @click="go('base', v.name)">
					<view class="flex items-center">
						<t-icon :type="v.icon" size="1.3em" />
						<text class="item-name">{{ v.name }}</text>
					</view>
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</view>
		
		<view class="m-4 mt-20">
			<text class="type">Form</text>
			<view class="container">
				<view class="item" v-for="v of form" :key="v.name" @click="go('form', v.name)">
					<view class="flex items-center">
						<t-icon :type="v.icon" size="1.3em" />
						<text class="item-name">{{ v.name }}</text>
					</view>
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</view>

		<view class="m-4 mt-20">
			<text class="type">Feedback</text>
			<view class="container">
				<view class="item" v-for="v of feedback" :key="v.name" @click="go('feedback', v.name)">
					<view class="flex items-center">
						<t-icon :type="v.icon" size="1.3em" />
						<text class="item-name">{{ v.name }}</text>
					</view>
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</view>

		<view class="m-4 mt-20">
			<text class="type">Navigation</text>
			<view class="container">
				<view class="item" v-for="v of navigation" :key="v.name" @click="go('navigation', v.name)">
					<view class="flex items-center">
						<t-icon :type="v.icon" size="1.3em" />
						<text class="item-name">{{ v.name }}</text>
					</view>
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</view>

		<view class="m-4 mt-20">
			<text class="type">Show</text>
			<view class="container">
				<view class="item" v-for="v of show" :key="v.name" @click="go('show', v.name)">
					<view class="flex items-center">
						<t-icon :type="v.icon" size="1.3em" />
						<text class="item-name">{{ v.name }}</text>
					</view>
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</view>
	
		
		<view class="m-4 mt-20">
			<text class="type">Others</text>
			<view class="container">
				<view class="item" v-for="v of others" :key="v.name" @click="go('others', v.name)">
					<view class="flex items-center">
						<t-icon :type="v.icon" size="1.3em" />
						<text class="item-name">{{ v.name }}</text>
					</view>
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</view>
		
		<t-back-top />
	</view>
</template>

<script>
import { base, show, navigation, feedback, form, others } from './data.js'
export default {
	mixins: [uni.useBackTopMixin()],
	data() {
		return {
			show,
			base,
			form,
			others,
			feedback,
			navigation
		}
	},
	methods: {
		go(type, name) {
			uni.navigateTo({
				url: `/pages/${type}/${name}/${name}`
			})
		}
	}
}
</script>

<style lang="less">
@import (reference, less) '@/uni_modules/tob-ui/index.less';
.title {
	.p-1;
	.ml-1;
	.mt-1;
	.text-3xl;
	.statusbar;
	.font-bold;
	.text-primary;
}

.type {
	.text-xl;
}

.container {
	.mt-4;
	.grid;
	grid-gap: 30rpx;
	justify-items: stretch;
	grid-template-columns: repeat(auto-fill, auto);

	@media screen and (min-width: 980px) {
		grid-template-columns: repeat(3, 1fr);
	}
}

.item {
	.p-3;
	.ml-3;
	.flex;
	.rounded;
	.shadow-sm;
	.text-primary;
	.items-center;
	.justify-between;

	/* #ifndef MP-WEIXIN */
	.cursor-pointer;
	/* #endif */
}

.item-name {
	.ml-2;
	.capitalize;
}
</style>
