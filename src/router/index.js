import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' }
]

const router = new VueRouter({
  routes
})
// 判断用户是否去个人中心,判断是否有token
router.beforeEach(function(to, from, next) {
  // if (to.name === 'user') {
  //   const token = localStorage.getItem('token')
  //    if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const token = localStorage.getItem('token')
  const authUrls = ['/user', './user-edit']
  if (authUrls.includes || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
