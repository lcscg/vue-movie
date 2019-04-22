<template lang="html">
  <div v-if=!isLogin class="=header">
    <Row>
      <i-col span="2" offset="22">
        <router-link to="/loginPage">
          <div class="header_menu">
            <Icon type="person" />登录</div>
        </router-link>
      </i-col>
    </Row>
  </div>
  <div v-else class="header">
    <Row>
      <i-col span="2" offset="22">
        <router-link :to="{path:'/userInfo',query:{id:id}}">
          <div class="header_menu">
            <Icon type="person" />已登录:{{username}}</div>
        </router-link>
      </i-col>
    </Row>
  </div>
</template>
<!-- 这里需要一开始就对Session进行检测，如果存在Session则直接登录，如不存在在则是跳转链接 -->
<script>
export default {
  data() {
    return {
      isLogin: false,
      username: '',
    }
  },
  created() {
    //此时登录成功
    let token = localStorage.getItem('token')
    //检测是否是用户等状态
    if (token) {
      this.isLogin = true;
      this.username = localStorage.getItem('username');
      this.is = localStorage.getItem('_id');
    } else {
      console.log('用户登录失败');
      //可以增加跳转信息或者返回错误信息
    }
  }
};

</script>
<style lang="css" scoped>
.header {
  width: 100%;
  height: 30px;
  left: 0;
  top: 0;
  color: #000;
  background-color: #C3BD5C;
}

.header_menu {
  padding-top: 6px;
  color: #fff;
  font-size: 12px;
}

</style>
