<template>
  <div class="key-container" v-show="show">
    <div class="key-mask" :class="{show: show2}" @click="hideKB"></div>
    <div id="keyboard" :class="{show: show2}" @click.stop="">
      <div class="bg-value">
        <span class="clear" @click="licenseKB = ''">清空</span>
        {{this.licenseKB||val}}
        <span class="close" @click="hideKB">关闭</span>
      </div>
      <div id="key-province" class="clearfix" v-show="keyType == 'province'">
        <div v-for="(item,index) in keyProvince" :key="index" class="kb-key"
            @click="switch2liscense"
            :class="{delete: item =='delete', select: item =='select', confirm: item =='confirm'}">
          <span class="kb-span" v-if="item ==='delete'" @click="del"></span>
          <span class="kb-span"  v-else-if="item ==='select'" @click="keyType = 'license'">ABC</span>
          <span class="kb-span"  v-else-if="item ==='confirm'" @click="hideKB">下一步</span>
          <span class="kb-span kb-province"  v-else @click="clickKB(item)">{{item}}</span>
        </div>
      </div>
      <div id="key-licensePlate" class="clearfix" v-show="keyType == 'license'">
        <div v-for="(item,index) in keyLicensePlate" :key="index" class="kb-key" :class="{delete: item =='delete', select: item =='select', confirm: item =='confirm'}">
          <span class="kb-span"  v-if="item ==='delete'" @click="del"></span>
          <span class="kb-span"  v-else-if="item ==='select'" @click="keyType = 'province'">省份</span>
          <span class="kb-span"  v-else-if="item ==='confirm'" @click="hideKB">下一步</span>
          <span class="kb-span"  v-else @click="clickKB(item)">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'KeyBoard',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      val: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show2: false,
        licenseKB: '',
        keyType: 'province',
        "keyLicensePlate": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "delete", "select", "Z", "X", "C", "V", "B", "N", "M", "confirm"],//车牌字符
        "keyProvince": ["粤", "湘", "闽", "桂", "沪", "京", "苏", "浙", "川", "辽", "鲁", "渝", "云", "陕", "赣", "晋", "津", "皖", "鄂", "豫", "冀", "黑", "吉", "贵", "蒙", "琼", "甘", "新", "delete", "select", "藏", "青", "宁", "临","挂","学", "confirm"],//车牌省份
      };
    },
    methods: {
      clickKB(item) {
        this.licenseKB = this.val;
        this.licenseKB += item;
        this.licenseKB = this.licenseKB.substring(0, 8);
      },
      del() {
        this.licenseKB = this.val.substring(0, (this.val.length - 1));
      },
      switch2liscense(e){
        let targetEl = e.srcElement || e.target;
        if(targetEl.className.indexOf('kb-province') !== -1){
          this.keyType = 'license';
        }
      },
      hideKB() {
        this.show2 = false
        setTimeout(() => {
          this.$emit('hide')
        }, 200)
      }
    },
    watch: {
      licenseKB(val) {
        this.$emit('setVal', val)
      },
      show(v) {
        if (v) {
          setTimeout(() => this.show2 = true, 0) //防止show2动画效果和show冲突
        }
      }
    },
    created() {
      this.licenseKB = this.val
    },
    updated() {
      this.licenseKB = this.val
    }
  };
</script>

<style scoped lang="less">
  .key-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    .key-mask {
      display: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: rgba(0, 0, 0, .3);
      opacity: 0;
      transition: all .2s ease;
      &.show {
        opacity: 1;
      }
    }
  }
  .bg-value{
    position: relative;
    margin-top: .2rem;
    background-color: #e9e9e9;
    width: 100%;
    height: .6rem;
    text-align: center;
    font-size: .32rem;
    line-height: .6rem;
    .clear {
      position: absolute;
      left: 30px;
      top: 0;
      height: 100%;
    }
    .close {
      position: absolute;
      right: 30px;
      top: 0;
      height: 100%;
    }
  }
  #keyboard{
    background-color: #e9e9e9;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding-bottom: 0.2rem;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 3;
    transform: translateY(100%);
    transition: all .2s ease;
    &.show {
      transform: translateY(0%);
    }
  }
  .kb-key{
    span{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    background-color: #fcfcfc;
    float: left;
    width: 8.6%;
    height: 0.8rem;
    margin-left: 0.7%;
    margin-right: 0.64%;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
    line-height: normal;
    box-shadow: 0 0.02rem 0.02rem #8c857c;
    font-size: 0.32rem;
  }
  #key-province{
    .kb-key{
      &.confirm{
        width: 18%;
        background-color: #cdcdcb;
      }
      &.select{
        width: 18%;
        background-color: #cdcdcb;
      }
      &.delete{
        width: 17.2%;
        margin-left: 1.92%;
        background: url('./img/icon-delete.png') no-repeat center #cdcdcb;
        background-size: 50% 40%;
      }
    }
  }
  #key-licensePlate{
    .kb-key{
      &.confirm{
        width: 13.54%;
        background-color: #cdcdcb;
      }
      &.select{
        width: 13.54%;
        background-color: #cdcdcb;
      }
      &.delete{
        width: 8.6%;
        background: url('./img/icon-delete.png') no-repeat center #cdcdcb;
        background-size: 50% 40%;
      }
    }
  }
</style>
