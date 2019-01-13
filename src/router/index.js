import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Getbottle from '@/components/Getbottle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/getbottle',
      name: 'Getbottle',
      component: Getbottle
    }
  ]
})
