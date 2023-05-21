import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import FeedPage from '../views/FeedPage.vue'
import Settings from '../views/Settings.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'FeedPage',
      component: FeedPage
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/profile/335',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: Admin
    }
  ]
})

export default router
