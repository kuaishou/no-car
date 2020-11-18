<template>
    <div class="empty-page">
        <img 
        class="empty-icon"
        src="./logo@3x.png"/>
    <div class="tip-msg">
        {{tipMsg}}
    </div>

   </div>
</template>
<script>
export default {
    props:{
        tipMsg:{
            type:String,
            default:'没有找到相关信息'
        }
    }
}
</script>

<style scoped>
.empty-page {
  text-align: center;
  margin-top: 300px;
}
.empty-icon {
  width: 150px;
  height: 150px;
}
.tip-msg {
  margin-top: 50px;
  font-size: 30px; /*px*/
  color: #888;
}
</style>
