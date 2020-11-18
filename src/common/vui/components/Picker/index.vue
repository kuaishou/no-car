<template>
  <div>

    <div class="weui-mask weui-animate-fade-in"></div>
    <div class="weui-picker weui-animate-slide-up">
      <div class="weui-picker__hd">
        <span @click="cancel" class="weui-picker__action" >取消</span>
        <span @click="done"  class="weui-picker__action" >确定</span>
      </div>
      <div  ref="picker__bd" class="weui-picker__bd">
       
      </div>
    </div>

  </div>
</template>
<script>
// import PickerItem from "../PickerItem/Index.vue";
import Scroller from "../Scroller";
export default {
  components: {
    // PickerItem
  },
  props: {
    show:false,
    data: Array
  },
  data() {
    return {
      values:[],
      pickers: []
    };
  },
  watch: {
    
  },
  methods: {
    cancel(){
      this.$emit('cancel');
    },
    done(){
      let arr = [];
      this.pickers.forEach((v,i)=>{
        arr.push({
          value:v.getValue(),
          name:v.getName(),
        })
      })
    //  console.log('88888',this.pickers[0].getValue())
      this.$emit('done', arr);
    },
    //第一列
    setColumn0() {
      this.pickers[0].destroy();
    },
    setColumn1() {
      console.log("setColumn1", this.data[1]);
      this.pickers[2].destroy();
      this.pickers[1].destroy();
      this.pickers[1] = this.renderScroller(this.data[1], val => {
        this.$emit("change", 1, val);
        this.setColumn2();
        this.values[1] = val;
      });
      this.$emit("change", 1, this.data[1][0].value);
      this.setColumn2();
    },
    setColumn2() {
      // debugger;
      this.pickers[2].destroy();
      this.pickers[2] = this.renderScroller(this.data[2], () => {});
    },
    setColumn3() {
      this.pickers[3].destroy();
    },
    renderScroller(d, fn) {
      return new Scroller(this.$refs.picker__bd, {
        onSelect: fn,
       
        data: d
      });
    }
  },
  // mounted() {
  created() {
   
    this.$nextTick(() => {
     
      this.data.forEach((d, i) => {
        // this.$watch(this.data[i], () => {
        //   console.log('watch')
        // })
        this.pickers[i] = this.renderScroller(d, val => {
        //  console.log(this.data);
        ///  console.log(this.data.length);
        //  console.log("setColumn", i + 1);
          this.$emit("change", i, val);
          this["setColumn" + (i + 1)]();

          // for (let k = i + 1; k < this.data.length; k++) {
          //   this["setColumn" + k]();
          // }
          // this.$emit("change", i, val);
          //  this.pickers[i + 1].destroy();
          // this.pickers[i + 1] = this.renderScroller(this.data[i+1], val => {});
          // console.log("change onSelect", i, val);
        });
       
      });
      // new Scroller(this.$refs.div1, {
      //    onSelect:function(val){
      //    console.log(val)
      //  },
      //   data: [{name:"namess1",value:'ss1'},{name:"namess2",value:'ss2'}]
      // });
    });
  }
};
</script>
<style>
.weui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.weui-animate-fade-in {
  -webkit-animation: fadeIn ease .3s forwards;
  animation: fadeIn ease .3s forwards;
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
} 
.weui-animate-fade-out {
  -webkit-animation: fadeOut ease .3s forwards;
  animation: fadeOut ease .3s forwards;
}
.weui-picker {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 5000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform .3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
.weui-picker__hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 22.5px 37.5px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 42.5px;
}
.weui-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 2.5px;
  border-bottom: 2.5px solid #E5E5E5;
  color: #E5E5E5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-picker__action {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #1AAD19;
}
.weui-picker__action:first-child {
  text-align: left;
  color: #888;
}
.weui-picker__action:last-child {
  text-align: right;
}
.weui-picker__bd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  background-color: #fff;
  height: 595px;
  overflow: hidden;
}
.weui-picker__group {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  position: relative;
  height: 100%;
}
.weui-picker__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 3;
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
  background-position: top, bottom;
  background-size: 100% 255px;
  background-repeat: no-repeat;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.weui-picker__indicator {
  width: 100%;
  height: 85px;
  position: absolute;
  left: 0;
  top: 255px;
  z-index: 3;
}
.weui-picker__indicator:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2.5px;
  border-top: 2.5px solid #E5E5E5;
  color: #E5E5E5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-picker__indicator:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 2.5px;
  border-bottom: 2.5px solid #E5E5E5;
  color: #E5E5E5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-picker__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.weui-picker__item {
  padding: 0;
  height: 85px;
  line-height: 85px;
  text-align: center;
  color: #000000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.weui-picker__item_disabled {
  color: #808080;
}
@-webkit-keyframes slideUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.weui-animate-slide-up {
  -webkit-animation: slideUp ease .3s forwards;
  animation: slideUp ease .3s forwards;
}
@-webkit-keyframes slideDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}
@keyframes slideDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}
</style>

 