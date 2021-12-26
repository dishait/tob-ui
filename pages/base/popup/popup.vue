<template>
	<view>
		<t-nav-bar title="Popup" sticky />
		
		<view class="bg-base bg-opacity-10 pt-8 pb-20 h-screen">
			<example title="弹出位置" customClass="">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="居中" value="😃" @click="open('center')" />
					<t-cell title="左侧" value="👉" @click="open('left')" />
					<t-cell title="右侧" value="👈" @click="open('right')" />
					<t-cell title="顶部" value="👇" @click="open('top')" />
					<t-cell title="底部" value="👆" @click="open('bottom')" />
				</t-cell-group>
			</example>
			
			<example title="关闭图标">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="默认图标" value="😁" @click="open('bottom', 'close')" />
					<t-cell title="自定义图标" value="😊" @click="open('bottom', 'close-circle')" />
					
					<t-cell title="自定义位置" value="😊" @click="open('bottom', 'close', 'custom-popup-close-position')" />
				</t-cell-group>
			</example>
		</view>
		
		<t-popup v-model="visible" :mode="mode" rounded="md" :closeIconPosition="closeIconPosition" :closeIcon="closeIcon">
			<view class="h-20 w-30 flex items-center justify-center text-lg">
				内容
			</view>
		</t-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: 'center',
				visible: false,
				closeIcon: '',
				closeIconPosition: ''
			}
		},
		methods: {
			open(mode, closeIcon = '', closeIconPosition = '') {
				this.mode = mode
				this.visible = true
				this.closeIcon = closeIcon
				this.closeIconPosition = closeIconPosition
			}
		}
	}
</script>

