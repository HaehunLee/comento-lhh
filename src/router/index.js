import Vue from 'vue'
import Router from 'vue-router'
import List from '@/container/List'
import Detail from '@/container/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
      props : true
    }
  ]
})
