import Vue from 'vue'
import App from './App.vue'
import router from './router'
// UI導入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// vuex導入
import store from './store/index.js'
// font導入
import '../src/assets/fonts/iconfont.css'
import '../src/assets/fonts/iconfont.js'

import 'default-passive-events'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
