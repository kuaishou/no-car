<template>
  <span class="vui-tip">
    <!--提示文案-->
    <slot>提示</slot>
  </span>
</template>

<script>
// @vuese
// @group 1 基础组件
/*
```typescript
import { Vue, Component } from "vue-property-decorator";
import VTip from "@/common/vui/components/v-tip/index.vue";

@Component({
  components: {
    VTip
  }
})
export default class extends Vue {}
```
*/
export default {
  name: 'VTip',
};
</script>
<style scoped>
.vui-tip {
}
</style>

