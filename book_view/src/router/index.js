import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Index from '../pages/index.vue'
import MovieList from '../pages/movieList.vue'
import MovieDetail from '../pages/movieDetail.vue'
import NewsDetail from '../pages/newsDetail.vue'
import LoginPage from '../pages/loginPage.vue'
import RegisterPage from '../pages/registerPage.vue'
import FindPassword from '../pages/findPassword.vue'
import UserInfo from '../pages/userInfo.vue'
import SendEmail from '../pages/sendEmail.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
      {
        path: '/',
        component: resolve => require(['../pages/index.vue'], resolve),
        meta: {
          title: 'home'
        }
      },
      {
      path: '/movieList',
      component: MovieList
    },
      {
      path: '/movieDetail',
      component: MovieDetail
    },
     {
      path: '/newsDetail',
      component: NewsDetail
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/findPassword',
      component: FindPassword
    },
    {
      path: '/userInfo',
      component: UserInfo
    },
    {
      path: '/sendEmail',
      component: SendEmail
    },
  ]
})
