<template>
  <transition name="page-move">

    <router-view class="vui-content"></router-view>

  </transition>
</template>
<script>
export default {
  name: "VView"
};
</script>

<style lang="less" >
.vui-content {
  background: white;
}
.page-move-enter,
.page-move-leave-active {
  transform: translate(100%, 0);
}

.page-move-enter-active,
.page-move-leave-active {
  transition: transform 0.3s;
}
</style>

