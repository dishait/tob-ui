<template>
	<view class="pb-20">
		<t-nav-bar title="Collapse" sticky />

		<example title="基础" customClass="mt-8">
			<t-collapse v-model="base">
				<t-collapse-item title="标题" name="1">海内存知已，天涯若比邻</t-collapse-item>
				<t-collapse-item title="标题" name="2">海内存知已，天涯若比邻</t-collapse-item>
				<t-collapse-item title="标题" name="3">海内存知已，天涯若比邻</t-collapse-item>
			</t-collapse>
		</example>

		<example title="手风琴">
			<t-collapse v-model="accordion" accordion>
				<t-collapse-item title="标题" name="1">做一件事，无论大小，倘无恒心，是很不好的</t-collapse-item>
				<t-collapse-item title="标题" name="2">做一件事，无论大小，倘无恒心，是很不好的</t-collapse-item>
				<t-collapse-item title="标题" name="3">做一件事，无论大小，倘无恒心，是很不好的</t-collapse-item>
			</t-collapse>
		</example>

		<example title="自定义">
			<t-collapse v-model="custom" border>
				<t-collapse-item name="1" rightIcon="arrowdown">
					<template #title>
						<view class="text-primary">
							<t-icon type="fire" class="mr-1" />标题
						</view>
					</template>
					少年易学老难成，一寸光阴不可轻
				</t-collapse-item>

				<t-collapse-item title="禁用" name="3" disabled>少年易学老难成，一寸光阴不可轻</t-collapse-item>

				<t-collapse-item title="标题" name="2">
					<template #right>
						<t-tag type="error" light size="sm">99+</t-tag>
					</template>
					少年易学老难成，一寸光阴不可轻
				</t-collapse-item>
			</t-collapse>
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			custom: [],
			base: ['1'],
			accordion: []
		}
	}
}
</script>

