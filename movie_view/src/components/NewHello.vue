<!-- html页面代码部分 -->
<template>
  <div>
    <h1>
			{{msg}}
		</h1>
  </div>
</template>
<script>
//逻辑代码部分，简历页面实例
export default {
  name: 'NewHello',
  data() {
    return {
      msg: 'Hello World'
    }
  }
}

</script>
