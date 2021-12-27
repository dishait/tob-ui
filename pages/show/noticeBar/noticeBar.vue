<template>
	<view class="pb-20">
		<t-nav-bar title="NoticeBar" sticky />

		<example title="颜色" customClass="mt-8">
			<t-notice-bar :light="false">盛年不重来，一日难再晨。及时宜自勉，岁月不待人</t-notice-bar>
		</example>

		<example title="高亮">
			<t-notice-bar>盛年不重来，一日难再晨。及时宜自勉，岁月不待人</t-notice-bar>
		</example>

		<example title="轮廓">
			<t-notice-bar outline>盛年不重来，一日难再晨。及时宜自勉，岁月不待人</t-notice-bar>
		</example>

		<example title="圆角">
			<view class="mx-2">
				<t-notice-bar rounded="md" color="error">业精于勤，荒于嬉；行成于思，毁于随</t-notice-bar>
			</view>
		</example>

		<example title="阴影">
			<view class="mx-2">
				<t-notice-bar rounded="md" color shadow="sm">一寸光阴一寸金，寸金难买寸光阴</t-notice-bar>
			</view>
		</example>

		<example title="尺寸">
			<view class="mx-2">
				<t-notice-bar rounded="md" color="accent" size="xs">选择机会，就是节省时间</t-notice-bar>
			</view>
		</example>

		<example title="可关闭">
			<view class="mx-2">
				<t-notice-bar rounded="md" color="info" closeable>读书破万卷，下笔如有神</t-notice-bar>
			</view>
		</example>

		<example title="图标">
			<view class="mx-2">
				<t-notice-bar color="primary" rounded="md" leftIcon="bulb" rightIcon="right">一年之计在于春，一日之计在于晨</t-notice-bar>
			</view>
		</example>

		<example title="插槽">
			<view class="mx-2">
				<t-notice-bar color="error" outline rounded="md" leftIcon="fire">
					逝者如斯夫，不舍昼夜
					<template #action>
						<t-tag color="error" light class="ml-2">99+</t-tag>
					</template>
				</t-notice-bar>
			</view>
		</example>

		<example title="静止">
			<view class="mx-2">
				<t-notice-bar
					color="base"
					:scrollable="false"
					rounded="md"
					leftIcon="notification"
				>独怜幽草涧边生，上有黄鹂深树鸣</t-notice-bar>
			</view>
		</example>

		<example title="横向步进">
			<view class="mx-2">
				<t-notice-bar color="warning" rounded="md" leftIcon="info-circle" closeable :scrollable="false">
					<swiper autoplay circular :interval="2000" class="h-4 w-full">
						<swiper-item>海内存知己，天涯若比邻</swiper-item>
						<swiper-item>古人聊自遣，此语总非真</swiper-item>
						<swiper-item>学问多奇字，观书少斫轮</swiper-item>
						<swiper-item>何时策杖屦，共醉秣陵春？</swiper-item>
					</swiper>
				</t-notice-bar>
			</view>
		</example>

		<example title="纵向">
			<view class="mx-2">
				<t-notice-bar color="secondary" rounded="md" leftIcon="fire" closeable :scrollable="false">
					<swiper vertical autoplay circular :interval="2000" class="h-4 w-full">
						<swiper-item>海内存知己，天涯若比邻</swiper-item>
						<swiper-item>古人聊自遣，此语总非真</swiper-item>
						<swiper-item>学问多奇字，观书少斫轮</swiper-item>
						<swiper-item>何时策杖屦，共醉秣陵春？</swiper-item>
					</swiper>
				</t-notice-bar>
			</view>
		</example>
	</view>
</template>
