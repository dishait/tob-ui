<template>
	<view>
		<t-nav-bar title="Overlay" sticky />

		<view class="bg-base h-screen bg-opacity-10 pt-8">
			<example title="基础用法" customClass=" ">
				<t-cell title="展示" value="😄" @click="open" />
			</example>

			<example title="插槽">
				<t-cell title="展示" value="😀" @click="openSlot" />
			</example>
		</view>

		<t-overlay ref="overlay" />
		<t-overlay ref="overlaySlot">
			<view class="bg-white rounded h-20 w-25" />
		</t-overlay>
	</view>
</template>

<script>
export default {
	methods: {
		open() {
			this.$refs.overlay.show()
		},
		openSlot() {
			this.$refs.overlaySlot.show()
		}
	}
}
</script>
