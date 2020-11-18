<template>

    <div  class="key-component">
             
          <input
          ref="labelDom"
           v-if="mode=='component'" 
          :placeholder='placeholder'
          class="key-label"
          v-model="value" readonly @click="showKeyboard" >
         
          <div v-show="showKey">

         
           <div v-if="isShowDalogInput" class="keyboard-mask"></div>
           <section   v-if="isShowDalogInput" class="keyboard-dialog">
             <header class="keyboard-dialog-header">{{title}}</header>
             <div class="keyboard-dialog-body">
                 <div class="keyboard-string">{{inputStr}}</div>
                 <!-- <div class="keyboard-tips">666</div> -->
             </div>
         </section>
          <section
          ref="keyboardWarpDom"
           class="keyboard-warp">
                 <span v-show="inputingText" class="inputing-str">{{inputingText}}</span>
                 <header class="keyboard-header">
                     <span @click="cancel" class="keyboard-cancel">取消</span>
                     <span @click="done" class="keyboard-done">完成</span>
                     
                 </header>
                 <div class="keyboard-body">
                     <div
                     class="keyboard-row"
                      v-for="(v,i) in keyboard.data" :key="i">
                           <span 
                         
                              class="keyboard-str"
                              v-for="(vv,ii) in v"
                              @click="clickKeyboard(vv)"
                             :key="ii"
                             :class="[addClass(vv),action==vv?'key-action':'']"
                           >{{textDisplay(vv)}}</span>
                     </div>
                      
                 </div>
          </section>
           
           </div>
    </div>
</template>
<script>
// @vuese
// @group 4 业务组件
/*
组件引入
```typescript
import { Vue, Component, Provide } from "vue-property-decorator";
import Keyboard from "@/common/vui/components/Keyboard/index.vue";

@Component({
  components: {
    Keyboard
  }
})
export default class extends Vue {
  @Provide() licenseNo: String = "";
}
```
页面模板
```html
<keyboard v-model="licenseNo" placeholder="请输入车牌" mode="component"/>
```
*/
export default {
  name: 'Keyboard',
  props: {
    //使用模式 component 组件方式
    mode: String,
    //弹出录入框label
    title: String,
    //是否显示弹出录入框
    isShowDalogInput: {
      type: Boolean,
      default: false
    },
    show: Boolean,
    //车牌键盘省、字符自动切换
    autoSwitch: {
      type: Boolean,
      default: true
    },
    //placeholder提示
    placeholder: {
      type: String,
      default: ""
    },
    //表单值，使用v-model绑定
    value: String,
    //最大长度
    maxlength: {
      type: Number,
      default: 8
    },
    //初始键盘类型 province：省 text：字符
    keyboardType: {
      type: String,
      default: "province"
      //   default: "text"
    },
    //案件文字配置
    textConfig: {
      type: Object,
      default: function() {
        return {
          del:"删除",
          textKeyboard: "ABC",
          provinceKeyboard: "省份",
          next: "下一步"
        };
      }
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.showKeyboard();
      } else {
        this.showKey = false;
      }
      //
    }
  },
  methods: {
    cancel() {
      if (this.mode == "component") {
        this.showKey = false;
      } else {
        this.$emit("update:show", false);
      }
      this.positionDom.remove();
    },
    done() {
      if (this.mode == "component") {
        this.showKey = false;
      } else {
        this.$emit("update:show", false);
      }
      this.$emit("input", this.inputStr);
      this.positionDom.remove();
    },
    showKeyboard() {
      this.inputStr = this.value || "";
      this.showKey = true;
      this[this.keyboardType + "KeyboardRender"]();
      this.positionDom = document.createElement("div");

      document.body.appendChild(this.positionDom);
      this.$nextTick(() => {
        let bodyH = document.body.offsetHeight;
        //键盘高度
        let keyboardHeight = this.$refs.keyboardWarpDom.offsetHeight;

        this.positionDom.style.height = keyboardHeight + "px";
        // 显示车牌高度
        // let sH = this.$refs.labelDom.offsetTop - keyboardHeight;
        //  显示车牌标签的高度
        var plateLabelHeight = this.$refs.labelDom.offsetHeight; //输入框高度
        // console.log("kWH=", keyboardHeight);
        // console.log("ssss=", sH);
        // console.log(this.$refs.labelDom);
        // window.pp = this.$refs.labelDom;
        // plateLabel
        let plateLabelOffsetTop = this.$refs.labelDom.offsetTop;
        //滚动的距离
        let scrollTop = document.documentElement.scrollTop;
        // 键盘距离窗口距离
        let keyboardTop = this.$refs.keyboardWarpDom.offsetTop;
        // console.log("窗口高度=", bodyH);
        // console.log("输入框距离顶部距离", plateLabelOffsetTop);
        // console.log("窗口滚动距离", scrollTop);
        // console.log("键盘距离窗口", keyboardTop);
        let plateLabelTop = plateLabelOffsetTop - scrollTop;
        //              180
        // console.log("输入框距离可视=", labOT);
        if (plateLabelTop > keyboardTop) {
          // console.log("需要滚动", labOT - keyBOFT);
          // console.log(scrollTop, labOT, keyBOFT);
          // console.log("滚动=", labOT - keyBOFT + elemHeight + scrollTop);
          window.scrollTo(
            0,
            plateLabelTop - keyboardTop + plateLabelHeight + scrollTop
          );
        } else {
          console.log("不需要滚动");
        }
      });
    },
    addClass(value) {
      // value.p='sss'
      return this.operationBtn.indexOf(value) > -1 ? `key-${value}` : "";
    },
    clickKeyboard(str) {
      // this.$set(this.action, str, "key-action");
      this.action = str;
      setTimeout(() => {
        // this.$set(this.action, str, "");
        this.action = "";
      }, 400);

      let currentStr = this.inputStr;
      //删除建
      if (str == "del") {
        this.inputStr = currentStr.substring(0, currentStr.length - 1);
        if (
          this.autoSwitch &&
          this.inputStr.length == 0 &&
          this.keyboardType == "province" &&
          this.currentKeyboardType == "text"
        ) {
          this.provinceKeyboardRender();
        }
        this.changeText();
        return false;
      }
      // 判断长度
      if (this.maxlength == currentStr.length) {
        return false;
      }
      console.log("**********");

      if (str == "textKeyboard") {
        this.textKeyboardRender();
        return false;
      }
      if (str == "provinceKeyboard") {
        this.provinceKeyboardRender();
        return false;
      }

      if (this.autoSwitch && "province" == this.currentKeyboardType) {
        this.textKeyboardRender();
        // if(this.inputStr.length!=0){
        // this.inputStr = str;
        this.changeText(str);
        return false;
        // }
      } else if (str == "textKeyboard") {
        this.textKeyboardRender();
      } else if (str == "provinceKeyboard") {
        this.provinceKeyboardRender();
      }
      if (this.isShowDalogInput) {
        this.inputingText = str;
        setTimeout(_ => {
          this.inputingText = "";
        }, 1000);
      }
      // this.inputStr += str;

      this.changeText(this.inputStr + str);
      // this.$emit("input", this.inputStr);
    },
    changeText(str) {
      if (str) {
        this.inputStr = str;
      }
      this.$emit("input", this.inputStr);
    },
    //省份
    provinceKeyboardRender() {
      console.log("切换省份键盘");
      this.currentKeyboardType = "province";
      //   this.keyboardData = this.province;
      //   this.$set(this,'keyboardData',this.province)
      this.keyboard.data = this.province;
      //   console.log( this.keyboardData)
    },
    //文本
    textKeyboardRender() {
      console.log("切换文本键盘");
      this.currentKeyboardType = "text";
      this.keyboard.data = this.texts;
    },
    textDisplay(value) {
      if (this.textConfig[value]) {
        return this.textConfig[value];
      }
      return value;
    }
  },
  //   computed: {
  //     keyboardStrData() {
  //       return this.keyboardData;
  //     }
  //   },
  created() {
    //当前键盘类型
    this.currentKeyboardType = this.keyboardType;
  },
  data() {
    return {
      positionDom: null,
      showKey: false,
      action: "",
      inputingText: "",
      keyboard: {
        data: []
      },
      currentKeyboardType: "",
      operationBtn: [
        "provinceKeyboard",
        "textKeyboard",
        "textKeyboard",
        "next",
        "del"
      ],
      inputStr: "",
      numbers: [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["x", 0, "*"]],
      texts: [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "del"],
        ["provinceKeyboard", "Z", "X", "C", "V", "B", "N", "M"]
      ],
      province: [
        ["粤", "湘", "闽", "桂", "沪", "京", "苏", "浙", "川", "辽"],
        ["鲁", "渝", "云", "陕", "赣", "晋", "津", "皖", "鄂", "豫"],
        ["冀", "黑", "吉", "贵", "蒙", "琼", "甘", "新", "警", "del"],
        ["textKeyboard", "藏", "青", "宁", "临", "挂", "学", "next"]
      ]
    };
  }
};
</script>

<style scoped lang="less">
.key-component {
  text-align: left;
  .key-label {
    width: 100%;
  }
}
.inputing-str {
  background: white;
  border-radius: 15px;
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  top: -250px;
  margin-left: -75px;
  left: 50%;
  font-size: 60px; /*px*/
}
.keyboard-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.keyboard-dialog {
  background: white;
  width: 80%;
  //   height: 300px;
  border-radius: 10px;
  position: fixed;
  z-index: 10;
  left: 10%;
  top: 200px;
  .keyboard-dialog-body {
  }
  // right: 0;
  .keyboard-dialog-header {
    text-align: center;
    line-height: 150px;
    height: 150px;
  }
  .keyboard-string {
    position: relative;
    background: #efefef;
    // border: 2px solid #ccc;
    height: 100px;
    line-height: 100px;
    padding-left: 20px;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 10px;
    margin-bottom: 80px;

    &::after {
      content: " ";
      width: 200%;
      height: 200%;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #aad7f1; /*no*/
      /*no*/
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      box-sizing: border-box;
    }
  }
}
.keyboard-warp {
  background: #d1d5da;
  /* height: 200px; */
  width: 100%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
}
.keyboard-header {
  height: 120px;
  line-height: 120px;
  background: #f4f4f6;
  .keyboard-cancel {
    margin-left: 20px;
  }
  .keyboard-done {
    position: absolute;
    right: 0;
    margin-right: 20px;
  }
}
.keyboard-body {
  margin: 20px 10px 20px;
}
.keyboard-body .keyboard-row {
  display: flex;
  flex-wrap: wrap;

  /* flex-flow: column; */
}
.keyboard-body {
  .keyboard-str {
    flex: 1;
    /* width: 33.333333%; */
    box-sizing: border-box;
    background: white;
    margin: 10px;
    padding: 30px 5px;
    border-radius: 10px;
    text-align: center;
    height: 120px;
    box-shadow: 0 10px 10px #8c857c;
  }
  .key-action {
    background: #c0c0bf;
  }
}
.keyboard-body {
  .key-del {
    width: 15%;
    background-color: rgb(235, 236, 230);
    flex: none;
  }
  .key-next,
  .key-provinceKeyboard,
  .key-textKeyboard {
    background-color: rgb(235, 236, 230);
    width: 20%;
    flex: none;
  }
}
</style>

