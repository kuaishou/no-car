<template>
  <div class="family-wrapper" ref="familyWrapper">
    <div class="scroll-wrapper">
      <d-header :banner-src="banner" :is-header="false" :tags="tags" @submit="viewAnchor('insure')">
        <div slot="title">一张保单 保两家三代</div>
        <div slot="desc">可保障配偶、双方父母及子女</div>
        <div slot="money">每天仅需<span class="light">1元</span></div>
      </d-header>
      <tabs :data="moneyList" type="card" @input="onCurrentChange"></tabs>
      <div class="moneyList-box">
        <div class="box-head">
          <div class="left">保障方案</div>
          <div class="right">保额</div>
        </div>
        <div class="box-list" :class="{change: currentIndex}">
          <div class="box-list2">
            <div class="tabs-list" v-for="(item,i) in moneyList" :key="i">
              <div class="list-item" v-for="(item,j) in item.list" :key="j">
                <div class="left">{{ item.name }}</div>
                <div class="right">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <tabs :data="tabs" fixed scroll-nav offset-top="50" @scroll="pageScroll" ref="tabs"></tabs>
      <!-- 产品详情 -->
      <div class="family-detail" ref="detail" anchor="detail">
        <div class="img-item">
          <img src="./images/hjb_3.png" alt="">
        </div>
        <div class="img-item">
          <div class="family-title title1">产品亮点</div>
          <img src="./images/hjb_4.png" alt="">
        </div>
        <div class="img-item">
          <div class="family-title title1">你的牵挂，华安守护</div>
          <div class="family-desc pdb32">“一份保单”解决家庭成员的各种风险意外</div>
          <img src="./images/hjb_5.png" alt="">
        </div>
        <div class="img-item">
          <div class="family-title title1">低保费，高保额</div>
          <div class="family-desc pdb28">全面保障，为家护航</div>
          <img :src="schjb" alt="">
        </div>
      </div>
      <!-- 常见问题 -->
      <div class="family-card" ref="question" anchor="question">
        <div class="family-cell">
          <div class="title-wrap"><h2>常见问题</h2></div>
          <div class="family-question">
            <div class="family-question__item">
              <div class="family-question__title">投保的时候只需要填写投保人的信息，出险如何理赔？</div>
              <div class="family-question__text">投保时不需要提供关系证明，如发生意外事故需要理赔，需提供户口本、出生证明等关系证明及其他理赔材料（详见条款）即可。</div>
            </div>
            <div class="family-question__item">
              <div class="family-question__title">家庭成员是否有年龄、职业类别的限制：</div>
              <div class="family-question__text">主被保险人年龄限制为 20-55 岁、连带被保险人年龄限制为 0 至 85 周岁，所有被保险人限制 1-6 类职业。</div>
            </div>
            <div class="family-question__item">
              <div class="family-question__title">家庭成员是否有人数限制。</div>
              <div class="family-question__text">每份保险被保险人最多承保 8 人，如投保了本保险，家里有 9 口人，则最多赔付 8 人。</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 理赔服务 -->
      <div class="family-card">
        <div class="family-cell">
          <div class="title-wrap"><h2>理赔服务</h2></div>
          <div class="family-service">
            <div class="family-service__list">
              <a :href="'tel:' + 95556">
                <img src="../../images/call-service.png" alt="">
              </a>
            </div>
            <div class="family-service__text">
              <p>您也可以阅读<span class="text-link" @click="viewAgreement(noticeList[2])">《理赔指南》</span></p>
              <p>华安保险提供 7×24 小时理赔服务，可全国通赔！</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 我要投保 占位锚点-->
      <div anchor="insure" ref="insure"></div>
      <!-- 渠道出单 -->
      <issue-channel v-model="issueChannelSwitch" @change="channelHandle"></issue-channel>
      <div class="family-card">
        <div class="family-insure">
          <div class="title-wrap">
            <h2>本人信息（投保人）</h2>
            <span>信息加密，仅用于投保</span>
          </div>
          <div class="family-insure__input">
            <d-input v-model="formData.holder.holderName" maxLength="20" inputType="name" placeholder="请填写您的姓名" label="投保人姓名" clearable border-bottom></d-input>
            <d-input v-model="formData.holder.idcartNo" maxLength="18" inputType="idcard" toUpperCase placeholder="请填写您的身份证号码" label="身份证号码" clearable border-bottom></d-input>
            <d-input v-model="formData.holder.mobile" maxLength="11" inputType="phone" type="tel" placeholder="请填写您的手机号码" label="手机号码" clearable border-bottom></d-input>
          </div>
        </div>
      </div>
      <div class="family-card">
          <radio v-model="formData.insureds[0].releation" long title="为谁投保（被保人，最多 8 人）" :data="insuredsOption"></radio>
          <radio v-model="stages" long title="被保险人年龄" :data="stagesOption"></radio>
          <radio v-model="claim" long title="缴费方式" :data="claimOption"></radio>
      </div>
      <auto-renewal v-model="renewalSwtich"></auto-renewal>
    </div>
    <!-- 非车险保险销售行为可回溯（底部协议、提交按钮） -->
    <trace-back ref="traceBack" v-model="isFixedFoot" :checked.sync="agreementChecked" @confirm="onSubmit"  @submit="onInsured" grid service service-link="https://guest.qb-tech.net/insurebotaimi/41-a81cc4">
      <div :class="['money']" v-if="discount">
        <span class="highlight">￥{{premium}}</span>
        <span :class="['zkbs']"><s>￥{{tPremium}}</s></span>
      </div>
      <div class="money" v-if="!discount">
        <span class="highlight">{{premium}}元</span>
        <span v-show="dayPremium">每日仅需{{dayPremium}}元</span>
      </div>
    </trace-back>
    <agreement v-model="showAgreement" :content="agreementContent" :title="agreementTitle"></agreement>
  </div>
</template>

<script src="./index.js"></script>
<style scoped src="./index.scss"></style>