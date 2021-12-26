<template>
	<view>
		<t-nav-bar title="Back Top" leftText="Home" sticky />

		<t-back-top :color="Color" :icon="Icon" :rounded="Rounded" :light="light" />
		<view class="text-neutral text-xl pt-5" style="height: 120vh;">
			<view class="text-center text-white bg-accent">请往下拉</view>

			<view class="m-5 text-base flex flex-col">
				<t-switch v-model="color" color="primary" class="my-2">
					颜色
				</t-switch>
				<t-switch v-model="light" color="secondary" class="my-2">
					高亮
				</t-switch>
				<t-switch v-model="rounded" color="accent" class="my-2">
					圆角
				</t-switch>
				<t-switch v-model="icon" color="error" class="my-2">
					自定义图标
				</t-switch>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	mixins: [uni.useBackTopMixin()],
	data() {
		return {
			color: false,
			light: false,
			rounded: false,
			icon: false
		}
	},
	computed: {
		Color() {
			const { color } = this
			return color ? 'primary' : null
		},
		Rounded() {
			const { rounded } = this
			return rounded ? 'xl' : 'full'
		},
		Icon() {
			const { icon } = this
			return icon ? 'arrowup' : 'caret-up' 
		}
	}
}
</script>

