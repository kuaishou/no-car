<template>
  <div class="insure">
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
    <van-tabs v-model="active" animated>
      <van-tab v-for="(plan,index) in ProductInfo.planInfo" :title="plan.PLAN_NAME" :key="index">
        <ul class="guarantee-list">
            <li class="guarantee-word">
                      <span class="guarantee-title">保障计划</span>
                      <span class="guarantee-details">详情</span>
             </li>
             <div v-for="(items,ii) in plan.KIND_DATA_LIST" :key="ii">
                  <li class="guarantee-word" v-for="(item,i) in items.LIST" :key="i+'d'">
                      <span>{{item.N_NAME}}</span>
                      <span>{{item.N_AMT_UI}}</span>
                  </li>
            </div>
           
        </ul>
      </van-tab>
    </van-tabs>




      <ul>
        <li class="guarantee-word" v-for="(item,i) in ProductInfo.quoteList[0].itemList" :key="i+'d'">
          <span>{{item.LABEL}}</span>
          <input v-if="item.HTML_TYPE=='INPUT'" type="text" />
          <select
            @change="getInsurData()"
            class="offer-select"
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
          <div class="Information">
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
                v-model="formData.holder.holderName"
                label="投保人姓名"
                placeholder="请输入投保人姓名"
                :rules="[{ validator,name:'china', message: '请填写中文姓名' }]"
              />

              <van-field
                v-model="formData.holder.idcartNo"
                label="身份证号码"
                placeholder="请输入身份证号码"
                :rules="[{ validator , name:'idCard', message: '请输入正确的身份证号码' }]"
              />
              <van-field
                v-model="formData.holder.mobile"
                label="手机号码"
                placeholder="请输入手机号码"
                :rules="[{validator , name:'mobile', message: '请输入正确的手机号码' }]"
              />

              <div class="product-detail-card__title">
                <h2>为谁投保（被保人，最多五人）</h2>
              </div>
              <div class="product-detail-checkbox__group">
                <span
                  :class="['product-detail-checkbox__item',{'active': formData.insureds.releation === '0'}]"
                  @click="switchPayment('0')"
                >本人</span>
                <span
                  :class="['product-detail-checkbox__item',{'active': formData.insureds.releation === '11'}]"
                  @click="switchPayment('11')"
                >配偶</span>
                <span
                  :class="['product-detail-checkbox__item',{'active': formData.insureds.releation === '2'}]"
                  @click="switchPayment('2')"
                >子女</span>
                <span
                  :class="['product-detail-checkbox__item',{'active': formData.insureds.releation === '3'}]"
                  @click="switchPayment('3')"
                >兄弟姐妹</span>
              </div>
              <div v-show="formData.relation_self !== '601005'" class="insurePeople">
                <!-- 被保人姓名 -->
                <van-field
                  v-model="formData.insureds.insuredName"
                  label="被保人姓名"
                  placeholder="请输入投保人姓名"
                  :rules="[{ validator,name:'china', message: '请填写投保人姓名' }]"
                />

                <van-field
                  v-model="formData.insureds.idcartNo"
                  label="身份证号码"
                  placeholder="请输入身份证号码"
                  :rules="[{ validator , name:'idCard', message: '请输入正确的身份证号码' }]"
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

