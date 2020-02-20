import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pos from '@/components/pos/pos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pos',
      name: 'pos',
      component: pos
    },{
      path:'/goHome',
      redirect:'/'
    }
  ]
})
