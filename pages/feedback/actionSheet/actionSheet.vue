<template>
	<view>
		<t-nav-bar title="ActionSheet" sticky />

		<view class="bg-base bg-opacity-10 py-8 pb-20">
			<example title="基础" customClass=" ">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="基础用法" value="😁" @click="open('base')" />
					<t-cell title="展示取消" value="😀" @click="open('cancel')" />
					<t-cell title="展示描述信息" value="😄" @click="open('desc')" />
				</t-cell-group>
			</example>

			<example title="状态">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="禁用" value="👍" @click="open('disabled')" />
				</t-cell-group>
			</example>

			<example title="颜色">
				<t-cell-group inset="mx-3" rounded="lg">
					<t-cell title="颜色" value="😊" @click="open('color')" />
					<t-cell title="高亮" value="😜" @click="open('light')" />
					<t-cell title="轮廓" value="😋" @click="open('outline')" />
				</t-cell-group>
			</example>
		</view>

		<t-action-sheet :actions="base" ref="base" />
		<t-action-sheet :actions="base" cancelText="取消" ref="cancel" />
		<t-action-sheet :actions="desc" desc="面板描述" cancelText="取消" ref="desc" />
		<t-action-sheet :actions="disabled" cancelText="取消" ref="disabled" />
		<t-action-sheet :actions="color" desc="颜色" cancelText="取消" ref="color" />
		<t-action-sheet :actions="light" desc="高亮" cancelText="取消" ref="light" />
		<t-action-sheet :actions="outline" desc="轮廓" cancelText="取消" ref="outline" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: [
				{
					name: '项目-1'
				},
				{
					name: '项目-2'
				},
				{
					name: '项目-3'
				}
			],
			desc: [
				{
					name: '项目-1'
				},
				{
					name: '项目-2',
					desc: '描述信息'
				},
				{
					name: '项目-3'
				}
			],
			disabled: [
				{
					name: '项目-1'
				},
				{
					name: '项目-2',
					disabled: true
				},
				{
					name: '项目-3'
				}
			],
			color: [
				{
					name: '项目-1'
				},
				{
					name: '项目-2',
					color: 'text-white bg-success'
				},
				{
					name: '项目-3'
				}
			],
			light: [
				{
					name: '项目-1'
				},
				{
					name: '项目-2',
					color: 'text-success bg-success bg-opacity-10'
				},
				{
					name: '项目-3'
				}
			],
			outline: [
				{
					name: '项目-1'
				},
				{
					name: '项目-2',
					color: 'text-success border border-success'
				},
				{
					name: '项目-3'
				}
			]
		}
	},
	methods: {
		open(type) {
			this.$refs[type].show()
		}
	}
}
</script>
