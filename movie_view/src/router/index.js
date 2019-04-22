//引入相关的代码包
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'
//使用引入的包
Vue.use(Router)

const VIP = {template:''};

//定义视图命名路由
const viewNamed ={template:'<div>默认视图</div>'}
const viewNamedA ={template:'<div>视图a</div>'}
const viewNamedB ={template:'<div>视图b</div>'}

export default new Router({
  //定义路由
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/user/:id',
      component: User,
      name:'user',
      children:[
      {
        path:'vip',
        component:VIP
      }]
    },

    {
      path:'/viewNamed',
      components:{
        default:viewNamed,
        a:viewNamedA,
        b:viewNamedB
      }
    }
  ]
})
