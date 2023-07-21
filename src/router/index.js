import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import CharacterSheet from '../views/CharacterSheet/CharacterSheet.vue'
import NotFound from '../views/NotFound.vue'
import SelectCharacter from '../views/SelectCharacter.vue'
import LoginEmail from '../views/LoginEmail.vue'
import SelectSession from '../views/Sessions/SelectSession.vue'
import Test from '../views/Test.vue'
import UserBrowser from '../views/Sessions/UserBrowser.vue'
import User from '../views/Sessions/User.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  , {
    path: '/character-sheet',
    name: 'character-sheet',
    component: CharacterSheet
  }, {
    path: '/character-sheet/:id',
    name: 'character-sheet-id',
    component: CharacterSheet
  },
  {
    path: '/user/:id',
    name: 'user-id',
    component: User
  },
  {
    path: '/select-character',
    name: 'select-character',
    component: SelectCharacter
  },
  {
    path: '/login-email',
    name: 'login-email',
    component: LoginEmail
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: SelectSession
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/user-browser',
    name: 'user-browser',
    component: UserBrowser
  },

  // 404
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
