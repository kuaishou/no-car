<template>
 
    <span
      class="vui-loading"
      :style="style"
    >
    </span>
</template>
<script>
// @vuese
// @group 1 基础组件
/*
```typescript
import { Vue, Component } from "vue-property-decorator";
import VLoading from "@/common/vui/components/v-loading/index.vue";

@Component({
  components: {
    VLoading
  }
})
export default class extends Vue {}
```

弹出式Loading以`plugin`形式调用：
```typescript
import Loading from '@/common/vui/plugins/Loading';
Vue.use(Loading);
```
显示
```typescript
this.$loading.show();
```
隐藏
```typescript
this.$loading.hide();
```
`typescript`类型声明
```typescript
import Vue from "vue";
declare module 'vue/types/vue' {
    interface Vue {
        $loading: any
    }
}
```
*/
export default {
  name: "VLoading",
  data() {
    return {
      balde: 12
    };
  },
  props: {
    //宽高
    size: {
      type: Number
    }
  },
  computed: {
    style() {
      if (!this.size) {
        return;
      }
      const value = `${this.size}px`;
      return {
        width: value,
        height: value
      };
    }
  }
};
</script>
<style lang="less">
// @import "./loading.less";
</style>
