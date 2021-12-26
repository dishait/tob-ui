<template>
	<view class="pb-20">
		<t-nav-bar title="Breadcrumbs" sticky />
		
		<example customClass="mt-8" title="颜色">
			<view v-for="v of colors" class="mt-2 ml-5" :key="v.type">
				<t-breadcrumbs :color="v.type" :list="list" />
			</view>
		</example>
		
		<example title="尺寸">
			<view v-for="v of sizes" class="mt-2 ml-5" :key="v.type">
				<t-breadcrumbs :size="v.type" :list="list" />
			</view>
		</example>
		
		<example title="图标">
			<view class="mt-2 ml-5">
				<t-breadcrumbs color="secondary" rightIcon="shopping" :list="shoppings" />
			</view>
			<view class="mt-2 ml-5">
				<t-breadcrumbs color="primary" leftIcon="folder" :list="floders" />
			</view>
		</example>
		
		<example title="跳转">
			<view class="mt-2 ml-5">
				<t-breadcrumbs color="base" :list="toList" @click="go"/>
			</view>
		</example>
	</view>
</template>

<script>
import sizes from '@/design/sizes.js'
import colors from '@/design/colors.js'
export default {
	data() {
		return {
			sizes,
			colors,
			list: ['小区', '家', '房间'],
			floders: ['User', 'Work', 'Code'],
			shoppings: ['生鲜', '水果', '杏子'],
			toList: ['Btn', 'Img', 'Cell'],
		}
	},
	methods: {
		go(v) {
			const routes = {
				Img: '/pages/base/img/img',
				Cell: '/pages/base/cell/cell',
				Btn: '/pages/base/button/button',
			}
			
			uni.navigateTo({
				url: routes[v]
			})
		}
	}
}
</script>


