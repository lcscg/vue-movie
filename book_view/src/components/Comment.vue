<template lang="html">
  <div>
    <label>评论</label>
    <hr>
    <div>
      <li v-for="item in items">
        {{item.username}} 评论:{{item.context}}
      </li>
    </div>
    <div style="padding:5px">
      <textarea v-model="context" style="width:80%;height:50px;" placeholder="内容"></textarea>
    </div>
    <div style="padding-top:10px">
      <button v-on:click="send_comment">评论</button>
    </div>
  </div>
</template>
<!-- 获取所有评论，并且可以回复评论，对于文章详情页也可以使用 -->
<script>
export default {
  props: ['movie_id'],
  data() {
    return {
      items: [],
      context: '',
    }

  },
  created() {
    //获得所有评论
    this.$http.post('http://localhost:3000/movie/comment', { id: this.movie_id }).then((data) => {
      if (data.body.status == 0) {
        this.items = data.body.data
      } else {
        alert("获得失败")
      }
    })
  },
  methods: {
    send_comment(event) {
      let send_data;
      if (typeof(localStorage.username) != "undefined") {
        send_data = {
          movie_id: this.movie_id,
          context: this.context,
          username: localStorage.username
        }
      } else {
        send_data = {
          movie_id: this.movie_id,
          context: this.context,
        }
      }
      this.$http.post('http://localhost:3000/users/postComment', send_data).then((data) => {
        alert(data.body.message)
      })
    }
  }
};

</script>
<style lang="css" scoped></style>
