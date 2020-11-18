<template>
  <div class="weui-picker__group" >
      <div class="weui-picker__indicator"></div>
    <div class="weui-picker__mask" @touchstart="start" @touchend="end" @touchmove="move"></div>
      <div  class="weui-picker__content" :style="domStyle" >

        <div v-for="(i,k) in d" :key="k" class="weui-picker__item">{{i}}</div>
      </div>
 
  </div>
</template>

<script>
import { add, sub, mul, div, rem } from "./util";
export default {
  data() {
    return {
      startY: "", //touch start Y
      endY: "", //touch end Y
      lastPoint: [],
      value: "",
      dY: 0,
      itemKey: 0, //第几个值
      changeY: "", //sY - eY
      domStyle: { transform: "translate3d(0,0,0)" }
    };
  },
  computed: {
    itemHeight() {
      //  return 100;
      // console.log("1122", document.querySelector(".weui-picker__item"));
      let wpi = document.querySelector(".weui-picker__item");
      if (!wpi) {
        console.log("wpi", wpi);
        return 0;
      }
      let h = (+window.getComputedStyle(wpi).height.replace("px", "")).toFixed(
        2
      );
      console.log("computed", h);
      return h;
    },
    //选项长度
    itemLen() {
      return this.d.length;
    }
  },
  mounted() {
    //初始化，定位第一个
    console.log("mounted", this.val);
    // this.val = "0";
    if (this.val) {
      this.moveTo(this.val);
    } else {
      this.$nextTick(() => {
        this.dY = mul(this.itemHeight, 4);
        console.log("dy", this.dY, this.itemHeight);
        this.domStyle = this.style = {
          transform: "translate3d(0px, " + this.dY + "px, 0px)"
        };
      });

      // this.domStyle = this.style = {
      //   transform: "translate3d(0px, " + this.dY + "px, 0px)"
      // };
    }
  },
  methods: {
    scroll(y, t) {
      //根据选项高度判断定在哪个位置
      //  y = y -y%this.itemHeight +(y%this.itemHeight>this.itemHeight/2?this.itemHeight:0)
      let cTop =
        rem(y, this.itemHeight) > div(this.itemHeight, 2) ? this.itemHeight : 0;
      console.log("cTop", y, cTop,this.itemHeight);
      console.log('yyy1',rem(y, this.itemHeight))
      console.log('yyy2',sub(y, rem(y, this.itemHeight)))
      y = add(sub(y, rem(y, this.itemHeight)), cTop);
      console.log("y", y);
      //最大最小情况的判断
      if (y > mul(this.itemHeight, 4)) {
        y = mul(this.itemHeight, 4);
      }
      let sT = mul(5 - this.itemLen, this.itemHeight);
      if (y < sT) {
        y = sT;
      }
      console.log("scroll", y);
      this.dY = y; //记录现在的位置
      this.itemKey = div(sub(mul(this.itemHeight, 4), y), this.itemHeight); //第几个值
      console.log(t);
      this.domStyle = this.style = {
        transform: "translate3d(0px, " + y + "px, 0px)",
        transition: "all " + t + "s cubic-bezier(0.1, 0.85, 0.25, 1) 0s"
      };
      //停止后的回调
      this.change(this.d[this.itemKey], this.itemKey, this.selType);
    },
    start(e) {
      this.startY = e.touches[0].pageY;
      this.domStyle = this.style = {
        transform: "translate3d(0px, " + this.dY + "px, 0px)",
        transition: "none"
      };
    },
    end(e) {
      this.endY = e.changedTouches[0].pageY;
      //非线性衰减
      let t = parseInt(Math.sqrt(Math.abs(this.endY - this.startY))) / 10;
      console.log("end", t);
      console.log("end", this.dY, this.endY, this.startY);
      this.scroll(this.dY + this.endY - this.startY, t);
    },
    move(e) {
      e.preventDefault();
      console.log("moves", this.startY);
      let dY = e.touches[0].pageY - this.startY; //差值
      //console.log("move", dY, this.dY);
      //反映差值
      this.domStyle = {
        transform: "translate3d(0px, " + (dY + this.dY) + "px, 0px)"
      };
    },
    moveTo(val) {
      if (this.selType == "month" || this.selType == "day") {
        //  this.itemKey = +this.val -1;
        this.itemKey = 0;
        this.d.map((v, k) => {
          // console.log(v)
          if (v.match(/\d*/g)[0] == val) {
            this.itemKey = k;
          }
        });
      } else if (this.selType == "year") {
        this.itemKey = 0;
        this.d.map((v, k) => {
          if (v.match(/\d*/g)[0] == val) {
            this.itemKey = k;
          }
        });
      } else {
        // 日期外的 如果后面需要做成其他类型
        this.itemKey = 0;
        console.log("va", val);
        this.d.map((v, k) => {
          if (v == val) {
            this.itemKey = k;
          }
        });
      }
      this.dY = mul(4 - this.itemKey, this.itemHeight);
      this.scroll(this.dY, 0);
    }
  },
  watch: {
    d() {
      if (this.itemKey + 1 > this.d.length) {
        this.itemKey = this.d.length;

        this.dY = mul(4 - this.itemKey, this.itemHeight);
        console.log("ddd", this.dY);
        this.scroll(this.dY, 0.4);
      }
      if (this.selType == "month" || this.selType == "day") {
        this.d.map((v, k) => {
          if (v.match(/\d*/g)[0] == this.val) {
            this.itemKey = k;
          }
        });
        this.dY = mul(4 - this.itemKey, this.itemHeight);
        this.scroll(this.dY, 0.4);
        console.log(this.itemKey, this.val);
      }
    }
  },
  props: {
    change: {},
    val: {},
    selType: {},
    d: {
      default: function() {
        return [];
      }
    }
  }
};
</script>