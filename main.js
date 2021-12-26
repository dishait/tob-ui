import App from './App'

import setupTobui from "@/uni_modules/tob-ui/index.js"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

setupTobui(Vue)

const app = new Vue({
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  setupTobui(app)
  
  return {
    app
  }
}
// #endif