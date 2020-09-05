import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function(location) {
//   return routerPush.call(this, location).catch(error => error)
// }
// Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' }
]

const router = new VueRouter({
  routes
})

export default router
