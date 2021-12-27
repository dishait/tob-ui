<template>
	<view class="pb-20">
		<t-nav-bar title="Layout" sticky />

		<example title="基础" customClass="mt-8">
			<t-row mx="20rpx">
				<t-col :span="6">
					<view class="bg-info h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info bg-opacity-40 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info bg-opacity-20 h-5" />
				</t-col>
			</t-row>
		</example>

		<example title="间隔">
			<t-row gutter="10rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-20 h-5" />
				</t-col>
			</t-row>
		</example>

		<example title="偏移">
			<t-row mx="20rpx" class="text-white">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6" :offset="6">
					<view class="bg-info rounded bg-opacity-60 h-5">偏移6份</view>
				</t-col>
			</t-row>
		</example>

		<example title="flex布局">
			<t-row justify="center" my="30rpx" gutter="20rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
			</t-row>
			<t-row justify="evenly" my="30rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
			</t-row>
			<t-row justify="around" my="30rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
			</t-row>
			<t-row justify="between" my="30rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
			</t-row>
			<t-row justify="start" gutter="20rpx" my="30rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
			</t-row>
			<t-row justify="end" gutter="10rpx" my="30rpx" mx="20rpx">
				<t-col :span="6">
					<view class="bg-info rounded h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-60 h-5" />
				</t-col>
				<t-col :span="6">
					<view class="bg-info rounded bg-opacity-40 h-5" />
				</t-col>
			</t-row>
		</example>
	</view>
</template>

