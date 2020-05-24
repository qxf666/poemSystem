import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Advice from "../components/user/Advice.vue";
import Dynasty from "../components/user/Dynasty.vue"
import Author from "../components/user/Author.vue"
import Music from "../components/user/Music.vue"
import SelectPoem from "../components/user/SelectPoem.vue"

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/user/advice', component: Advice },
        { path: '/user/poem', component: Advice },
        { path: '/user/dynasty', component: Dynasty },
        { path: '/user/author', component: Author },
        { path: '/user/music', component: Music },
        { path: '/user/selectPoem', component: SelectPoem },
      ]
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行        next('/login') 强制跳转
  // eslint-disable-next-line eqeqeq
  if (to.path == '/login') return next()
  // // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router