<template>
  <div id="">
    <p>
      提问:
      <input v-model="question">
    </p>
    <p>{{answer}}</p>
  </div>
</template>
<script>
export default {
  //声明变量
  data() {
    return {
      question: '', //问题输入
      answer: '你还没完问人家问题啊' //初始化回答
    }
  },
  watch: {
    //如果‘question’发送改变，这个函数就会运行
    question: function() {
      this.answer = '等待发问--'
      this.getAnswer()
    }
  },
  methods: {
    //通过该方法可以访问到API，如果有返回的内容，即显示在界面上
    getAnswer: function() {
      if (this.question.indexOf('？') !== -1) {
        this.answer = '思考中······'
        let that = this
        //发送给用户的信息部分，这里使用vue-respurce的方式
        that.$http.post('http://robottest.uneedzf.com/api/talk2Robot',
        	{token: '1e20af5ece26d7d84d1c34fe61b7c715',message: that.question}).then(function(res) {
          //根据返回的情况回复用户不同的内容
          if (res.data.code === 0) {
            that.answer == res.data.data
          } else {
            that.answer = res.data.message
          }
        })
      } else {
        //当用户使用了非“？”的字符结尾时，需要显示的内容
        this.answer = '一个问题一般由一个？结尾哦'
        return 0;
      }
    }
  }
};

</script>
