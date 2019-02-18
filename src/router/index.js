import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Getbottle from '@/components/Getbottle'
import MessageList from '@/components/MessageList'
import ChatList from '@/components/ChatList'

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
    },
    {
      path: '/chatlist',
      name: 'ChatList',
      component: ChatList
    }
  ]
})
