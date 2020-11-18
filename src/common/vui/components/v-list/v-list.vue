<template>
  <div class="index-list">

    <v-scroll
      ref="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullUpLoad"
      :options="scrollOptions"
    >
      <!-- <h1 class="vui-list_header">{{v.name}}</h1> -->
      <ul class="vui-list">
        <!--内容-->
        <slot>
          <index-list-group
            v-for="(v,i) in data"
            :key="i"
            :data="v"
          >
          </index-list-group>
        </slot>
      </ul>
    </v-scroll>
  </div>
</template>
<script>
const EVENT_PULLING_DOWN = "pulling-down";
const EVENT_PULLING_UP = "pulling-up";
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
  name: "VList",
  mounted() {},
  props: {
    //分组列表
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  methods: {
    onPullingDown() {
      //页面下拉事件
      this.$emit(EVENT_PULLING_DOWN);
      setTimeout(v => {
        this.$refs.scroll.forceUpdate();
      }, 300);
    },
    //页面上拉事件
    onPullUpLoad() {
      this.$emit(EVENT_PULLING_UP);
      // console.log("onPullUpLoad");
      setTimeout(v => {
        this.$refs.scroll.forceUpdate(true);
      }, 2000);
    }
  },
  data() {
    return {
      scrollOptions: {
        pullUpLoad: {
          txt: {
            more: "加载完成~",
            noMore: "没有更多数据了~"
          },
          threshold: 10000
        },
        pullDownRefresh: {
          threshold: 80,
          stop: 80
        }
      }
    };
  }
};
</script>
<style lang="less">
.index-list {
  height: 100%;
}
</style>
