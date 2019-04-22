<template lang="html">
  <!-- 此页面需要 -->
  <div class="container">
    <div>
      <!-- 展示引入的header组件 -->
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <!-- 引入MovieList -->
            <movie-list v-for="item in movieItems" :key="item._id" :id="item.id" :movieName="item.movieName" :movieTime="item.movieTime"></movie-list>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <!-- 展示引入的footer组件 -->
      <common-footer></common-footer>
    </div>
  </div>
</template>
<script>
//逻辑部分代码，建立vue实例
//引入相关的代码包
import MovieIndexHeader from '../components/MovieIndexHeader.vue'
import CommonFooter from '../components/CommonFooter.vue'
import MovieList from '../components/MovieList.vue'

//逻辑代码部分
export default {
  name: 'movieList',
  data() {
    return {
      movieItems: []
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    MovieList
  },
  //这里用于获取数据
  created() {
    //获取所有电影
    this.$http.get('http://localhost:3000/movie/list').then((data) => {
      this.movieItems = data.body.data;
      console.log(data.body)
    })
  },
  methods: {

  }
};

</script>
<style lang="css" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.contentMain {
  padding-top: 150px;
}

.contentLeft {
  font-size: 15px;
  padding-top: 20px;
}

</style>
