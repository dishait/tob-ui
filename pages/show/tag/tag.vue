<template>
	<view class="pb-10">
		<t-nav-bar title="Tag" sticky />

		<example title="颜色" customClass="mt-8">
			<view class="flex flex-wrap mx-1">
				<t-tag v-for="v of colors" :key="v.type" :color="v.type" class="m-2">{{ v.desc }}</t-tag>
			</view>
		</example>

		<example title="高亮">
			<view class="flex flex-wrap mx-1">
				<t-tag v-for="v of colors" light :key="v.type" :color="v.type" class="m-2">{{ v.desc }}</t-tag>
			</view>
		</example>

		<example title="轮廓">
			<view class="flex flex-wrap mx-1">
				<t-tag v-for="v of colors" outline :key="v.type" :color="v.type" class="m-2">{{ v.desc }}</t-tag>
			</view>
		</example>

		<example title="尺寸">
			<view class="flex flex-wrap mx-1">
				<t-tag v-for="v of sizes" light :key="v.type" :size="v.type" class="m-2">{{ v.desc }}</t-tag>
			</view>
		</example>

		<example title="阴影">
			<view class="flex flex-wrap mx-1">
				<t-tag v-for="v of shadow" light :key="v.type" :shadow="v.type" class="m-2">{{ v.desc }}</t-tag>
			</view>
		</example>

		<example title="圆角">
			<view class="flex flex-wrap mx-1">
				<t-tag v-for="v of roundeds" light :key="v.type" :rounded="v.type" class="m-2">{{ v.desc }}</t-tag>
			</view>
		</example>

		<example title="图标">
			<view class="flex flex-wrap mx-1">
				<t-tag rightIcon="smile" color="success" light class="m-2">开心</t-tag>
				<t-tag leftIcon="frown" color="error" light class="m-2">伤心</t-tag>
			</view>
		</example>

		<example title="可关闭">
			<view class="mx-1">
				<t-tag closeable color="error" light class="m-2">关我</t-tag>
			</view>
		</example>
	</view>
</template>

<script>
import sizes from '@/design/sizes.js'
import colors from '@/design/colors.js'
import shadow from '@/design/shadows.js'
import roundeds from '@/design/roundeds.js'

export default {
	data() {
		return {
			sizes,
			colors,
			shadow,
			roundeds
		}
	}
}
</script>
