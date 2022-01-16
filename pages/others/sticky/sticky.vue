<template>
	<view class="pb-5">
		<t-nav-bar title="Sticky" leftText="Home" sticky />
				
		<view class="h-15" />

		<t-sticky offsetTop="navBarHeight">
			<t-block size="p-2" flex justify="center" color="accent">
				请滚动页面，该块将被吸顶
			</t-block>
		</t-sticky>
		
		<view class="h-screen" />
		<t-divider text="END" />
	</view>
</template>

