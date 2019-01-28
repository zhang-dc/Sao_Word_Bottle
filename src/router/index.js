import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Getbottle from '@/components/Getbottle'
import MessageList from '@/components/MessageList'

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
    },
    {
      path: '/messagelist',
      name: 'MessageList',
      component: MessageList
    }
  ]
})
