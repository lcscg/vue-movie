<template lang="html">
  <div class="container">
    <div>
      <!-- 展示引入的header组件 -->
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <h1>{{detail.articleTitle}}</h1>
      <div>{{detail.articleTime}}</div>
      <div class="contentText">
        {{detail.articleContext}}
      </div>
    </div>
    <comment v-bind:movie_id="article_id"></comment>
    <div>
      <!-- 展示引入的footer组件 -->
      <common-footer></common-footer>
    </div>
  </div>
</template>
<script>
//引入相关的代码包
import MovieIndexHeader from '../components/MovieIndexHeader.vue'
import CommonFooter from '../components/CommonFooter.vue'
import Comment from '../components/Comment.vue'

let article_id = 0
//逻辑代码部分
export default {
  name: 'NewDetail',
  data(){
    return{
      detail:[],
      article_id:'',   
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment,
  },
  //这里用于获取数据
  creted(){
    article_id=this.$route.query.id;
    this.article_id=article_id;
    this.$http.post('http://localhost:3000/articleDetail',{article_id:article_id}).then((data)=>{
      this.detail=data.body.data[0];
      this.detail.articleTime=new Data(parseInt(this.detail.articleTime)).toLocaleString();
    })
  },
  methods:{
    
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

.contentText {
  font-size: 15px;
  padding-top: 20px;
}

</style>
