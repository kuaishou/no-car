<template>
  <section class="vui-content">
      <!--内容-->
      <slot></slot>
  </section>
</template>
<script>
// @vuese
// @group 6 布局
/*
内容容器
```typescript
import { Vue, Component, Provide } from "vue-property-decorator";
import VContent from "@/common/vui/components/v-conetent/index.vue";

@Component({
  components: {
    VContent
  }
})
export default class extends Vue {}
```
*/
export default {
  name:"VContent"
}
</script>

