<template>
	<view class="pb-20">
		<t-nav-bar title="Img" sticky />

		<example title="模式" customClass="mt-8">
			<view class="flex flex-wrap">
				<view v-for="v in modes" :key="v" class="flex flex-col items-center mx-5 mb-4">
					<t-img :mode="v" class="mb-2" rounded="base" :src="imgSrc" />
					<text>{{ v }}</text>
				</view>
			</view>
		</example>

		<example title="尺寸">
			<view class="flex flex-wrap">
				<view v-for="v in sizes" :key="v.type" class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" shadow="sm" rounded="md" :src="imgSrc" :size="v.type" />
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</example>

		<example title="圆角">
			<view class="flex flex-wrap">
				<view v-for="v in roundeds" :key="v.type" class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" shadow="sm" :rounded="v.type" :src="imgSrc" />
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</example>

		<example title="阴影">
			<view class="flex flex-wrap">
				<view v-for="v in shadows" :key="v.type" class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" :shadow="v.type" rounded="md" :src="imgSrc" />
					<text>{{ v.desc }}</text>
				</view>
			</view>
		</example>
		
		<example title="状态">
			<view class="flex flex-wrap">
				<view class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" rounded="md" status="online" :src="imgSrc" />
					<text>在线</text>
				</view>
				
				<view class="flex flex-col items-center mx-4">
					<t-img class="mb-2" rounded="md" status="offline" :src="imgSrc" />
					<text>离线</text>
				</view>
			</view>
		</example>
		
		
		<example title="加载中">
			<view class="flex flex-wrap">
				<view class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" rounded="md" />
					<text>默认</text>
				</view>
				
				<view class="flex flex-col items-center mx-4">
					<t-img class="mb-2" rounded="md">
						<template #loading>
							<t-icon type="image" size="1.8em" />
						</template>
					</t-img>
					<text>自定义</text>
				</view>
			</view>
		</example>
		
		<example title="错误">
			<view class="flex flex-wrap">
				<view class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" rounded="md" src="我是非法的错误" />
					<text>默认</text>
				</view>
				
				<view class="flex flex-col items-center mx-4 mb-4">
					<t-img class="mb-2" rounded="md" src="我是非法的错误">
						<template #fail>
							<view>fail</view>
						</template>
					</t-img>
					<text>自定义</text>
				</view>
			</view>
		</example>
	</view>
</template>

<script>
import sizes from "@/design/sizes.js"
import imgSrc from '@/static/mode.jpeg'
import shadows from '@/design/shadows.js'
import roundeds from '@/design/roundeds.js'

export default {
	data() {
		return {
			sizes,
			imgSrc,
			shadows,
			roundeds,
			modes: [
				'scaleToFill',
				'aspectFit',
				'aspectFill',
				'widthFix',
				'heightFix',
				'top',
				'bottom',
				'center',
				'left',
				'right',
				'top left',
				'top right',
				'bottom left',
				'bottom right'
			]
		}
	}
}
</script>

