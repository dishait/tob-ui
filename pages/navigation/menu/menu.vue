<template>
	<view class="pb-20">
		<t-nav-bar title="Menu" sticky />
		
		<example customClass="mt-8" title="基础">
			<view class="ml-5">
				<t-menu v-model="base">
					<t-menu-item name="1">内容A</t-menu-item>
					<t-menu-item name="2">内容B</t-menu-item>
					<t-menu-item name="3">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="标题">
			<view class="ml-5">
				<t-menu title="菜单A" v-model="title">
					<t-menu-item name="1">内容A</t-menu-item>
					<t-menu-item name="2">内容B</t-menu-item>
					<t-menu-item name="3">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="图标">
			<view class="ml-5">
				<t-menu v-model="icon">
					<t-menu-item name="1" icon="eye">内容A</t-menu-item>
					<t-menu-item name="2" icon="code">内容B</t-menu-item>
					<t-menu-item name="3" icon="folder">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="插槽">
			<view class="ml-5">
				<t-menu v-model="customSlot">
					<t-menu-item name="1">
						内容A
						<template #right>
							<t-icon type="shopping" />
						</template>
					</t-menu-item>
					<t-menu-item name="2">
						内容B
						<template #right>
							👀
						</template>
					</t-menu-item>
					<t-menu-item name="3">
						内容C
						<template #right>
							<t-tag color="error" size="xs" light>99+</t-tag>
						</template>
					</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="边框">
			<view class="ml-5">
				<t-menu v-model="bordered" bordered>
					<t-menu-item name="1">内容A</t-menu-item>
					<t-menu-item name="2">内容B</t-menu-item>
					<t-menu-item name="3">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="圆角">
			<view class="ml-5">
				<t-menu rounded="xl" v-model="rounded">
					<t-menu-item name="1">内容A</t-menu-item>
					<t-menu-item name="2">内容B</t-menu-item>
					<t-menu-item name="3">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="阴影">
			<view class="ml-5">
				<t-menu rounded="xl" shadow="md" v-model="shadow">
					<t-menu-item name="1">内容A</t-menu-item>
					<t-menu-item name="2">内容B</t-menu-item>
					<t-menu-item name="3">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="横排">
			<view class="ml-5">
				<t-menu size="" rounded="xl" horizontal v-model="horizontal">
					<t-menu-item name="1">内容A</t-menu-item>
					<t-menu-item name="2">内容B</t-menu-item>
					<t-menu-item name="3">内容C</t-menu-item>
				</t-menu>
			</view>
		</example>

		<example title="纯图标">
			<view class="flex">
				<view class="ml-5">
					<t-menu size="" rounded="xl" v-model="onlyIcon">
						<t-menu-item name="1" icon="eye" />
						<t-menu-item name="2" icon="code" />
						<t-menu-item name="3" icon="folder" />
					</t-menu>
				</view>

				<view class="ml-10">
					<t-menu size="" rounded="xl" horizontal v-model="onlyIcon">
						<t-menu-item name="1" icon="eye" />
						<t-menu-item name="2" icon="code" />
						<t-menu-item name="3" icon="folder" />
					</t-menu>
				</view>
			</view>
		</example>

		<example title="子菜单">
			<view class="ml-5">
				<t-menu v-model="subActive" bordered>
					<t-menu-item name="1" icon="folder">Level 1</t-menu-item>
					<t-sub-menu>
						<t-menu-item name="2-1" icon="folder">Level 2</t-menu-item>
				
						<t-menu-item name="2-2" icon="folder">Level 2</t-menu-item>
				
						<t-sub-menu><t-menu-item name="3-1" icon="folder">Level 3</t-menu-item></t-sub-menu>
					</t-sub-menu>
					<t-menu-item name="2" icon="folder">Level 1</t-menu-item>
				</t-menu>
			</view>
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: '1',
			icon: '2',
			title: '1',
			shadow: '3',
			rounded: '2',
			bordered: '3',
			onlyIcon: '2',
			horizontal: '2',
			customSlot: '1',
			subActive: '1'
		}
	}
}
</script>
