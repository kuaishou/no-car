<template>
  <span @click="clickCountDown">
    <!--内容-->
    <slot v-if="useSlot">确定</slot>
    <template v-else>
      {{buttonText}}
    </template>
  </span>
</template>
<script>
import { format, UDdate } from "../../../utils/date";
// @vuese
// @group 1 基础组件
/*
模板
```html
<count-down
  @click="sendms"
  class="countDown"
  :countDownText="'({count}秒后重新发送)'"
  resetText="(重新发送)"
  :startDown.sync="countDown"
>发送短信</count-down>
```

组件引入
```typescript
import { Vue, Component, Provide } from "vue-property-decorator";
import CountDown from "@/common/vui/components/CountDown/index.vue";

@Component({
  components: {
    CountDown,
  }
})
export default class extends Vue {
  @Provide() countDown: boolean = false;

  sendms() {
    if (this.countDown) {
      return;
    }
    this.countDown = true;
  }
}
```
*/
export default {
  name: 'CountDown',
  props: {
    // 倒计时类型,`count`数字倒计时，`date`日期倒计时
    type: {
      type: String,
      default: "count"
    },
    // 开始日期
    date: {
      type: String,
      default: ""
    },
    // 倒计时秒数
    wait: {
      type: Number,
      default: 60
    },
    // 开始结束倒计时状态
    startDown: {
      type: Boolean,
      default: false
    },
    // 倒计时信息展示模板
    countDownText: {
      type: String,
      default: "{count}秒后重新发送"
    },
    // 日期格式
    format: {
      type: String,
      default: "yyyy-MM-dd hh:mm:ss"
    },
    // 重置文案
    resetText: {
      type: String,
      default: "重新发送"
    }
  },
  methods: {
    clickCountDown() {
      if (!this.startDown) {
        // 点击触发事件
        this.$emit("click");
      }else{
        console.log('正在倒计时');
      }
    },
    dateDown() {
      if (this.timeId == -1) {
        let serverDate = this.date;
        const calcDate = () => {
          let date = new UDdate(serverDate);
          date.setSeconds(date.getSeconds() - 1);
          serverDate = date;
          this.buttonText = format(date, this.format);
          if (this.startDown == false) {
            clearInterval(this.timeId);
          }
        };
        this.timeId = setInterval(calcDate, 1000);
        calcDate();
      }
    },
    down() {
      this.useSlot = false;
      if (this.type == "count") {
        this.countDown();
      } else if (this.type == "dete") {
        this.dateDown();
      }
    },
    countDown() {
      if (this.timeId === -1) {
        let count = this.wait;
        this.timeId = setInterval(_ => {
          this.buttonText = this.countDownText.replace("{count}", count);
          //倒计时为0或父组件主动设置startDown为false
          if (count == 0 || this.startDown == false) {
            clearInterval(this.timeId);
            // 更新倒计时状态
            this.$emit("update:startDown", false);
            this.buttonText = this.resetText;
            this.timeId = -1;
          }
          count--;
        }, 1000);
        this.buttonText = this.countDownText.replace("{count}", count--);
      }
    }
  },
  created() {
    if (this.startDown) {
      this.down();
    }
  },
  data() {
    return {
      useSlot: true,
      buttonText: "",
      timeId: -1
    };
  },
  watch: {
    startDown() {
      if (this.startDown) {
        this.down();
      }
    }
  }
};
</script>

