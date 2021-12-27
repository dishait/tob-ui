<template>
	<view>
		<t-nav-bar title="Cell" sticky />

		<view class="bg-base bg-opacity-10 pb-20 pt-10">
			<example title="基础" customClass=" ">
				<t-cell title="单元格" value="内容" />
				<t-cell title="单元格" value="内容" desc="描述信息" />
			</example>

			<example title="图标">
				<t-cell title="单元格" value="内容" leftIcon="bulb" rightIcon="right" />
			</example>

			<example title="垂直居中">
				<t-cell title="单元格" center value="内容" desc="描述信息" />
			</example>

			<example title="插槽">
				<t-cell rightIcon="right">
					<template #left>
						<view>
							<t-icon type="alert" color="accent" class="mr-2" size="1.2em" />
							<text class="border border-accent rounded text-accent px-2">单元格</text>
						</view>
					</template>
					<template #right>
						<view class="bg-error rounded bg-opacity-10 text-error px-2">99+</view>
					</template>
				</t-cell>
			</example>

			<example title="分组">
				<t-cell-group title="组1">
					<t-cell title="单元格" value="内容" />
				</t-cell-group>

				<t-cell-group title="组2">
					<t-cell title="单元格" value="内容" />
				</t-cell-group>
			</example>

			<example title="跳转">
				<t-cell title="按钮页" value="前往" rightIcon="right" to="/pages/base/btn/btn" />
			</example>

			<example title="卡片">
				<t-cell-group inset="mx-3" rounded="md">
					<t-cell title="单元格" value="内容" />
					<t-cell title="单元格" value="内容" />
					<t-cell title="单元格" value="内容" desc="描述信息" />
				</t-cell-group>
			</example>
		</view>
	</view>
</template>
