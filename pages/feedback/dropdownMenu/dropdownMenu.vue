<template>
	<view class="pb-60">
		<t-nav-bar title="DropDownMenu" />

		<example customClass="mt-8" title="基础">
			<t-dropdown-menu v-model="values1" :options="options" />
		</example>

		<example customClass="mt-30" title="选中颜色">
			<t-dropdown-menu v-model="values2" activeColor="success" :options="options" />
		</example>

		<example customClass="mt-30" title="禁用">
			<t-dropdown-menu disabled v-model="values3" :options="options" />
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			values1: {
				goods: 0,
				sort: 0
			},
			values2: {
				goods: 0,
				sort: 0
			},
			values3: {
				goods: 0,
				sort: 0
			},
			options: {
				goods: ['全部商品', '新款商品', '活动商品'],
				sort: ['默认排序', '好评排序', '销量排序']
			}
		}
	}
}
</script>
