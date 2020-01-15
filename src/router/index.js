import Vue from 'vue'
import Router from 'vue-router'
import List from '@/container/List'
// import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    // 미구현 시간부족, 능력부족
    // {
    //   path: '/detail',
    //   name: 'detail',
    //   component: Detail
    // }
  ]
})
