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
          // when /user/:id/profile is matched
          path: 'note',
          component: Note
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
