<template>
	<view class="pb-20">
		<t-nav-bar title="Block" sticky />

		<example customClass="mt-8" title="颜色">
			<t-block color="accent" size="p-2 m-2">原色</t-block>
			<t-block color="accent" light size="p-2 m-2">高亮</t-block>
			<t-block color="accent" outline size="p-2 m-2">轮廓</t-block>
		</example>

		<example title="圆角">
			<t-block color="error" rounded="lg" light size="p-2 mx-2">
				大
			</t-block>
		</example>


		<example title="阴影">
			<t-block shadow="sm" rounded="lg" size="p-2 mx-2">
				大
			</t-block>
		</example>
		
		
		<example title="Flex">
			<t-block color="info" flex justify="between" rounded="md" size="p-2 mx-2 mb-2">
				<view>左</view>
				<view>右</view>
			</t-block>
			
			<t-block color="info" flex light justify="center" rounded="md" size="p-2 mx-2 mb-2">
				<view>居中</view>
			</t-block>
			
			<t-block color="info" flex outline justify="end" rounded="md" size="p-2 mx-2">
				<view>靠右</view>
			</t-block>
		</example>
	</view>
</template>
