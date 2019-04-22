<template lang="html">
  <div>
    <div>
      <input v-model="toUserName" placeholder="发送用户名">
    </div>
    <div style="padding:10px">
      <input v-model="title" placeholder="发送标题">
    </div>
    <div style="padding:5px">
      <textarea v-model="context" style="width:80%;height:50px;" placeholder="内容"></textarea>
    </div>
    <div style="width:80%;height:px">
      <button v-on:click="send_mail">发送站内信</button>
    </div>
  </div>
</template>
<script>
  export default{
  props:[],
  data(){
    return{
      toUserName:'',
      context:'',
      title:'',
    }
  },
  methods:{
    send_mail(event){
      let send_data={
        token:localStorage.token,
        user_id:localStorage._id,
        toUserName:this.toUserName,
        title:this.title,
        context:this.context,
      }
      this.$http.post('http://localhost:3000/users/sendEmail',send_data).then((data)=>{
      if(data.body.status==1){
        alert(data.body.message)
      }else{
        alert("发送成功")
              }
    })
      }
  }
};
</script>
<style type="text/css" scoped>
</style>
