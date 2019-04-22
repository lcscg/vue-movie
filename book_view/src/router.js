const routers = [{
    path: '/',
    component: resolve => require(['./pages/index.vue'], resolve),
    meta: {
      title: 'home'
    }
  },
  {
    path: '/movieList',
    component: resolve => require(['./pages/movieList.vue'], resolve),
  },
  {
    path: '/movieDetail',
    component: resolve => require(['./pages/movieDetail.vue'], resolve),
  },
  {
    path: '/newsDetail',
    component: resolve => require(['./pages/newsDetail.vue'], resolve),
  },
  {
    path: '/login',
    component: resolve => require(['./pages/loginPage.vue'], resolve),
  },
  {
    path: '/register',
    component: resolve => require(['./pages/registerPage.vue'], resolve),
  },
  {
    path: '/findPassword',
    component: resolve => require(['./pages/findPassword.vue'], resolve),
  },
  {
    path: '/userInfo',
    component: resolve => require(['./pages/userInfo.vue'], resolve),
  },
  {
    path: '/sendEmail',
    component: resolve => require(['./pages/sendEmail.vue'], resolve),
  },
];
export default routers;
