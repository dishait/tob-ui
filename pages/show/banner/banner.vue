<template>
	<view class="pb-20">
		<t-nav-bar title="Banner" sticky />

		<example title="基础" customClass="mt-8">
			<t-banner :list="list" />
		</example>

		<example title="纵向">
			<t-banner :list="list" vertical />
		</example>

		<example title="自定义指示器">
			<t-banner :list="list" :indicatorDots="false">
				<template v-slot:indicator="{ current, total }">
					<view
						class="border-error border rounded m-2 text-error text-sm px-1 right-0 bottom-0 absolute"
					>{{ current }} / {{ total }}</view>
				</template>
			</t-banner>
		</example>

		<example title="尺寸">
			<t-banner :list="list" size="xs" />
		</example>
	</view>
</template>

<script>
import first from "@/static/banner/first.jpeg"
import second from "@/static/banner/second.jpeg"
import third from "@/static/banner/third.jpeg"
export default {
	data() {
		return {
			list: [
				{
					name: '1',
					url: first
				},
				{
					name: '2',
					url: second
				},
				{
					name: '3',
					url: third
				}
			]
		}
	}
}
</script>

