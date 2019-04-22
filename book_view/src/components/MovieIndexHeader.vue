<template lang="html">
  <Menu mode="horizontal" theme="dark" active-name="1">
    <router-link to="/">
      <MenuItem name="1">
      <Icon type="ios-paper"></Icon>
      主页
      </MenuItem>
    </router-link>
    <router-link to="/movieList">
      <MenuItem name="2">
      <Icon type="ios-people"></Icon>
      电影
      </MenuItem>
    </router-link>
  </Menu>
</template>
<script>
export default {

};

</script>
<style lang="css" scoped>
.header {
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  color: #030202;
  background-color: #03FCCC;
  border-bottom: 2px solid #000;
}

.header_menu {
  padding-left: 60px;
  padding-top: 20px;
  float: left;
  color: #000000;
}

</style>
