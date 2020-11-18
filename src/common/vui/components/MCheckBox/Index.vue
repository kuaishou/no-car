<template>
    <div
     class="m-checkbox"
    :class="[bChecked?'checked':'']"
     @click="changeCheckbox">
        <span
         class="m-checkbox-icon"
        :style="style"
        ></span>
        <span class="m-checkbox-label">{{label}}</span>
    </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    checked: "",
    value: "",
    color: {
      type: String,
      default: "#FF5051"
    }
  },
  created() {
    // if (bChecked) {
    this.bChecked = this.checked;
    if (this.value) {
      this.bChecked = !!this.value;
    }
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
.m-checkbox.checked .m-checkbox-icon {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMA/A7OFQQ26dkC9fHt4iodAfi+Cgi4sKmff0giEOakiC/Ks19aOyXHw5FRQRnd1K2WeG5nVZpjk+qzWgAABElJREFUeNrt3Aly4jAQBdA2GDBgdggQ9p2wZZnM/PvfbLaaTIIkE8Aiale/G/wyFq12SySEEEIIIYQQQgghhBBCCCGEEPy9UCLkO5hRAjTqwIr4qwT4pUzcjUP89kTMveKvQoNY6+Kfb8RYpo03B+LLn+CdLHFVHuC9DjF1X8AHtRSx9IwjhSUx1BziSMjyHdmlcaTUI4ayORwZVIihOY6VWL4fIxxL+8RP807NwXHh9Sdqjj7xsxwk43lsi8nI8c1LRo4RkpGjDcWEYY7UCoo6w/1tJYDiMUPsZEMohlViZ+5B0eaXI/8EVTtP3KTWUN3xy1Eu6XIQO9kiVC1+z2MDjSmxM/OS8X6MgESsu0NofCdu/EkycpQH0HggbjYFaIyIm2ck4nlk2tAZEjOpNXTuuK27lQBIQl0yziERdcm2ACShLpl7ABKwr1WXXZ6DDU9AEuqSxhRabeKlEsD6e96tkHWL0JCD4tNBuCDLfgC2/z+qbQC1V7JqBL1WhuKSucMfXbIn83iDHHX7TeP+yn6OZh1vVj5ZsdybclBsGiu8UyqTBeMQeusmxSU1wQfFLcVuUYDeKr4c/TSOeD8oZq816KUbFBc/sL9vfoEi9u+cuz10Wg2Kz8MNclBlAK3DzkKTwep352UOWrksxSJVh8LOfMm4CK3ahmKwC2w9D9UCBl0LTQar8z73HvTamZjGXVVBnyzYmJKs+9ctu54xh09WzGCwX9LFqh2Y7H2y5AWKa+uVRgsmpR1ZM4KBN6OL+AdzjgpZ1IHJqErn65W+KAdVH2EybV5Ttd98Djnfgknaj23ZxaBHtjXXMBmM6RzfYDRYkn2pNEwKmzgWDiC3pFvoBzDxns9vlqiKZbqNXQlGnTx9hr+KyDGmW+nlYFRP0Wm9PYwKWbqdcRFGwekFp5yDUW1Bt5QtwChcnJ6vNLun29p60DvdHL6vwWxOt7bxYDY689Pglx5PnSHCY5MMuojQpa/wgggTn3TyQ/zl1IBJFxFK5c80Sxw5mvqACEV1/ekF+MO9D7ZDRPBelL8PN5/Hb1NEeTqa23U3B2XqUBiOdWxr+MvNwYzmBFEOFXVu19HB1/4BUXJZZbLE1QF3f49I85MrNVrkhF4Okbqn1oR1k9xQDhFpWEeUlTsHvbIFXO7g0gHbbQ2XKrl1cPvew2Vyrl1sMEcEBxomsbTbnNmgX1nUO7RBv7ioj+ZtyE0daDjVaPik6hRncPnau0w9GTnUot6xxs8ZUgf8517j55qinu2E+/EgEd+TRcsQp0x5nAAZFxGtzuWGhgUiTdzZSF1V1AecbjDZeFETJpzM2GykLjwhFbq3kTrl4cu/2Fos6r0tMaQZJHollpRBomdiqrnmViiaNNKuddxjOOSwJtbeBokClzq8V3xzCFlelfpBuQigxvGP8Nii5nAH68yint8dJnpJ+F0JIYQQQgghhBBCCCGEEEIIIZLiJzYvdgKGyqYOAAAAAElFTkSuQmCC");
}
.m-checkbox .m-checkbox-icon {
  background-size: 100% 100%;
  border-radius: 50%;
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(204, 204, 204, 1) /*no*/;
  vertical-align: middle;
  /* background-color: red; */
}
.m-checkbox.checked .m-checkbox-icon {
  border-width: 1px;
  border-style: solid;
}
.m-checkbox-label {
  display: inline-block;
  vertical-align: middle;
  height: 34px;
  font-size: 24px; /*px*/
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(85, 85, 85, 1);
  line-height: 34px;
  margin-left: 10px;
}
</style>


