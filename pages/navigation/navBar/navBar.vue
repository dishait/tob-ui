<template>
	<view class="pb-20">
		<t-nav-bar title="NavBar" sticky />

		<example title="基础" customClass="mt-8">
			<t-nav-bar title="标题" leftText="左文本" rightIcon="edit" rightText="右文本" />
		</example>

		<example title="插槽">
			<t-nav-bar>
				<template #left>
					<view class="text-accent bg-accent text-md bg-opacity-10 px-3 rounded"><t-icon type="home" size="1.2em" /></view>
				</template>
			
				<view class="text-lg border border-primary text-primary rounded px-3">标题</view>
				<template #right>
					<view class="text-error bg-error bg-opacity-10 px-3 rounded">99+</view>
				</template>
			</t-nav-bar>
		</example>

		<example title="颜色">
			<view v-for="v of colors" :key="v.type" class="mb-8">
				<t-nav-bar :title="v.desc" :color="v.type" leftText="Home" rightIcon="edit" />
			</view>
		</example>

		<example title="阴影">
			<view v-for="v of shadows" :key="v.type" class="mb-8">
				<t-nav-bar :title="v.desc" :shadow="v.type" leftText="Home" rightIcon="edit" />
			</view>
		</example>
	</view>
</template>

<script>
import colors from '@/design/colors.js'
import shadows from '@/design/shadows.js'
export default {
	data() {
		return {
			colors,
			shadows
		}
	}
}
</script>
