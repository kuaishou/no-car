<template>
  <h2
    class="vui-list_header"
    v-html="data"
  ></h2>
</template>

<script>
// @vuese
// @group 6 布局
export default {
  name: "VListHeader",
  props: {
    data: {
        type:String,
        defalut:''
    }
  }
};
</script>

<style>

</style>
