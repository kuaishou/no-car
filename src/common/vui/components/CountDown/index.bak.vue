<template>

  <span
    :class="[this.timeId==-1?'':'count_down_disable']"
    @click="clickCountDown"
  >{{buttonText}}</span>
</template>
<script>
export default {
  props: {
    initCountDown: {
      type: Boolean,
      default: false
    },
    wait: {
      type: Number,
      default: 60
    },
    countDownText: {
      type: String,
      default: "{count}秒后重新发送"
    },
    resetText: {
      type: String,
      default: "重新发送"
    },
    disable: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "确定"
    }
  },
  created() {
    //  console.log("ssssss");
    if (this.initCountDown) {
      this.countDown();
    } else {
      this.buttonText = this.text;
    }
  },
  methods: {
    countDown() {
      if (this.timeId === -1) {
        let count = this.wait;
        this.timeId = setInterval(_ => {
          this.buttonText = this.countDownText.replace("{count}", count);
          if (count == 0) {
            clearInterval(this.timeId);
            this.buttonText = this.resetText;
            this.timeId = -1;
          }
          count--;
        }, 1000);
      }
    },
    clickCountDown() {
      // console.log("clickCountDown");
      if (this.timeId === -1) {
        this.$emit("click");
        this.$nextTick(r => {
          if (!this.disable) {
            this.countDown();
          }
        });
      }
    }
  },
  data() {
    return {
      timeId: -1,
      buttonText: ""
    };
  },
  mounted() {
    // console.log("mounted");
  }
};
</script>

