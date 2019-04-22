<template lang="html">
  <div>
    <div>
      <div>
        <div class="box">
          <label>输入用户名:</label>
          <input v-model="username" placeholder="用户名">
        </div>
        <div class="box">
          <label>输入密码:</label>
          <input v-model="password" placeholder="密码">
        </div>
        <div class="box">
          <label>重复输入密码:</label>
          <input v-model="rePassword" placeholder="密码">
        </div>
        <div class="box">
          <label>输入邮箱:</label>
          <input v-model="userMail" placeholder="邮箱">
        </div>
        <div class="box">
          <label>输入手机:</label>
          <input v-model="userPhone" placeholder="手机">
        </div>
        <div class="box">
          <i-button type="dashed" v-on:click=userRegister()>注册</i-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        username:'',
        password:'',
        userMail:'',
        userPhone:'',
        rePassword:'',
      }
    },
    methods:{
      //注册方法
      userRegister:function(event){
        if(this.password!=this.rePassword){
          alert("两次密码不一致");
        }else{
          let sendDate={
username:this.username,
password:this.password,
userMail:this.userMail,
userPhone:this.userPhone,
}.
this.$http.post('http://localhost:3000/users/register',sendDate).then((data)=>{
  if (data.body.status==1) {
    alert(data.body.message)
  }else{
    alert(data.body.message)
    this.$router.go(-1)
  }
})
}
},

    }    
  };
</script>
<style type="text/css">
.box {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
}

</style>
