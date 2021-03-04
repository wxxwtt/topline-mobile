import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 设置html基准值
import 'amfe-flexible'

// 引入vant组件
import './utils/register-vant'

import './styles/index.styl'

// 引入验证规则
import './utils/validation'

// 引入时间处理
import './utils/datetime'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
