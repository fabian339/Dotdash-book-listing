import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewBook from '@/components/ViewBook.vue'

const Login = () => {
  return <h2>Log In</h2>
}

const SignUp = () => {
  return <h2>Register</h2>
}
 
const BestBooks = () => {
  return <h2>MVP BOOKS</h2>
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/mvp-books',
    name: 'BestBooks',
    component: BestBooks
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/book/:title',
    name: 'HoViewBookme',
    component: ViewBook
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
