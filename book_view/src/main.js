// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routers from './router.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(iView)

// 设定常量
const RouterConfig = {
  routes: Routers
};
const router=new VueRouter(RouterConfig);
new Vue({
  el: '#app',
  router:router,
  render: h=>h(App),
})
