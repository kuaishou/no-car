<template>
  <div class="vui-checkbox">

    <input
      class="vui-checkbox_input"
      :id="uuid"
      :disabled="disabled"
      v-model="currentValue"
      type="checkbox"
    />
    <span class="vui-checkbox_ui"></span>
    <label
      class="vui-checkbox_lable"
      :for="uuid"
    >
      <slot></slot>
    </label>
  </div>
</template>
<script>
import {isObject,isArray} from '../../utils'
// @vuese
// @group 2 表单组件
/*
组件引入
```typescript
import VCheckbox from "@/common/vui/components/v-checkbox/index.vue";

@Component({
  components: {
    VCheckbox
  }
})
```
结合VCheckboxGroup组件一起使用
```typescript
import VCheckbox from "@/common/vui/components/v-checkbox/index.vue";
import VCheckboxGroup from "@/common/vui/components/v-checkbox-group/index.vue";

@Component({
  components: {
    VCheckbox,
    VCheckboxGroup
  }
})
```
*/
export default {
  name: "VCheckbox",
  props: {
    //未选、已选表单值列表
    valueMap: {
      type: Array,
      default: () => [false, true]
    },
    //表单值，使用v-model绑定
    value: {
      type: [Boolean, String, Number, Array],
      default: false
    },
    //是否禁用
    disabled: {
      type: Boolean
    }
  },
  watch: {
    currentValue(val) {
      const rawValue = this.toRaw(val);
      if (this.checkboxGroup) {
        // this.$parent.$emit("input", rawValue);
        this.$parent.$emit("on-change", {
          value: this.value,
          checked: rawValue
        });
      } else {
        this.$emit("input", rawValue);

        this.$emit("on-change", rawValue);
      }
    },
    value(val) {
      // console.log("vaaaaaaaaaaaaalue=", val);
      this.currentValue = this.toBoolean(val);
    }
  },
  created() {
  
  },
  methods: {
    toBoolean(val) {
      // console.log("toBoolean", this.$parent.$data);
      // console.log("toBoolean", this.$parent.$data.checkboxGroup);
      if (!this.valueMap) {
        return val;
      } else {
        const index = this.valueMap.indexOf(val);
        return index === 1;
      }
    },
    toBooleanGroup(v) {
      let currentValue = this.$parent.$data.currentValue;
      let valueMap = this.$parent.$props.valueMap;
      if(isArray(currentValue)){
        return currentValue.indexOf(v)>-1;
      }
      return currentValue[v]===valueMap[1];
    },
    toRaw(val) {
      if (!this.valueMap) {
        return val;
      } else {
        return this.valueMap[val ? 1 : 0];
      }
    }
  },
  data() {
    // console.log('data---',this.value);
    // if(this.$parent.$data.checkboxGroup){
    //   console.log(this.$parent.$data.value)
    // };
    return {
      _value: this.value,
      checkboxGroup: this.$parent.$data.checkboxGroup,
      currentValue: this.$parent.$data.checkboxGroup
        ? this.toBooleanGroup(this.value)
        : this.toBoolean(this.value),
      uuid: Math.random()
        .toString(36)
        .substring(2)
    };
  }
};
</script>
<style lang="less">
.aaaaa {
  height: 50px;
}
</style>

