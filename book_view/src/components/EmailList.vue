<template lang="html">
  <div class="message">
    <div>{{title}}</div>
    <div>{{fromUser}}</div>
    <div>{{context}}</div>
  </div>
</template>
<script>
	export default{
		props:['title','fromUSer','context']
	};
</script>
<style type="text/css">
	.message{
		border: 1px solid;
	}
</style>