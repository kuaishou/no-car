<template>
  <div  v-if="show">

    <div class="weui-mask weui-animate-fade-in"></div>
    <div class="weui-picker weui-animate-slide-up">
      <div class="weui-picker__hd">
        <span class="weui-picker__action" @click="cancel">取消</span>
        <span class="weui-picker__action" @click="sel">确定</span>
      </div>
      <div class="weui-picker__bd">
      
       
            <PickerItem   v-for="(i,k) in dataList" :key="k"  :change="change" :d="i"></PickerItem>
      
      </div>
    </div>

  </div>
</template>

<script>
import "./index.css";
import PickerItem from "../PickerItem/index.vue";
export default {
  name: "Picker",
  created() {
    console.log("dataList", this.dataList);
  },
  props: {
    show: false,
    
    dataList: {
      type:Array,
      default: []
    }
  },
  data() {
    return {
      type: "picker"

      // year: 1,
      // month: 1,
      // day: 1,
      // endTime: "",
      // startTime: "",
      // onOk(e) {
      //   console.log(e);
      // },
      // onCancel() {}
    };
  },
  computed: {
    // isR() {
    //   return this.year % 4 == 0 ? true : false;
    // },
    // startTimeArr() {
    //   if (this.startTime) {
    //     return this.startTime.split("-");
    //   } else {
    //     return [];
    //   }
    // },
    // endTimeArr() {
    //   if (this.endTime) {
    //     return this.endTime.split("-");
    //   } else {
    //     return [];
    //   }
    // }
  },
  methods: {
    sel() {
      this.show = false;
      this.onOk(this.year + "-" + this.month + "-" + this.day);
    },
    itemSel() {},
    setMonth() {
      return;
      let c2 = this.month == 2;
      let c1 = [1, 3, 5, 7, 8, 10, 12].join().indexOf(this.month);
      let m = "",
        newM = []; // 日
      if (c2) {
        if (this.isR) {
          m = [1, 29];
        } else {
          m = [1, 28];
        }
      } else if (c1 < 0) {
        m = [1, 30];
      } else {
        m = [1, 31];
      }
      let mArr = [],
        m2 = [1, 12]; //月
      if (this.endTimeArr) {
        if (this.year == +this.endTimeArr[0]) {
          m2[1] = +this.endTimeArr[1];
          if (this.month == +this.endTimeArr[1]) {
            m[1] = +this.endTimeArr[2];
          }
        }
      }
      if (this.startTimeArr) {
        if (this.year == +this.startTimeArr[0]) {
          m2[0] = +this.startTimeArr[1];
          if (this.month == +this.startTimeArr[1]) {
            m[0] = +this.startTimeArr[2];
          }
        }
      }

      for (let i = m[0]; i <= m[1]; i++) {
        newM.push(i + "日");
      }
      for (let i = m2[0]; i <= m2[1]; i++) {
        mArr.push(i + "月");
      }
      this.dataList[2] = newM;
      this.dataList[1] = mArr;
      console.log("day", this.dataList);
    },
    // 确定数值的回调
    change(val, key, type = "") {
      if (type == "day") {
        this.day = val.match(/\d*/g)[0];
      } else if (type == "year") {
        this.year = val.match(/\d*/g)[0];
        this.setMonth();
      } else if (type == "month") {
        this.month = val.match(/\d*/g)[0];
        this.setMonth();
      }
    },
    cancel() {
      this.show = false;
      this.onCancel();
    }
  },
  mounted() {
    // this.setMonth();
  },
  components: {
    PickerItem
  }
};
</script>