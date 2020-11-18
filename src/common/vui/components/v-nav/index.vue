<template>
  <div class="vui-nav">

    <slot name="left">
      <span
        @click="leftClick"
        v-if="leftText"
        class="vui-nav_callback vui-nav_left_button"
        :class="[options.leftBack?'vui-nav_callback':'']"
      >{{leftText}}</span>
    </slot>
    <slot>{{title}}</slot>
    <slot name="right">
      <span
        @click="rightClick"
        v-if="rightText"
        class="vui-nav_right_button"
      >{{rightText}}</span>
    </slot>
  </div>
</template>

<script>
const EVENT_right_click = "right-click";
const EVENT_left_click = "left-click";
import mixinsOptions from "../../mixins/options";
// @vuese
// @group 5 导航组件
// 组件使用
/*
```
props: 
  options.leftText 左侧文字  
  options.leftText 右侧文字
```
*/
export default {
  name: "VNav",
  mixins: [mixinsOptions],
  props: {
    // 标题
    title: {
      type: String
    }
  },
  computed: {
    rightText() {
      return this.options && this.options.rightText;
    },
    leftText() {
      return this.options && this.options.leftText;
    }
  },
  data() {
    return {
      //   showBack: false
    };
  },
  methods: {
    rightClick() {
      //点击右侧触发
      this.$emit(EVENT_right_click);
    },
    leftClick() {
      //点击左侧触发
      this.$emit(EVENT_left_click);
    }
  }
};
</script>


