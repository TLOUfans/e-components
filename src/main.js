// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/lib/theme-default/index.css'
import ElementUI from 'element-ui'

import MyComponents from '@/components/index'

Vue.config.productionTip = false

Vue.use(MyComponents)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
