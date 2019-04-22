<template lang="html">
  <div class="movieList">
    <div>
      <router-link:to="{path:'/movieDetail',query:{id: id}}" class="goods-list-link">
        {{movieName}}{{movieTimeShow}}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movieTimeShow: ''
    }
  },
  props: ['id', 'movieName', 'movieTime'],
  /*props是子组件获取父组件数据用的*/
  created() {
    this.movieTimeShow = new Date(parseInt(this.movieTime)).toLocaleString().replace(/:\d{1,2}$/, ' ');
  },
};

</script>
<style lang="css" scoped>
.movieList {
  padding: 5px;
  border-bottom: 1px dashed #ababab;
}

</style>
