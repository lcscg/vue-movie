<template lang="html">
  <div>
    <div>
      <div>
        <div class="box">
          <label>输入用户名:</label>
          <input v-model="username" placeholder="用户名">
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
          <button v-on:click=checkUser()>找回密码</button>
        </div>
        <div class="box">
          <label>输入新密码:</label>
          <input v-model="rePassword" placeholder="输入新密码">
        </div>
        <div class="box">
          <button v-on:click=changUserPassword>修改密码</button>
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
        userMail:'',
        userPhone:'',
        rePassword:'',
        showRePassword:'',
        showUserInfo:true,
      }
    },
    methods:{
      checkUser:function(event){
        this.$http.post('http://localhost:3000/users/findPassword',{
          username:this.username,userMail:this.userMail,userPhone:this.userPhone
        }).then((data)=>{
          if (data.body.status==1) {
            alert(data.body.message)
          }else{
            alert(data.body.message)
            this.showRePassword=true;
            this.showUserInfo=false;
            console.log(this.showRePassword);
          }
        })
      },
      changUserPassword:function(event){
        this.$http.post('http://localhost:3000/users/findPassword',{
          username:this.username,userMail:this.userMail,userPhone:this.userPhone,repassword:this.rePassword
        }).then((data)=>{
          if (data.body.status==1) {
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
<style type="text/css">
.box {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
}

</style>
