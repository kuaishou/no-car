<template>
    <div class="m-switch"
     :style="style"
      :class="[bChecked?'checked':'']"
     @click="changeCheckbox">
        <span
        class="circle"
        
          
          >
        </span>
      
    </div>
</template>
<script>
export default {
  props: {
    // value: {
    //   type: Sre,
    //   default: false
    // },
    value:'',
    checkedValue: {
      type: String,
      default: ''
    },
    // checked: {
    //   type: Boolean,
    //   default: false
    // },
    color: {
      type: String,
      default: "#FF5051"
    }
  },
  created() {
    // if (bChecked) {
    console.log(this);
    console.log(this.value);
    this.bChecked = !!this.value;
    //  }
  },
  methods: {
    changeCheckbox() {
      this.bChecked = !this.bChecked;
      this.$emit("input", this.bChecked);
    }
  },
  computed: {
    style: function() {
      if (this.bChecked) {
        return {
          borderColor: this.color,
          backgroundColor: this.color
        };
      }
      return {
        backgroundColor: ""
      };
    }
  },
  // return {style:
  //   },
  data() {
    return {
      bChecked: false
    };
  }
};
</script>
<style scoped>
.m-switch {
  position: relative;

  background-size: 100% 100%;
  border-radius: 35px;
  display: inline-block;
  width: 100px;
  height: 50px;
  border: 1px solid rgba(204, 204, 204, 1) /*no*/;
  vertical-align: middle;
  background-color: #fdfdfd;
}
/* .m-switch.checked {
  background-color: red;
} */
.m-switch.checked .circle {
  right: 0;
}
/* @keyframes myfirst {
  from {
    right: 50px;
  }
  to {
    right: 0;
    
  }
} */

.m-switch .circle {
  /* animation: myfirst 5s; */
  position: absolute;
  background: white;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
}
</style>


