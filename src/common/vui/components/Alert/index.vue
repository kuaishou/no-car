<template>

      <div @click="close" v-show="show" class="mask  tb-alert">
        <div :style="{width:width}" class="alert-box">
          <div class="alert-content">
            <slot>
              <div class='alert-ico'></div>
              <div v-html="content" class="alert-tip"></div>
              <div @click="confirm" class="alert-btn">{{confirmText}}</div>
            </slot>
          </div>

        </div>
      </div>

</template>
<script>
export default {
  props: {
    confirmText: String,
    width: String,
    show: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: "提示"
    },

    content: {
      type: String,
      default: null
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      // this.show = false;
      this.$emit("update:show",false);
    }
  },
  data() {
    return {};
  },
  mounted() {},
  created() {
    this.$nextTick(() => {});
  }
};
</script>

<style lang="less" scoped>
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9;
  top: 0;
}
.confirm-tip {
  margin-top: 30px;
}
.alert-box {
  // border: 20px solid #4491f1;
  overflow: hidden;
  background-color: #4491f1;
  border-radius: 20px;
  /* width: 240px;
    height: 130px; */
  width: 550px;
  // height: 400px;
  margin: 0 auto;
  text-align: center;
  padding-top: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  font-size: 34px;/*px*/
  padding: 15px;
}
.alert-content {
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
}
.alert-ico {
  background-image: url("./img/icon_success.png");
  // background-image: url('data:image/png;base64,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');
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
  margin: 0.5rem auto 0.1rem;
}
.alert-tip {
  font-size: 0.24rem;
  color: rgb(114, 106, 106);
  font-size: 50px;
}
.alert-btn {
  border: 1px solid #4491f1;/*no*/
  border-radius: 10px;
  margin: 30px;
  // margin-left: 30px;
  // margin-right: 30px;
  color: #4491f1;
  padding: 15px;
}
</style>

