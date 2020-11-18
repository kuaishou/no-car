<template>
  <div 
  v-if="show"
  class="commonMsgWrap centerWrap">
                           <i></i>
                           <span
                           v-html="text"
                            class="centerContent opacity9">
 </span>
   </div>
</template>
<script>
// @vuese
// @group 3 弹窗提示
/*
Toast提示，该组件支持以`plugin`形式调用：
```typescript
import Toast from '@/common/vui/plugins/Toast';
Vue.use(Toast);
```
显示
```typescript
this.$toast.show({
    text: '提交成功'
});
```
隐藏
```typescript
this.$toast.hide();
```
`typescript`类型声明
```typescript
import Vue from "vue";
declare module 'vue/types/vue' {
    interface Vue {
        $toast: any
    }
}
```
*/
export default {
  name: 'Toast',
  props: {
    //提示内容，支持 html
     text: String,
    value: Boolean,
    //显示时间
    time: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    if (this.value) {
      this.show = true;
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$emit("input", true);
        this.$emit("on-show");
        // this.fixSafariOverflowScrolling('auto')
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.show = false;
          this.$emit("input", false);
          this.$emit("on-hide");
          // this.fixSafariOverflowScrolling('touch')
        }, this.time);
      }
    }
  }
};
</script>

<style lang="less" scoped>
/* 垂直上下居中 */
.centerWrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.centerWrap i {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
.centerWrap .centerContent {
  display: inline-block;
  vertical-align: middle;
}
.commonMsgWrap .centerContent {
  font-size: 0.3rem;
  color: #fff;
  background: #222;
  padding: 0.3rem 0.4rem;
  margin: 0 0.3rem;
  border-radius: 0.2rem;
  z-index: 99999;
  word-break: break-all;
  word-wrap: break-word;
}
</style>

