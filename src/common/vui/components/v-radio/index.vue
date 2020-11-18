<template>
  <label><input
      :name="name"
      type="radio"
      :value="value"
      :checked="checked"
      @change="onChange"
    />
    {{value}}
    <slot></slot>
  </label>
</template>
<script>
// @vuese
// @group 待完善
export default {
  name: "VRadio",
  props: {
    value: {
      type: String
    },
    name: {
      type: String,
      default: Math.random()
        .toString(36)
        .substring(2)
    }
  },
  // watch: {
  //   currentValue(val) {
  //      console.log('ssssss=',val);
  //   //     this.$emit("on-change", val);
  //     // this.$parent.$emit("on-change",val);
  //   }
  // },
  created() {
    console.log("created=", this.value);
  },
  methods: {
    onChange(a) {
      if (this.$parent.$data.radioGroup) {
        this.$parent.$emit("on-change", this.value);
        this.$parent.$emit("input", this.value);
      } else {
        this.$emit("on-change", this.value);
        this.$emit("input", this.value);
      }
    }
  },
  computed: {
    sValue() {
      return "***";
    }
  },
  data() {
    let checked = false;
    if (this.$parent.$data.currentValue == this.value) {
      checked = true;
    }
    console.log("父数据", this.$parent.$data.currentValue);
    return {
      checked
    };
  }
};
</script>
