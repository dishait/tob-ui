<template>
	<view class="pb-70">
		<t-nav-bar title="NumberKeyBoard" sticky />

		<example title="基础" customClass="mt-8">
			<view class="text-center">
				<view class="mb-2">value: {{ base }}</view>
				<t-btn color="primary" @click="baseOpen" size="px-10" outline>open</t-btn>
			</view>
		</example>

		<example title="自定义待选">
			<view class="text-center">
				<view class="mb-2">value: {{ value }}</view>
				<t-btn color="secondary" @click="valuesOpen" size="px-10" outline>open</t-btn>
			</view>
		</example>

		<t-number-key-board v-model="base" ref="nk" />
		<t-number-key-board v-model="value" :values="values" ref="vnk" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: '',
			value: '',
			values: [3, 2, 1, 4, 7, 6, 5, 9, 8, '00', 0, '.']
		}
	},
	methods: {
		baseOpen() {
			this.$refs.nk.show()
		},
		valuesOpen() {
			this.$refs.vnk.show()
		}
	}
}
</script>

