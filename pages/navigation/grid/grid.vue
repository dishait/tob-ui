<template>
	<view class="pb-20">
		<t-nav-bar title="Grid" sticky />

		<example title="基础" customClass="mt-8">
			<view class="mx-2">
				<t-grid>
					<t-grid-item v-for="v of list" :key="v.icon" :icon="v.icon" :text="v.desc" />
				</t-grid>
			</view>
		</example>

		<example title="颜色">
			<view class="mx-2">
				<t-grid>
					<t-grid-item v-for="v of list" :key="v.icon" color="error" :icon="v.icon" :text="v.desc" />
				</t-grid>
			</view>
		</example>

		<example title="高亮">
			<view class="mx-2">
				<t-grid>
					<t-grid-item
						v-for="v of list"
						color="error"
						light
						:key="v.icon"
						:icon="v.icon"
						:text="v.desc"
					/>
				</t-grid>
			</view>
		</example>

		<example title="轮廓">
			<view class="mx-2">
				<t-grid>
					<t-grid-item
						v-for="v of list"
						color="error"
						outline
						:key="v.icon"
						:icon="v.icon"
						:text="v.desc"
					/>
				</t-grid>
			</view>
		</example>

		<example title="仅图标">
			<view class="mx-2">
				<t-grid>
					<t-grid-item v-for="v of list" color="success" light :key="v.icon" :icon="v.icon" />
				</t-grid>
			</view>
		</example>

		<example title="尺寸">
			<view class="mx-2">
				<t-grid>
					<t-grid-item
						v-for="v of sizes"
						color="primary"
						:size="v.type"
						light
						:key="v.icon"
						:icon="v.icon"
						:text="v.desc"
					/>
				</t-grid>
			</view>
		</example>

		<example title="插槽">
			<view class="mx-2">
				<t-grid :column="3">
					<t-grid-item size="h-20">
						<t-img size="w-30 h-20" mode="aspectFill" :src="imgSrc" />
					</t-grid-item>
					<t-grid-item size="h-20">
						<t-img size="w-30 h-20" mode="aspectFill" :src="imgSrc" />
					</t-grid-item>
					<t-grid-item size="h-20">
						<t-img size="w-30 h-20" mode="aspectFill" :src="imgSrc" />
					</t-grid-item>
				</t-grid>
			</view>
		</example>

		<example title="跳转">
			<view class="mx-2">
				<t-grid>
					<t-grid-item color="base" to="/pages/base/btn/btn" icon="experiment" text="btn页" />
				</t-grid>
			</view>
		</example>
	</view>
</template>

<script>
import imgSrc from '@/static/mode.jpeg'
export default {
	data() {
		return {
			imgSrc,
			sizes: [
				{
					icon: 'android',
					type: 'lg',
					desc: '大'
				},
				{
					icon: 'apple',
					type: 'md',
					desc: '中'
				},
				{
					icon: 'file-image',
					type: 'sm',
					desc: '小'
				},
				{
					icon: 'folder',
					type: 'xs',
					desc: '超小'
				}
			],
			list: [
				{
					icon: 'android',
					desc: '安卓'
				},
				{
					icon: 'apple',
					desc: '苹果'
				},
				{
					icon: 'file-image',
					desc: '文件'
				},
				{
					icon: 'folder',
					desc: '文件夹'
				},
				{
					icon: 'car',
					desc: '汽车'
				},
				{
					icon: 'home',
					desc: '房子'
				},
				{
					icon: 'book',
					desc: '书籍'
				},
				{
					icon: 'highlight',
					desc: '钢笔'
				}
			]
		}
	}
}
</script>
