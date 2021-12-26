<template>
	<view class="pb-20">
		<t-nav-bar title="Icon" sticky />

		<t-notify ref="notify" />

		<view class="my-4 mx-2">
			<t-notice-bar rounded="lg" :scrollable="false">
				来自 Ant Design 的开源图标
				<template #action>
					<t-switch size="sm" class="ml-2" color="success" v-model="fillVisible" />
				</template>
			</t-notice-bar>
		</view>

		<t-grid gutter="30rpx" v-show="!fillVisible"><t-grid-item v-for="v of origin" :key="v" :icon="v" :text="v.split('-')[0]" /></t-grid>

		<t-grid gutter="30rpx" v-show="fillVisible"><t-grid-item v-for="v of fill" :key="v" :icon="v" :text="v.split('-')[0]" /></t-grid>
	</view>
</template>

<script>
import { icons } from './data.js'
export default {
	data() {
		return {
			fill: [],
			Fill: [],
			origin: [],
			Origin: [],
			fillVisible: false
		}
	},
	watch: {
		fillVisible: {
			immediate: true,
			handler(v) {
				if (!v) {
					this.origin = []
					this.Origin = icons.filter(v => !v.includes('-f'))
				} else {
					this.fill = []
					this.Fill = icons.filter(v => v.includes('-f'))
				}
				this.initData()
			}
		}
	},
	methods: {
		// 加载数据
		loadData(container, data, limit = 40) {
			container.push(...data.splice(0, limit))
		},
		// 加载更多
		loadMore() {
			if (!this.fillVisible) {
				this.loadData(this.origin, this.Origin)
			} else {
				this.loadData(this.fill, this.Fill)
			}
		},
		// 初始化数据
		initData() {
			this.loadData(this.origin, this.Origin)
			this.loadData(this.fill, this.Fill)
		}
	},
	onReachBottom() {
		// 触底加载更多
		this.loadMore()
	}
}
</script>
