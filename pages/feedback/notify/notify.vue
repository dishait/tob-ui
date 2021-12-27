<template>
	<view>
		<t-nav-bar title="Notify" sticky />

		<view class="bg-base bg-opacity-10 pt-8 pb-10">
			<example title="基础" customClass=" ">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="基础用法" value="😂" @click="open({ content: '基础用法' })" />
					<t-cell title="手动关闭" value="😊" @click="toggleOpen" />
					<t-cell title="自定义延迟" value="😜" @click="open({ content: '1秒后关闭', delay: 1000 })" />
				</t-cell-group>
			</example>

			<example title="颜色">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell
						v-for="v in colors"
						:key="v.type"
						:title="v.desc"
						value="🤔"
						@click="open({ content: v.desc, color: v.type })"
					/>
				</t-cell-group>
			</example>
		</view>

		<t-notify ref="notify" @change="change" />
	</view>
</template>

<script>
import colors from '@/design/colors.js'
export default {
	data() {
		return {
			colors,
			visible: false
		}
	},
	methods: {
		change(v) {
			this.visible = v
		},
		open(opts = {}) {
			this.$refs.notify.show(opts)
		},
		toggleOpen() {
			this.visible ? this.$refs.notify.hidden() : this.$refs.notify.show({ content: '再点关闭', manual: true })
		}
	}
}
</script>

