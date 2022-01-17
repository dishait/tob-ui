<template>
	<view class="pb-20">
		<t-nav-bar title="Alert" sticky />

		<example title="颜色" customClass="mt-8">
			<t-alert :light="false">盛年不重来，一日难再晨</t-alert>
			<view class="my-2">
				<t-alert>盛年不重来，一日难再晨</t-alert>
			</view>
			<t-alert outline>盛年不重来，一日难再晨</t-alert>
		</example>

		<example title="圆角">
			<view class="mx-2">
				<t-alert rounded="md" color="error">业精于勤，荒于嬉；行成于思，毁于随</t-alert>
			</view>
		</example>

		<example title="阴影">
			<view class="mx-2">
				<t-alert rounded="md" color=" " shadow="sm">一寸光阴一寸金，寸金难买寸光阴</t-alert>
			</view>
		</example>

		<example title="尺寸">
			<view class="mx-2">
				<t-alert rounded="md" color="accent" size="xs">选择机会，就是节省时间</t-alert>
			</view>
		</example>

		<example title="可关闭">
			<view class="mx-2">
				<t-alert rounded="md" color="info" closeable>读书破万卷，下笔如有神</t-alert>
			</view>
		</example>

		<example title="图标">
			<view class="mx-2">
				<t-alert color="secondary" rounded="md" leftIcon="folder" rightIcon="right">人生而自由，却无往不在枷锁中</t-alert>
			</view>
		</example>

		<example title="插槽">
			<view class="mx-2">
				<t-alert color="error" outline rounded="md" leftIcon="fire">
					逝者如斯夫，不舍昼夜
					<template #action>
						<t-tag color="error" light class="ml-2">99+</t-tag>
					</template>
				</t-alert>
			</view>
		</example>
	</view>
</template>
