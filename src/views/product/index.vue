<template>
  <div class="insure" ref="detailWrap">
    <div class="top">
      <img src="../../assets/banner.jpg" alt="头部图片" />
      <div class="top-insure">
        <p class="slogan">一张保单 保全家无忧</p>
        <p class="slogan-tip">可保障本人、配偶及子女</p>
        <p class="slogan-money">
          首月
          <span>3元</span>
        </p>
        <p class="button" @click="goFrom">立即投保</p>
        <van-row class="icon-tip">
          <van-col span="8">
            <img src="../../assets/icon1.png" alt="icon" />不限制社保
          </van-col>
          <van-col span="8">
            <img src="../../assets/icon2.png" alt="icon" />全家保障
          </van-col>
          <van-col span="8">
            <img src="../../assets/icon3.png" alt="icon" />最多保五人
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 保险责任列表模块 -->
    <div class="guarantee">
      <ProductList @getInsurData="getInsurData()" :planInfo="planInfo" :requestData="requestData" />
      <ul>
        <li class="guarantee-word" v-for="(item,i) in itemList" :key="i+'d'">
          <span>{{item.LABEL}}</span>
          <input v-if="item.HTML_TYPE=='INPUT'" type="text" />
          <select
            @change="getInsurData()"
            class="offer-select"
            v-model="requestData[item.CODE]"
            v-if="item.HTML_TYPE=='SELECT'"
          >
            <option
              v-for="(value,name) in JSON.parse(item.VALUE_LIMITS)"
              :selected="true"
              :key="name"
              :value="name"
            >{{value}}</option>
          </select>
        </li>
      </ul>
    </div>

    <div class="insure-from">
      <van-tabs v-model="tabActive" scrollspy sticky>
        <van-tab class="tab-details" title="产品详情">
          <!-- 后期产品详情可配置 -->
          <ProudctDetails />
        </van-tab>
        <van-tab class="tab-details" title="常见问题">
          <!-- 常见问题 -->
          <Question />
        </van-tab>
        <van-tab class="tab-details" title="我要投保">
          <!-- 投保保人信息表单 -->
          <div class="Information" ref="Information">
            <div class="product-detail-card__title">
              <h2>本人信息（投保人）</h2>
            </div>

            <van-form
              validate-first
              scroll-to-error
              show-error
              :show-error-message="false"
              @failed="onFailed"
              @submit="onSubmit"
            >
              <!-- 投保人姓名 -->
              <van-field
                v-model="formData['holder|holderName||']"
                label="投保人姓名"
                placeholder="请输入投保人姓名"
                :rules="[{ validator,name:'china', message: '请填写中文姓名' }]"
              />

              <van-field
                v-model="formData['holder|idcartNo||']"
                label="身份证号码"
                placeholder="请输入身份证号码"
                :rules="[{ validator , name:'idCard', message: '请输入正确的身份证号码' }]"
              />
              <van-field
                v-model="formData['holder|mobile||']"
                label="手机号码"
                placeholder="请输入手机号码"
                :rules="[{validator , name:'mobile', message: '请输入正确的手机号码' }]"
              />

              <div class="product-detail-card__title">
                <h2>为谁投保（被保人，最多五人）</h2>
              </div>
              <div class="product-detail-checkbox__group">
                <span
                  :class="['product-detail-checkbox__item',{'active': formData.relation_self === '601005'}]"
                  @click="switchPayment('601005')"
                >本人</span>
                <span
                  :class="['product-detail-checkbox__item',{'active': formData['insured|releation||'] === '11'}]"
                  @click="switchPayment('11')"
                >配偶</span>
                <span
                  :class="['product-detail-checkbox__item',{'active': formData['insured|releation||'] === '2'}]"
                  @click="switchPayment('2')"
                >子女</span>
                <span
                  :class="['product-detail-checkbox__item',{'active': formData['insured|releation||'] === '3'}]"
                  @click="switchPayment('3')"
                >兄弟姐妹</span>
              </div>
              <div v-show="formData.relation_self !== '601005'" class="insurePeople">
                <!-- 被保人姓名 -->
                <van-field
                  v-model="formData['insured|insuredName||']"
                  label="被保人姓名"
                  placeholder="请输入投保人姓名"
                  :rules="[{ validator,name:'china', message: '请填写投保人姓名' }]"
                />

                <van-field
                  v-model="formData['insured|idcartNo||']"
                  label="身份证号码"
                  placeholder="请输入身份证号码"
                  :rules="[{ validator , name:'idCard', message: '请输入正确的身份证号码' }]"
                />
                <van-field
                  v-model="formData['insured|mobile||']"
                  label="手机号码"
                  placeholder="请输入手机号码"
                  :rules="[{validator , name:'mobile', message: '请输入正确的手机号码' }]"
                />
              </div>

              <div class="product-detail-card__title">
                <h2>保险起止期</h2>
              </div>
              <div class="term">
                <van-cell
                  is-link
                  title="保险起期"
                  :value="time.insrncBgnTm"
                  @click="ckilkBgnTm('insrncBgnTm')"
                />
                <van-cell is-link title="保险止期" :value="time.insrncEndTm" @click="ckilkBgnTm('insrncEndTm')" />
            
                <van-datetime-picker  v-show="time.show"
                  type="date"
                  title="选择年月日"
                  @confirm="onConfirm"
                  @cancel="time.show = false"
                  :min-date="time.minDate"
                  :max-date="time.maxDate"
                />
              </div>

              <div class="product-detail-checkbox-switch">
                <p>次年自动续保</p>
                <van-switch
                  v-model="checked"
                  @click="autoRenewal()"
                  size="24px"
                  active-color="#07c160"
                  inactive-color="#ee0a24"
                />
              </div>

              <div class="goMoney">
                <div class="price">
                  <p v-show="formData.actualPremium">{{formData.actualPremium}}</p>
                  <p v-show="initialPremium" class="frist-price">首月{{initialPremium}}元</p>
                  <p v-show="minPremium" class="other-price">次月起{{minPremium}}元起</p>
                </div>
                <van-button class="submit-button" native-type="submit">立即投保</van-button>
              </div>
            </van-form>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- <div class="bottom-box">
        <van-submit-bar :price="3050" native-type="submit" button-text="提交订单" @submit="onSubmit" />
    </div>-->
  </div>
</template>

<script lang="ts">
import ProductList from "@/views/insure/Guarantee/Guarantee.vue"; //产品类型tab
import ProudctDetails from "@/views/insure/ProudctDetails/ProudctDetails.vue"; //产品详情
import Question from "@/views/insure/Question/Question.vue"; //常见问题
//import Information from "@/views/insure/Information/Information.vue"; //我要投保--投被保人的表单信息
import { Toast } from "vant";
import axios from "axios";
import axiosurl from "@/api";
import qs from "qs";
export default {
  name: "insure",
  components: {
    ProductList,
    ProudctDetails,
    Question
  },
  data(): any {
    return {
      time: {
        insrncBgnTm: "2020-05-23 00:00:00",
        insrncEndTm: "2021-05-22 23:59:59",
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2050, 0, 31),
        show: false,
        clickBoxFlag:""
      },

      formData: {
        "holder|holderName||": "",
        "holder|country||": "1010090156",
        "holder|countryName||": "中国",
        "holder|idcartType||": "01",
        "holder|idcartNo||": "",
        "holder|identifyLongValid||": "1",
        "holder|sex||": "M",
        "holder|bornDate||": "1990-09-24",
        "holder|mobile||": "13510215572",
        "holder|businessName||": "01|一般职业",
        "holder|provinceName||": "广东省",
        "holder|provinceCode||": "440000",
        "holder|cityName||": "深圳市",
        "holder|cityCode||": "440300",
        "holder|areaName||": "福田区",
        "holder|areaCode||": "440304",
        "holder|addrsName||": "广东省 深圳市 福田区",
        "holder|detailedAddr||": "福田区中心区深圳中国人寿大厦北(福华路)",
        relation_self: "601005",
        "insured|releation||": "1",
        "insured|insuredName||": "详细",
        "insured|country||": "1010090156",
        "insured|countryName||": "中国",
        "insured|idcartType||": "01",
        "insured|idcartNo||": "411024199009240772",
        "insured|identifyLongValid||": "1",
        "insured|sex||": "M",
        "insured|bornDate||": "1990-09-24",
        "insured|mobile||": "18575699825",
        "insured|businessName||": "01|一般职业",
        "insured|provinceName||": "广东省",
        "insured|provinceCode||": "440000",
        "insured|cityName||": "深圳市",
        "insured|cityCode||": "440300",
        "insured|areaName||": "南山区",
        "insured|areaCode||": "440305",
        "insured|addrsName||": "广东省 深圳市 南山区",
        "insured|detailedAddr||": "大多数的",
        "ben|benName||": "法定",
        insrncBgnTm: "2020-05-23 00:00:00",
        insrncEndTm: "2021-05-22 23:59:59",
        "policy_field|autoRenewal||": "1",
        productId: this.$route.query.productId,
        isMulti: "1",
        salesCode: "105012705",
        issueChannel: "2",
        list: [
          {
            cInsrncCde: "0600001",
            nSelectFlag: "1",
            nPrm: 0,
            nAmt: "10万",
            calculateFlag: "1",
            insuredAmt: 100000
          },
          {
            cInsrncCde: "1200030",
            nSelectFlag: "1",
            nPrm: 0,
            nAmt: "1万",
            calculateFlag: "1",
            insuredAmt: 10000
          },
          {
            cInsrncCde: "1200031",
            nSelectFlag: "1",
            nPrm: 0,
            nAmt: "9000",
            calculateFlag: "1",
            insuredAmt: 9000
          }
        ],
        nspFlag: "1",
        premiumType: "1",
        actualPremium: "0.01",
        originalPremium: "00"
      },

      requestData: {},
      planInfo: [],
      itemList: [],
      tabActive: 0,
      checked: true, //是否自动续保开关和autoRenewal字段关联
      premium: 0, // 年缴保费
      initialPremium: 0, // 分期首月保费
      minPremium: 0, // 分期次月保费
      tPremium: 0, //总费用
      pattern: /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·){2,25}$/
    };
  },
  created() {
    this.requestData = this.$route.query;
    let datas = qs.stringify({ requestData: JSON.stringify(this.requestData) });

    axios({
      url: axiosurl.getProductInfo,
      method: "post",
      dataType: "json",
      async: "false",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: datas
    })
      .then((response: any) => {
        // console.log(response);
        if (response.data.resultCode == "000000") {
          this.planInfo = response.data.planInfo;
          this.requestData.productPlanId = this.planInfo[0].PLAN_CODE; //设置初始套餐
          for (let index = 0; index < response.data.quoteList.length; index++) {
            let GetItemList: any = response.data.quoteList[index].itemList;
            for (let key = 0; key < GetItemList.length; key++) {
              let QuotationFactor: any = GetItemList[key];
              this.itemList.push(QuotationFactor as never);
              this.requestData[QuotationFactor.CODE] =
                QuotationFactor.DEFAULT_VALUE; //报价因子添加
            }
          }

          let GetList: any = [];
          // let fristPlanInfo:any=this.planInfo[0].KIND_DATA_LIST
          // for (let en = 0; en < fristPlanInfo.length; en++) {
          //   let fristList:any=fristPlanInfo[en].LIST;
          //   for (let index1 = 0; 1 < fristList.length; index1++) {
          //      GetList.push(fristList[index1])//报价详情
          //   }
          // }
          this.requestData.list = GetList; //报价详情
          this.getInsurData();
        } else {
          //Toast.fail('登录失败')
          // this.openLoading = false;
        }
      })
      .catch((error: any) => {
        // Toast.fail('登录失败')
        // this.openLoading=false
      });
  },
  methods: {
    ckilkBgnTm(e){
      this.time.show = true;
      this.time.clickBoxFlag=e;
    },
    //时间转换补零
    mendZero(num) {
      return (num = num < 10 ? '0' + num : num)
    },
    formatDate(date) {
     // "2020-05-23 00:00:00",
      return `${date.getFullYear()}-${this.mendZero(date.getMonth() + 1)}-${this.mendZero(date.getDate())}`;
    },
    onConfirm(date) {
      this.time.show = false;
      if(this.time.clickBoxFlag=="insrncBgnTm"){
          this.time.insrncBgnTm = this.formatDate(date)+" "+"00:00:00";
      }
      if(this.time.clickBoxFlag=="insrncEndTm"){
          this.time.insrncEndTm = this.formatDate(date)+" "+"23:59:59";
      }
      
    },
    getInsurData() {
      //报价页面
      // let getInsurData = this.$route.query;
      // getInsurData["policy_field|byStages|factor1Value|"] = "1";
      console.log(this.requestData);
      let datas = qs.stringify({
        requestData: JSON.stringify(this.requestData)
      });
      axios({
        url: axiosurl.getInsurData,
        method: "post",
        dataType: "json",
        async: "false",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: datas
      })
        .then((response: any) => {
          // console.log(response);
          if (response.data.resultCode == "000000") {
            this.formData.originalPremium = response.data.premium;
            this.formData.actualPremium = response.data.tPremium;
            // this.formData.tPremium = response.data.tPremium;
          } else {
            //Toast.fail('登录失败')
            // this.openLoading = false;
          }
        })
        .catch((error: any) => {
          // this.openLoading=false
        });
    },
    // 切换缴费方式
    switchPayment(value: string) {
      if (value == "601005") {
        this.formData.relation_self = value;
        this.formData["insured|releation||"] = 0;
      } else {
        this.formData.relation_self = "00000";
        this.formData["insured|releation||"] = value;
      }

      this.formData.relation_self = value;
      //if (v == this.formData.policyExt.byStages) return
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    chinaName(value: any) {
      return /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·){2,25}$/.test(value);
    },
    validator(value: any, rule: any) {
      if (rule.name == "china") {
        return /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·){2,25}$/.test(value);
      } else if (rule.name == "mobile") {
        return /^1[34578]\d{9}$/.test(value);
      } else if (rule.name == "idCard") {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          value
        );
      }
    },
    // 异步校验函数返回 Promise
    asyncValidator() {
      return new Promise(resolve => {
        Toast("验证中...");

        setTimeout(() => {
          Toast.clear();
          // resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    goFrom() {
      //立即投保
      document.documentElement.scrollTop =
        this.$refs.Information.offsetTop * 1.3;
      this.tabActive = 2;
      // document.documentElement.scrollTop=880;
      // this.$refs.viewBox[Information].scrollTo(0,'34px');
    },
    autoRenewal() {
      //是否自动续保
      this.formData["policy_field|autoRenewal||"] = this.checked ? "0" : "1";
    },
    onFailed(errorInfo: any) {
      //立即投保报错
      console.log("failed", errorInfo);
      if (errorInfo) {
        Toast(errorInfo.errors[0].message);
        return;
      }
    },
    unitMinute(num: number) {
      //价格计算
      return +(num * 100).toFixed(2);
    },
    // 获取投保时间
    getAppTime() {
      const nowDate = new Date();
      const fillZero = (str: any) => (str < 10 ? `0${str}` : str);
      return [
        nowDate.getFullYear(),
        fillZero(nowDate.getMonth() + 1),
        fillZero(nowDate.getDate()),
        fillZero(nowDate.getHours()),
        fillZero(nowDate.getMinutes()),
        fillZero(nowDate.getSeconds())
      ].join("");
    },
    // 生成流水号
    getBusinessNo() {
      return `${+new Date()}${Math.floor(
        (Math.random() * 8 + 1) * Math.pow(10, 6)
      )}`;
    },
    // 生成保险起始日期
    getInsuredBgnTime(format = "yyyyMMdd") {
      let startDate = new Date(); //2020-05-23 00:00:00
      startDate.setDate(startDate.getDate() + 1);
      const fillZero = (str: any) => (str < 10 ? `0${str}` : str);
      return (
        startDate.getFullYear() +
        "-" +
        fillZero(startDate.getMonth() + 1) +
        "-" +
        fillZero(startDate.getDate()) +
        " " +
        "00:00:00"
      );
    },
    // 生成保险截止日期
    getInsuredEndTime() {
      let endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      const fillZero = (str: any) => (str < 10 ? `0${str}` : str);
      return (
        endDate.getFullYear() +
        "-" +
        fillZero(endDate.getMonth() + 1) +
        "-" +
        fillZero(endDate.getDate()) +
        " " +
        "23:59:59"
      );
    },
    assembleData(value: string) {
      let sex: string = "M";
      let birthday: string;
      if (value.length == 15) {
        let y = value.substring(6, 8);
        let m = value.substring(8, 10);
        let d = value.substring(10, 12);
        sex = value.substring(14, 15);
        sex = Number(sex) % 2 == 1 ? "M" : "F";
        if (Number(y) > 10) y = "19" + y;
        else y = "20" + y;
        birthday = y + " " + m + " " + d;
      } else if (value.length == 18) {
        birthday =
          value.substring(6, 10) +
          " " +
          value.substring(10, 12) +
          " " +
          value.substring(12, 14);
        sex = value.substring(16, 17);
        sex = Number(sex) % 2 == 1 ? "M" : "F";
      }
      this.formData["holder|sex||"] = sex;
      this.formData["insured|insuredName||"] = this.formData[
        "holder|holderName||"
      ];
      this.formData["insured|idcartNo||"] = this.formData["holder|idcartNo||"];
      this.formData["insured|sex||"] = this.formData["holder|sex||"];

      // this.formData.policy.appTime = this.getAppTime();
      // this.formData.policy.businessNo = this.getBusinessNo();
      this.formData.insrncBgnTm = this.getInsuredBgnTime();
      this.formData.insrncEndTm = this.getInsuredEndTime();
      // this.formData['actualPremium']= this.unitMinute(this.minPremium);
      // this.formData.originalPremium = this.unitMinute(
      //   this.minPremium
      // );
      // this.formData.policy.totalInsuredAmt = this.unitMinute(
      //   350000 + 30000 + 18000
      // );
    },
    onSubmit() {
      this.assembleData(this.formData["holder|idcartNo||"]);
      // let lastData= this.extend(this.formData,this.requestData);//组装数据
      Object.assign(this.formData, this.requestData); //组装数据合并数据

      let datas = qs.stringify({ requestData: JSON.stringify(this.formData) });
      axios({
        url: axiosurl.saleInsurance,
        method: "post",
        dataType: "json",
        async: "false",
        header: {
          "content-type": "application/json;charset=UTF-8"
        },
        data: datas
      })
        .then((response: any) => {
          // console.log(response);
          if (response.data.resultCode == "000000") {
            window.location.href = response.data.redirectURL;
          } else {
            Toast.fail("核保失败");
            // this.openLoading = false;
          }
        })
        .catch((error: any) => {
          // Toast.fail('登录失败')
          // this.openLoading=false
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.an-icon-success {
  width: 4rem;
  height: 1.5rem;
  border: 1px solid red;
}
.top {
  position: relative;
  text-align: center;
  height: 470px;
  img {
    width: 375px;
  }
  .top-insure {
    position: absolute;
    top: 172px;
    left: 16px;
    width: 343px;
    height: 292px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(184, 198, 204, 0.3);
    border-radius: 8px;
    .slogan {
      font-size: 30px;
      color: #333;
      font-weight: bold;
      line-height: 36px;
      margin-top: 32px;
    }
    .slogan-tip {
      font-size: 16px;
      line-height: 26px;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    .slogan-money {
      font-size: 16px;
      height: 36px;
      span {
        font-size: 26px;
        color: #f60c3f;
        line-height: 36px;
      }
    }
    .button {
      width: 256px;
      height: 56px;
      line-height: 56px;
      margin: 10px auto 0;
      background: rgba(246, 12, 63, 1);
      box-shadow: 0px 4px 8px 0px rgba(246, 98, 131, 0.3),
        0px 3px 10px 0px rgba(255, 255, 255, 0.5);
      border-radius: 28px;
      color: #ffffff;
      font-size: 20px;
    }
    .icon-tip {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      width: 260px;
      margin: 0 auto;
      font-size: 12px;
      margin-top: 28px;
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.guarantee-word {
  padding: 0 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  color: #666666;
  line-height: 32px;
  font-size: 14px;
  .offer-select {
    width: 35%;
  }
}

// 详情、常见问题、投保表单
.insure-from {
  margin-bottom: 60px;
  .tab-details {
    padding: 0 16px;
  }
}

.Information {
  margin-top: 30px;
  // .van-cell {
  //   padding: 0;
  //   height: 48px;
  //   line-height: 48px;
  // }
  .product-detail-card__title {
    margin-top: 30px;
    display: flex;
    line-height: 32px;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 14px;
    }
  }
  .product-detail-checkbox__group {
    .product-detail-checkbox__item {
      font-size: 12px;
      height: 32px;
      line-height: 32px;
      border-radius: 6px;
      display: inline-block;
      padding: 0 10px;
      border: 1px solid #999999;
      color: #666666;
      margin-left: 15px;
    }
    .active {
      border: 1px solid #f60c3f;
      color: #f60c3f;
    }
  }
  .product-detail-checkbox-switch {
    margin-top: 30px;
    display: flex;
    line-height: 32px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }
}
//时间控件
.term {
  display: block;
}

// 底部价格显示和投保按钮
.goMoney {
  height: 48px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .price {
    width: 230px;
    text-align: center;
    .frist-price {
      font-size: 16px;
      font-weight: 500;
      color: rgba(246, 12, 63, 1);
      line-height: 22px;
    }
    .other-price {
      font-size: 10px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
    }
  }
  .submit-button {
    width: 128px;
    height: 36px;
    background: rgba(246, 12, 63, 1);
    border-radius: 6px;
    color: #fff;
    margin-right: 16px;
  }
}
</style>


<script src="./index.ts"></script>

