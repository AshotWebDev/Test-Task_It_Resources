import { createRouter, createWebHistory } from 'vue-router'

const HelloWorld = () => import('@/pages/home/HelloWorld.vue')
const Users = () => import('@/pages/users/Users.vue')
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HelloWorld
      },

      {
        path: '/users',
        name: 'Users',
        component: Users
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
