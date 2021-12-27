<template>
	<view class="pb-70">
		<t-nav-bar title="PasswordInput" sticky />

		<example title="基础" customClass="mt-8">
			<view class="mx-2">
				<t-password-input :values="base" @click="open" />
			</view>
		</example>

		<example title="可见">
			<view class="mx-2">
				<t-password-input :values="visible" visible @click="openVisible" />
			</view>
		</example>

		<t-number-key-board v-model="base" ref="nk" />
		<t-number-key-board v-model="visible" ref="vnk" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: '',
			visible: ''
		}
	},
	methods: {
		open() {
			this.$refs.vnk.hidden()
			this.$refs.nk.show()
		},
		openVisible() {
			this.$refs.nk.hidden()
			this.$refs.vnk.show()
		}
	},
}
</script>

