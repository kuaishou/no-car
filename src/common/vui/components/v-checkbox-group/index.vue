<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import {isObject,isArray} from '../../utils'
// @vuese
// @group 2 表单组件
/*
组件使用
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
  name: "VCheckboxGroup",
  props: {
    //表单值，使用v-model绑定
    value: {
      type: [Array,Object]
    },
    //未选、已选表单值列表
     valueMap: {
      type: Array,
      default: () => [false, true]
    }
  },
  created() {
    let _value = this.value;
    let valueMap = this.valueMap;
    this.$on("on-change", function(v) {

      if (v.checked) {
        
        if(isArray(_value)){
            _value.push(v.value);
        }else{
         
            this.$set(_value,v.value,valueMap[1])
        }
    
      } else {
        if(isArray(_value)){
            let index = _value.indexOf(v.value);
          _value.splice(index, 1);
        }else{
           this.$set(_value,v.value,valueMap[0])
        }
      }
    });
  },
  data() {
    return {
      currentValue: this.value,
      // valueMap: this.valueMap,
      checkboxGroup: true
    };
  }
};
</script>

