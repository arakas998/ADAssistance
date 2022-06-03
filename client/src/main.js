import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";


Vue.use(VueRouter);

const routes = [
  { path: "/", component: Landing },
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login}
]


Vue.config.productionTip = false

const router = new VueRouter({
  
  mode: "history",
  routes,

})

new Vue({

  el: "#app",
  router,
  render: h=> {
      return h(App)
  }
 
});

