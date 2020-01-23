// IE 11 Cross Browsing
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import infiniteScroll from "vue-infinite-scroll";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 무한스크롤을 위한 라이브러리 등록
Vue.use(infiniteScroll)
// axios 전역사용 등록
Vue.prototype.$http = axios
// Bootstrap-vue 라이브러리 등록
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
