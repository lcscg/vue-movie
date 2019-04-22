<template lang="html">
  <!-- 此页面需要 -->
  <div class="container">
    <div>
      <!-- 展示引入的header组件 -->
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <!--展示引入的用户信息组件  -->
      <user-message></user-message>
    </div>
    <div class="contentPic">
      <!-- 展示引入的大图组件 -->
      <index-header-pic v-for="item in headerItems" :key="item._id" :recommendImg="item.recommendImg" :recommendSrc="item.itemmendSrc" :recommendTitle="item.recommendTitle"></index-header-pic>
    </div>
    <div class="contentMain">
      <Row>
        <!-- 栅格布局 -->
        <i-col span="11" offset="1">
          <!-- 使用card组件 -->
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              电影
            </p>
            <ul class="cont-ul">
              <!-- 引入MovieList -->
              <movie-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieName="item.movieName" :movieTime="item.movieTime"></movie-list>
            </ul>
          </Card>
        </i-col>
        <i-col span="10" offset="1">
          <Card>
            <p slot="title">
              <Icon type="edit"></Icon>
              新闻
            </p>
            <ul class="cont-ul">
              <!-- newslist展示区 -->
              <news-list v-for="item in newsItems" :key="item._id" :id="item._id" :articleTitle="item.articleTitle" :articleTime="item.articleTime"></news-list>
            </ul>
          </Card>
        </i-col>
      </Row>
  </div>
      <!-- 展示引入的footer组件 -->
      <common-footer></common-footer>
    </div>
</template>
<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter.vue'
import NewsList from '../components/NewsList.vue'
import MovieList from '../components/MovieList.vue'
import IndexHeaderPic from '../components/IndexHeaderPic.vue'
import UserMessage from '../components/UserMessage.vue'
//逻辑部分代码
export default {
  data() {
    return {
      headerItems: [],
      newsItems: [],
      movieItems: []
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    NewsList,
    MovieList,
    IndexHeaderPic,
    UserMessage
  },
  //这里用于获取数据，需要获得主页推荐，主页新闻列表和主页电影列表
  created() {
    //主页推荐
    this.$http.get('http://localhost:3000/showIndex').then((data) => {
      this.headerItems = data.body.data;
      console.log(data.body.data)
    })
    //获取新闻
    this.$http.get('http://localhost:3000/showArticle').then((data) => {
      this.newsItems = data.body.data;
      console.log(data.body)
    })
    //获取所有电影
    this.$http.get('http://localhost:3000/showRanking').then((data) => {
      this.movieItems = data.body.data;
      console.log(data.body)
    })
  },
};

</script>
<style lang="css" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.contentMain {
  padding-top: 15px;
}

.userMessage {
  padding-top: 0px;
  margin-left: 0px;
}

.contentPic {
  padding-top: 5px;
}

.cont-ul {
  padding-top: 0.5rem;
  background-color: #fff;
}

.cont-ul::after {
  content: '';
  display: block;
  clear: both;
  width: 0;
  height: 0;
}

</style>
