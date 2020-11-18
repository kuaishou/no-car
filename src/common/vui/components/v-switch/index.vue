<template>
  <div
    :class="switchClass"
    class="vui-switch"
  >
    <span class="vui-switch-label">
      <slot>

      </slot>
    </span>

    <input
      class="vui-switch-input"
      type="checkbox"
      :checked="true"
      :disabled="disabled"
      v-model="currentValue"
      @click="onClick"
    >
    <i class="vui-switch-ui"></i>

  </div>
</template>
<script>
// @vuese
// @group 2 表单组件
/*
组件引入
```typescript
import VSwitch from "@/common/vui/components/v-switch/index.vue";

@Component({
  components: {
    VSwitch
  }
})
```
*/
export default {
  name: "VSwitch",
  props: {
    //是否自定义大小
    custom: {
      type: Boolean
    },
    //关闭、打开表单值列表
    valueMap: {
      type: Array,
      default: () => [false, true]
    },
    //表单值，使用v-model绑定
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    //内联
    inline: {
      type: Boolean
    },
    direction: {
      type: Boolean
    },
    //是否禁用
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      currentValue: this.toBoolean(this.value)
    };
  },
  watch: {
    currentValue(val) {
      const rawValue = this.toRaw(val);
      this.$emit("input", rawValue);
      this.$emit("on-change", rawValue);
    },
    value(val) {
      this.currentValue = this.toBoolean(val);
    }
  },
  methods: {
    toBoolean(val) {
      console.log(val, this.valueMap);
      if (!this.valueMap) {
        return val;
      } else {
        const index = this.valueMap.indexOf(val);
        return index === 1;
      }
    },
    toRaw(val) {
      if (!this.valueMap) {
        return val;
      } else {
        return this.valueMap[val ? 1 : 0];
      }
    },
    onClick() {
      setTimeout(() => {
        const rawValue = this.toRaw(this.currentValue);
        this.$emit('on-click', rawValue)
      }, 0)
      
    }
  },
  computed: {
    switchClass() {
      return {
        "vui-switch_inline": this.inline,
        "vui-switch_disabled": this.disabled,
        "vui-switch_custom": this.custom
      };
    }
  }
};
</script>

<style lang="less" scoped>

</style>


