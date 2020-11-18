<template>
   <div class="PickerItem" ref="picker">
   </div> 
</template>
<script>
import Scroller from "../Picker/scroller";
export default {
  mounted() {
    this.$nextTick(() => {
      let y = window.getComputedStyle(this.$refs.picker);
      console.log("yy=", y.height);
      new Scroller(this.$refs.picker, {
        data: [1, 33, 25, 255, 66]
      });
    });
  }
};
</script>


