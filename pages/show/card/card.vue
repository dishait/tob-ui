<template>
	<view class="pb-20">
		<t-nav-bar title="Card" sticky />

		<view class="mt-5">
			<t-notice-bar :scrollable="false">卡片组件是由多个非常灵活的组件构成，以下是一些最佳示例</t-notice-bar>
		</view>

		<example customClass="mt-8" title="基础">
			<t-card size="w-68 ml-4">
				<t-img size="w-full h-40" :src="base.src" />
				<t-card-body>
					<t-card-title>{{ base.title }}</t-card-title>

					<text class="text-sm" style="text-indent: 30rpx;">{{ base.text }}</text>

					<t-card-action justify="end">
						<t-btn color="primary" size="sm" outline>更多</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>

		<example title="封面倒转">
			<t-card size="w-68 ml-4" direction="col-reverse">
				<t-img size="w-full h-46" :src="reversedCover.src" />
				<t-card-body>
					<t-card-title>
						{{ reversedCover.title }}
						<t-tag color="warning" size="xs" class="ml-2">经典</t-tag>
					</t-card-title>

					<text class="text-sm" style="text-indent:30rpx;">{{ reversedCover.text }}</text>

					<t-card-action justify="end">
						<t-btn color="warning" outline size="sm" class="mr-2">了解</t-btn>
						<t-btn ghost size="sm">阅读</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>

		<example title="封面内嵌">
			<t-card align="center" shadow="base" size="w-68 ml-4 pt-4">
				<t-img rounded="lg" size="w-55 h-45" :src="embeddedCover.src" />

				<t-card-body>
					<t-card-title>{{ embeddedCover.title }}</t-card-title>

					<text class="text-sm" style="text-indent: 30rpx;">{{ embeddedCover.text }}</text>

					<t-card-action justify="center">
						<t-btn color="accent" outline size="text-sm px-5">阅读</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>

		<example title="颜色">
			<t-card color="success" size="w-68 ml-4">
				<t-img size="w-full h-40" :src="color.src" />
				<t-card-body>
					<t-card-title>{{ color.title }}</t-card-title>

					<text class="text-sm" style="text-indent:30rpx;">{{ color.text }}</text>
					<t-card-action justify="end">
						<t-btn color="success" size="sm">开始阅读</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>

		<example title="无封面">
			<t-card size="w-68 ml-4">
				<t-card-body>
					<t-card-title>{{ notCover.title }}</t-card-title>
					<text class="text-sm" style="text-indent:30rpx;">{{ notCover.text }}</text>

					<t-card-action justify="center">
						<t-btn color="primary" outline size="sm" class="mr-2">了解</t-btn>
						<t-btn ghost size="sm">阅读</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>

		<example title="无封面(颜色)">
			<t-card size="w-68 ml-4" color="accent">
				<t-card-body>
					<t-card-title>{{ notCoverButColor.title }}</t-card-title>

					<text class="text-sm" style="text-indent:30rpx;">{{ notCoverButColor.text }}</text>

					<t-card-action justify="center">
						<t-btn color="neutral" outline size="sm" class="mr-2">了解</t-btn>
						<t-btn color="accent" size="sm">阅读</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>

		<example title="横排">
			<t-card size="w-68 ml-4" direction="row">
				<view class="w-25">
					<t-img size="w-full h-full" mode="aspectFill" :src="row.src" />
				</view>
				<t-card-body>
					<t-card-title size="sm">{{ row.title }}</t-card-title>

					<text class="text-sm" style="text-indent: 30rpx;">{{ row.text }}</text>
					<t-card-action justify="end" size="xs">
						<t-btn color="warning" size="sm" outline>更多</t-btn>
					</t-card-action>
				</t-card-body>
			</t-card>
		</example>
	</view>
</template>

<script>
import first from "@/static/card/first.jpeg"
import second from "@/static/card/second.jpg"
import third from "@/static/card/third.jpeg"
import fourth from "@/static/card/fourth.jpeg"
import fifth from "@/static/card/fifth.jpeg"
export default {
	data() {
		return {
			base: {
				title: '寒风吹彻',
				src: first,
				text:
					'雪落在那些年雪落过的地方，我已经不注意它们了。比落雪更重要的事情开始降临到生活中。三十岁的我，似乎对这个冬天的来临漠不关心，却又好像一直在倾听落雪的声音，期待着又一场雪悄无声息地覆盖村庄和田野...'
			},
			reversedCover: {
				title: '骆驼祥子',
				src: second,
				text: '这个银白色的世界，没有他坐下的地方，也没有他的去处；白茫茫的一片，只有饿着肚子的小鸟，与走头无路的人，知道什么叫做哀叹。'
			},
			embeddedCover: {
				title: '带上她的眼睛',
				src: third,
				text: '不得不承认，在过去的一天一夜里，她教会了我某种东西，一种说不清的东西，像月夜中草原上的光影一样朦胧，由于它，以后在我眼中的世界与以前会有所不同。'
			},
			color: {
				title: '我与地坛',
				src: fourth,
				text: '大树下，破碎的阳光星星点点，风把遍地的小灯笼吹得滚动，仿佛暗哑地响着无数小铃挡。'
			},
			notCover: {
				title: '平凡的世界',
				text: '生命里有着多少的无奈和惋惜，又有着怎样的愁苦和感伤？雨浸风蚀的落寞与苍楚一定是水，静静地流过青春奋斗的日子和触摸理想的岁月。'
			},
			notCoverButColor: {
				title: '在细雨中呼喊',
				text: '再也没有比孤独的无依无靠的呼喊声更让人战栗，在雨中空旷的黑夜里。'
			},
			row: {
				title: '秋夜',
				src: fifth,
				text: '我家有两颗树,一颗是枣树,另一颗还是枣树'
			}
		}
	}
}
</script>