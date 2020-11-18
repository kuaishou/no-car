<template>
  <div v-if="gtProduct!=='bind'" id="captcha-box" class="captcha-box" :class="{'loaded': !isLoading}">
    <div v-if="isLoading">正在加载验证码...</div>
    <!--<slot name="child-node"></slot>-->
    <!--van-loading v-if="isLoading" type="spinner" size="24"/-->
  </div>
</template>

<script>
import { geetestSign } from "../../../api";
import Geetest from "../../../geetestModule";
// import Loading from "vant/lib/loading";
// import "vant/lib/loading/style";
export default {
  name: "Geetest",
  components: {
    // [Loading.name]: Loading
  },
  created() {
    this.checkSignData();
  },
  data() {
    return {
      captchaBtn: "#captcha-box",
      isLoading: true,
      gtSignData:{},
      captchaObj:null
    };
  },
  props: {
    verifyFlag:{
      type: Boolean,
      required: false,
    },
    gtCode: {
      type: String,
      required: true,
    },
    gtProduct:{
      type:String,
      required:false
    }
  },
  methods: {
    checkSignData() {
      let that=this;
      geetestSign({
        code:this.gtCode
      }).then(res=>{
        that.gtSignData=res.data;
        that.init();
      })
      
    },
    init(){
      let signData=this.gtSignData;
      let that=this;
    
      Geetest.initGeetest(
        {
          width: "100%",
          gt: signData.gt, //验证 id，极验后台申请得到
          challenge: signData.challenge, //验证流水号，后服务端 SDK 向极验服务器申请得到
          new_captcha: signData.new_captcha,
          product:this.gtProduct ? this.gtProduct : "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
          offline: !signData.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
          // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
        },captchaObj => {
          captchaObj.appendTo(that.captchaBtn);
          captchaObj.onReady(() => {
              that.isLoading = false;
              that.$emit("geetestReady", captchaObj);
              if(that.verifyFlag){
                captchaObj.verify();
              }
            }).onSuccess(() => {
              let result = captchaObj.getValidate();
              that.$emit("geetestSuccess", result);

              /*               
              // ajax 伪代码，进行二次验证
              ajax(
                "/api/gt-validate",
                {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode

                  // 其他服务端需要的数据，比如登录时的用户名和密码
                },
                function(data) {
                  // 根据服务端二次验证的结果进行跳转等操作
                }
              ); */
            })
            .onError(function() {
              //your code
            });
        }
      );
    },
    verifyGeetest(){
      let that=this;
      geetestSign({
        code:this.gtCode
      }).then(res=>{
        that.gtSignData=res.data;
        that.init();
      })
     
    }
  }
};
</script>

<style lang="less">
.captcha-box {
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  min-width: 320px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%);
  &.loaded{
    border: none;
    background: none;
  }
}
.geetest_holder.geetest_wind .geetest_logo{
  display: none!important;
}
.geetest_holder.geetest_wind .geetest_success_logo{
  display: none!important;
}
.geetest_holder.geetest_mobile.geetest_ant .geetest_panel .geetest_copyright{
  display: none!important;
}
.geetest_holder.geetest_mobile.geetest_ant .geetest_panel a.geetest_feedback{
  display: none!important;
}
</style>

