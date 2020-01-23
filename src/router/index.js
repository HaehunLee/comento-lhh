import Vue from 'vue'
import Router from 'vue-router'
import List from '@/container/List'
import Detail from '@/container/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    { // 목록 페이지 라우팅
      path: '/',
      name: 'List',
      component: List
    },
    { // 상세 페이지 라우팅
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
    }
  ]
})
