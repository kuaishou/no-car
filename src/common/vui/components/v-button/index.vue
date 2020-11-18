<template>
  <button
    class="vui-btn"
    :type="type"
    :class="btnClass"
    :style="style"
    @click="handleClick"
  >

    <v-loading
      v-if="loading"
      class="btn-loading"
      :size="20"
    ></v-loading>
    <!--按钮文字-->
    <slot></slot>

  </button>
</template>

<script>
// @vuese
// @group 1 基础组件 
/*
组件使用
```typescript
import { Vue, Component } from "vue-property-decorator";
import XButton from "@/common/vui/components/v-button/index.vue";

@Component({
  components: {
    XButton
  }
})
export default class extends Vue {}
```
*/
export default {
  name: "VButton",
  props: {
    icon: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //纯净按钮模式
    pure: {
      type: Boolean,
      default: false
    },
    //圆角模式 none:无圆角 min:小圆角 middle:中圆角 max:大圆角
    radius: {
      type: String,
      default: ""
    },
    //是否有Loading图标
    loading: {
      type: Boolean,
      default: false
    },
    //展示错误样式
    error: {
      type: Boolean,
      default: false
    },
    //小按钮
    min: {
      type: Boolean,
      default: false
    },
    //中按钮
    middle: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "button"
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      //点击事件
      this.$emit("click", event);
    }
  },
  computed: {
    style() {
      return {
        // "border-radius": "5px"
      };
    },
    btnClass() {
      //   let sss = "sss";
      let btnClass = {
        // ('vui-btn_radius_'+this.radius):this.radius,
        // "vui-btn_active": this.active,
        "vui-btn_disabled": this.disabled,
        "vui-btn_pure": this.pure,
        // "vui-btn-inline": this.inline,
        "vui-btn_min": this.min,
        "vui-btn_middle": this.middle,
        "vui-btn_error": this.error
        // "vui-btn-outline-primary": this.outline && this.primary,
        // "vui-btn-light": this.light
      };
      //   console.log('this.radius',this.radius)
      !this.radius || (btnClass[`vui-btn_radius_${this.radius}`] = true);
      // console.log(btnClass);
      return btnClass;
    }
  }
};
</script>

<style scoped>
.btn-loading{ 
    /* background: red; */
        vertical-align: sub;
}
</style>

