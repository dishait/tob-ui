<template>
	<view class="pb-20">
		<t-nav-bar title="Form" sticky />

		<example title="失焦校验" customClass="mt-8">
			<t-form ref="blurForm">
				<t-field name="username" required label="账号" labelIcon="deleteuser"><t-input v-model="blurInput" primordial placeholder="请输入账号" /></t-field>

				<t-field name="password" required label="密码" labelIcon="lock"><t-input v-model="blurPassword" primordial type="password" placeholder="请输入密码" /></t-field>
			</t-form>
		</example>

		<example title="变更时校验">
			<t-form ref="changeForm" validateTrigger="onChange">
				<t-field name="username" required label="账号" labelIcon="deleteuser"><t-input v-model="changeInput" primordial placeholder="请输入账号" /></t-field>

				<t-field name="password" required label="密码" labelIcon="lock"><t-input v-model="changePassword" primordial type="password" placeholder="请输入密码" /></t-field>
			</t-form>
		</example>

		<example title="手动校验">
			<t-form ref="form" validateTrigger="manual">
				<t-field required name="username" label="用户名" labelIcon="deleteuser">
				<t-input color="accent" v-model="username" placeholder="请输入用户名" />
				</t-field>

				<t-field name="switch" label="开关" labelIcon="pic-left">					
					<t-switch v-model="switchStatus" color="accent" />
				</t-field>

				<t-field name="stepper" validateTrigger="onChange" label="步进器" labelIcon="plus-square">
					<t-stepper v-model="stepper" color="accent" />
				</t-field>

				<t-field name="checkGroup" label="复选框" labelIcon="check-square">
					<t-checkbox-group v-model="checkboxs">
						<t-checkbox color="accent" value="1" class="mr-5">项目1</t-checkbox>
						<t-checkbox color="accent" value="2">项目2</t-checkbox>
					</t-checkbox-group>
				</t-field>

				<t-field name="radio" label="单选框" labelIcon="select">
					<t-radio-group v-model="radioStatus">
						<t-radio color="accent" value="1" class="mr-5">项目1</t-radio>
						<t-radio color="accent" value="2" class="mr-5">项目2</t-radio>
					</t-radio-group>
				</t-field>

				<t-field name="slider" label="滑块" labelIcon="sliders">
					<t-slider showValue v-model="slider" color="accent" />
				</t-field>

				<t-field name="area" label="文本" labelIcon="file-text">
					<t-textarea color="accent" size="w-48 h-20" v-model="area" />
				</t-field>
			</t-form>
			
			<view class="text-center mt-8">
				<t-btn color="accent" size="w-45" @click="sumbit">sumbit</t-btn>
			</view>
		</example>
	</view>
</template>

<script>
export default {
	data() {
		return {
			blurInput: '',
			blurPassword: '',
			changeInput: '',
			changePassword: '',
			area: '',
			slider: 18,
			stepper: 18,
			username: '',
			checkboxs: [],
			radioStatus: '1',
			switchStatus: false
		}
	},
	methods: {
		sumbit() {
			this.$refs.form.validateAll()
		}
	},
	mounted() {
		const baseRules = {
			username: [
				field => {
					if (!field.value) {
						return `${field.label}必填`
					}
				}
			],
			password: [
				field => {
					if (!field.value) {
						return `${field.label}必填`
					}
				},
				field => {
					if (field.value.length < 8) {
						return '密码长度必须大于8'
					}
				}
			]
		}
		this.$refs.blurForm.setRules(baseRules)
		this.$refs.changeForm.setRules(baseRules)
		
		
		const manualRules = {
			username: [
				field => {
					if (!field.value) {
						return `${field.label}必填`
					}
				}
			],
			switch: [
				field => field.value || `${field.label}必须打开`
			],
			slider: [
				field => {
					if (field.value < 20) {
						return `${field.label}必须大于20`
					}
				}
			],
			area: [
				field => {
					if (field.value.length < 10) {
						return `${field.label}必须不小于10个字符`
					}
				}
			]
		}
		
		this.$refs.form.setRules(manualRules)
	}
}
</script>
