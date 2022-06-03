
import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from "../components/Landing";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

Vue.use(VueRouter)

const routes = [
  { path: "/", component: Landing },
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
