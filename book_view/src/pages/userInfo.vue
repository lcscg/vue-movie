<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <div>
      <div class="box">用户名: {{detail.username}}</div>
    </div>
    <div>
      <div class="box">用户邮箱: {{detail.userMail}}</div>
    </div>
    <div>
      <div class="box">用户电话: {{detail.userPhone}}</div>
    </div>
    <div>
      <div class="box">用户状态: {{userStatus}}</div>
    </div>
    <div>
      <button v-on:click=ShowChangeUserPassword()>修改密码</button>
    </div>
    <!-- 这个是用于修改密码，需要在平时隐藏 -->
    <div v-show="showRePassword">
      <div class="box">
        <label>输入旧密码</label>
        <input v-model="password" placeholder="输入旧密码">
      </div>
      <div class="box">
        <label>输入新密码</label>
        <input v-model="repassword" placeholder="输入新密码">
      </div>
      <div class="box">
        <button v-on:click=changUserPassword()>修改密码</button>
      </div>
    </div>
    <div style="padding-top:10px">
      <!-- 需要跳转至新页面 -->
      <router-link to="/sendEmail">
        <button>发送站内信</button>
      </router-link>
    </div>
    <common-footer></common-footer>
  </div>
</template>
<script>
  import MovieIndexHeader from '../components/MovieIndexHeader.vue'
import CommonFooter from '../components/CommonFooter.vue'
import UserMessage from '../components/UserMessage.vue'
export default {
  name: 'HelloWorld',
  data() {
    return {
      items:[],
      detail:[],
      userStatus:'',
      showRePassword:false,
      password:'',
      repassword:''
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage,
  },
  //用于获取数据
  created(){
    let userId=this.$route.query.id;
    if(userId){
    this.$http.post('http://localhost:3000/showUser', { user_id:userId }).then((data) => {
        if (data.body.status ==1) {
          alert(data.body.message)
        } else {
          this.detail=data.body.data;
          if (data.body.data.userStop) {
            this.userStatus="用户已经被封停";
          }else {
            this.userStatus="用户状态正常"
          }
        }
        console.log(data.body.data)
      })
  }else{
    alert("用户信息错误")
  }
},
methods:{
  ShowChangeUserPassword(event){
    this.showRePassword=true
  },
  changUserPassword(event){
    let token=localStorage.token;
    let user_id=localStorage._id;
    this.$http.post('http://localhost:3000/users/findPassword',{
      token:token,user_id:user_id,repassword:this.repassword,password:this.password
    }).then((data)=>{
      if(data.body.status==1){
        alert(data.body.message)
      }else{
        alert(data.body.message)
        this.$router.go(-1)
      }
    })
  },
}
};

</script>
<style type="text/css" scoped>
.box {
  display: inline-flex;
}

.container {
  width: 100%;
  margin: 0 auto;
}

.userMessage {
  padding-top: 60px;
  margin-top: -10px;
  margin-left: -10px;
}

</style>
