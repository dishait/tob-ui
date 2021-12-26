<template>
	<view>
		<t-nav-bar title="Overlay" sticky />
		
		<view class="h-screen bg-base bg-opacity-10 pt-8">
			<example title="基础用法" customClass="">
				<t-cell title="展示" value="😄" @click="open" />
			</example>
			
			<example title="插槽">
				<t-cell title="展示" value="😀" @click="openSlot" />
			</example>
		</view>
		
		<t-overlay ref="overlay" />
		<t-overlay ref="overlaySlot"> 
			<view class="bg-white w-25 h-20 rounded" />
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
