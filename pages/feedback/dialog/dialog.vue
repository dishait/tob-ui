<template>
	<view>
		<t-nav-bar title="Dialog" sticky />

		<view class="bg-base h-screen bg-opacity-10 pt-8">
			<example title="基础" customClass=" ">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="基础用法" value="😂" @click="open(base)" />

					<t-cell title="无标题" value="😍" @click="open(emptyTitle)" />
				</t-cell-group>
			</example>

			<example title="自定义">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="颜色" value="😄" @click="open(color)" />

					<t-cell title="尺寸" value="😀" @click="open(size)" />

					<t-cell title="圆角" value="🤔" @click="open(rounded)" />
				</t-cell-group>
			</example>
		</view>

		<t-dialog ref="dialog" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: { title: '满江红', content: '莫等闲，白了少年头，空悲切' },
			emptyTitle: { content: '雪落在那些年雪落过的地方' },
			color: { content: '单是说不行，要紧的是做', confirmColor: 'success' },
			size: { content: '我们爱我们的民族，这是我们自信心的源泉', size: 'w-72 py-4' },
			rounded: { content: '少说些漂亮话，多做些日常平凡的事情', rounded: 'full' }
		}
	},
	methods: {
		open(opts = {}) {
			this.$refs.dialog.show(opts)
		}
	}
}
</script>
