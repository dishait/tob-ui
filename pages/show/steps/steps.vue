<template>
	<view class="pb-20">
		<t-nav-bar title="Steps" sticky />

		<example title="基础" customClass="mt-8">
			<t-steps :current="base">
				<t-step>注册</t-step>
				<t-step>登录</t-step>
				<t-step>购买</t-step>
				<t-step>收货</t-step>
			</t-steps>

			<view class="mt-5 flex justify-center">
				<t-btn color="success" @click="next">Next</t-btn>
				<t-btn color="base" light @click="reset" class="ml-6">Reset</t-btn>
			</view>
		</example>

		<example title="插槽">
			<t-steps :current="customSlot">
				<t-step>
					<template #sign>
						<t-icon type="highlight" />
					</template>
					注册
				</t-step>
				<t-step>
					<template #sign>
						<t-icon type="login" />
					</template>
					登录
				</t-step>
				<t-step>
					<template #sign>
						<t-icon type="shopping" />
					</template>
					购买
				</t-step>
				<t-step>
					<template #sign>
						<t-icon type="car" />
					</template>
					收货
				</t-step>
			</t-steps>

			<view class="mt-5 flex justify-center">
				<t-btn color="success" @click="nextCustomSlot">Next</t-btn>
				<t-btn color="base" light @click="resetCustomSlot" class="ml-6">Reset</t-btn>
			</view>
		</example>

		<example title="颜色">
			<t-steps :current="color" successColor="accent">
				<t-step>注册</t-step>
				<t-step>
					<template #sign>
						👀
					</template>
					登录
				</t-step>
				<t-step>
					<template #sign>
						<t-icon type="shopping" />
					</template>
					购买
				</t-step>
				<t-step>收货</t-step>
			</t-steps>

			<view class="mt-5 flex justify-center">
				<t-btn color="accent" @click="nextColor">Next</t-btn>
				<t-btn color="base" light @click="resetColor" class="ml-6">Reset</t-btn>
			</view>
		</example>
		
		<example title="失败熔断">
			<t-steps :current="customFail" :fail="fail">
				<t-step>注册</t-step>
				<t-step>
					<template #sign>
						🤓
					</template>
					登录
				</t-step>
				<t-step>
					<template #sign>
						!
					</template>
					购买
				</t-step>
				<t-step>收货</t-step>
			</t-steps>
		
			<view class="mt-5 flex justify-center">
				<t-btn color="success" @click="nextFail">Next</t-btn>
				<t-btn color="error" @click="toFail" class="ml-6">Fail</t-btn>
				<t-btn color="base" light @click="resetFail" class="ml-6">Reset</t-btn>
			</view>
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			base: 0,
			customSlot: 1,
			color: 2,
			customFail: 0,
			fail: false
		}
	},
	methods: {
		next() {
			this.base++
		},
		reset() {
			this.base = 0
		},
		nextCustomSlot() {
			this.customSlot++
		},
		resetCustomSlot() {
			this.customSlot = 0
		},
		nextColor() {
			this.color++
		},
		resetColor() {
			this.color = 0
		},
		nextFail() {
			this.customFail++
		},
		resetFail() {
			this.fail = false
			this.customFail = 0
		},
		toFail() {
			this.customFail++
			this.fail = true
		}
	}
}
</script>

