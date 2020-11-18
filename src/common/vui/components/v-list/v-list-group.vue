<template>
  <li class="cube-v-list-group">

    <v-list-header :data="data.name"> </v-list-header>
    <ul>
      <slot>
        <v-list-item
          v-for="(v, i) in data.items"
          :key="i"
          :data="v"
        ></v-list-item>
      </slot>
    </ul>
  </li>
</template>

<script>
// @vuese
// @group 6 布局
/*
列表，VList、VListGroup、VListItem一起搭配使用
```typescript
import { Vue, Component, Provide } from "vue-property-decorator";
import VList from "@/common/vui/components/v-conetent/v-list.vue";
import VListGroup from "@/common/vui/components/v-conetent/v-list-group.vue";
import VListItem from "@/common/vui/components/v-conetent/v-list-item.vue";

@Component({
  components: {
    VList,
    VListGroup,
    VListItem
  }
})
export default class extends Vue {}
```
*/
export default {
  name: "VListGroup",
  props: {
    //数据列表
    /*
    data.name 分组题目
    data.items 分组数据
    */
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created(){
     
  }
};
</script>

<style>

</style>
