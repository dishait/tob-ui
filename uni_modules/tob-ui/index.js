const appTheme = uni.getStorageSync('AppTheme') || ''

// #ifdef VUE2
import Vue from "vue"
const shared = Vue.observable({ appTheme })
// #endif


// #ifdef VUE3
import { reactive } from "vue"
const shared = reactive({ appTheme })
// #endif


export default (V, options = {}) => {
	const { initAppTheme = '' } = options
	
	shared.appTheme = shared.appTheme ? shared.appTheme : initAppTheme
	
	V.mixin({
		computed: {
			// app主题
			AppTheme() {
				const { appTheme } = shared
				const AppTheme = appTheme ? `theme-${appTheme}` : ''
				uni.setStorageSync('AppTheme', AppTheme)
				return AppTheme
			}
		},
		methods: {
			// 切换app主题
			ToggleAppTheme(t) {
				shared.appTheme = t
			}
		}
	})
}