<template>
  <div class="vui-list-link">
    <slot>
    <span
      v-if="data.icon"
      :class="[`vui-list-thumb-${data.icon}`]"
      >
      <slot name="icon">
   
      </slot>
    </span>
    <div class="vui-list-item_content">{{data.text}}</div>
    <span
      v-if="data.desc"
      class="vui-list-desc"
    >{{data.desc}}</span>
    <i
      v-if="data.arrow"
      class="vui-list-item_arrow"
    >

    </i>
    </slot>
  </div>
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
  name: "VListItem",
  props: {
    // data.icon 
    // data.text
    // data.desc
    // data.arrow 是否
    data: {
      type: Object,
      defalut() {
        return {
          arrow: false
        };
      }
    }
  }
};
</script>
