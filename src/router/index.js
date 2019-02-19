import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Getbottle from '@/components/Getbottle'
import MessageList from '@/components/MessageList'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
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
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
