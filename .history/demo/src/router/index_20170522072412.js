import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Chat from '@/components/Chat'
import Post from '@/components/Post'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Post',
      component: Post
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
      ]
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
