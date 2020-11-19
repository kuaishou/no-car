<template>
    <div class="accident-wrapper">
        <div class="scroll-wrapper">
            <!-- 头部banner -->
            <d-header :banner-src="banner" title="家庭成员意外伤害保险" :tags="tags" :mobile-list="insuredList" mobile-color="#446be5" @submit="$refs.tabs.scrollIntoView('holder')">
                <template #title>一张保单 保全家无忧</template>
                <template #desc>可保障本人、配偶及子女</template>
                <template #money>首月<span class="light">3元</span></template>
            </d-header>
            <!-- 保障计划 -->
            <div class="accident-card">
                <div class="plan-wrap">
                    <div class="title-wrap">
                        <h2>保障计划</h2>
                        <span class="link" @click="showPlanDetail=true">详情</span>
                    </div>
                    <ul class="plan-list">
                        <li class="plan-list__item"><span class="plan-list__name">意外伤害保险（保额共享）</span><span class="plan-list__money">35万</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">意外伤害医疗保险（保额共享）</span><span class="plan-list__money">3万</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">意外伤害住院津贴保险（保额共享）</span><span class="plan-list__money">200元/天</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">保障期限</span><span class="plan-list__money">1年</span></li>
                    </ul>
                </div>
            </div>
            <!-- 导航（固顶导航） -->
            <tabs :data="tabs" fixed scroll-nav ref="tabs" offset-top="20" @scroll="pageScroll"></tabs>
            <!-- 产品详情 -->
            <div class="accident-detail" anchor="detail">
                <div class="accident-detail__image">
                    <img src="./images/detail1.png" alt="">
                </div>
                <img src="./images/detail-index1.png" alt="">
                <div class="accident-detail__title">五大产品优势 为家人保驾护航</div>
                <div class="accident-detail__image">
                    <img src="./images/detail2.png" alt="">
                </div>
                <img src="./images/detail-index2.png" alt="">
                <div class="accident-detail__title">给家庭一份温馨的保障</div>
                <div class="accident-detail__text">生活无小事，用心呵护家庭生活方方面面</div>
                <div class="accident-detail__image">
                    <img src="./images/detail3.png" alt="">
                </div>
            </div>
            <!-- 常见问题 -->
            <div class="accident-card" anchor="question">
                <div class="title-wrap"><h2>常见问题</h2></div>
                <div class="accident-question">
                    <div class="accident-question__item">
                        <div class="accident-question__title">这个产品的特色是什么？</div>
                        <div class="accident-question__text">产品的最大特点是各项保险责任可供家庭成员共用。比每个家庭成员单独购买经济实惠且便于保单管理。</div>
                    </div>
                    <div class="accident-question__item">
                        <div class="accident-question__title">投保的时候只需要填写投保人的信息，出险如何理赔？</div>
                        <div class="accident-question__text">如发生意外事故需要理赔，只需提供如户口本、出生证明等关系证明，以及意外相关的其他理赔材料（详见条款）即可。</div>
                    </div>
                    <div class="accident-question__item">
                        <div class="accident-question__title">什么是保额共享？</div>
                        <div class="accident-question__text">保额共享为保单下按照约定的保险金额家庭成员共享。无论一人或多人使用，其累计赔付上限为该项责任的约定保额。</div>
                    </div>
                    <div class="accident-question__item">
                        <div class="accident-question__title">家庭哪些成员可作为被保险人？</div>
                        <div class="accident-question__text">投保人、投保人配偶、投保人子女、且被保险人年龄在出生满 30 天至 60 周岁。</div>
                    </div>
                    <div class="accident-question__item">
                        <div class="accident-question__title">我们家不止五个人怎么保？</div>
                        <div class="accident-question__text">本产品每份保险最多承保 5 人，如家里有 6 个或 6 个以上人员，则最多赔付 5 人。</div>
                    </div>
                </div>
            </div>
            <!-- 理赔服务 -->
            <div class="accident-card">
                <div class="title-wrap">
                    <h2>理赔服务</h2>
                </div>
                <div class="accident-service">
                    <div class="accident-service__list">
                        <a :href="'tel:' + 95556">
                            <img src="../../images/call-service.png" alt="">
                        </a>
                    </div>
                    <div class="accident-service__text">
                        <p>您也可以阅读<span class="text-link" @click="viewLPZN">《理赔指南》</span></p>
                        <p>华安保险提供 7×24 小时理赔服务，可全国通赔！</p>
                    </div>
                </div>
            </div>
            <!-- 我要投保 -->
            <div class="accident-card" anchor="holder">
                <div class="accident-insure">
                    <div class="title-wrap">
                        <h2>本人信息（投保人）</h2>
                        <span>信息保密，仅用于投保</span>
                    </div>
                    <div class="accident-insure__input">
                        <d-input v-model="formData.holder.holderName" maxLength="20" inputType="name" placeholder="请填写您的姓名" label="投保人姓名" clearable border-bottom></d-input>
                        <d-input v-model="formData.holder.idcartNo" maxLength="18" inputType="idcard" toUpperCase placeholder="请填写您的身份证号码" label="身份证号码" clearable border-bottom></d-input>
                        <d-input v-model="formData.holder.mobile" maxLength="11" inputType="phone" type="tel" placeholder="请填写您的手机号码" label="手机号码" clearable border-bottom></d-input>
                    </div>
                </div>
            </div>
            <div class="accident-card">
                <radio title="为谁投保（被保人，最多5人）" :data="insuredsOption" long></radio>
                <radio title="缴费方式" :data="stagesOption" long></radio>
            </div>
            <!-- 自动续保 -->
            <auto-renewal v-model="renewalSwtich"></auto-renewal>
        </div>
        <!-- 保障计划详情 -->
        <agreement v-model="showPlanDetail" title="保障计划详情">
            <div class="plan-detail-wrap">
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">意外伤害保险(保额共享)<span class="plan-detail-card__text">一年</span></div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">意外伤害保险(保额共享)<span class="plan-detail-card__text">35万</span></div>
                    <div class="plan-detail-card__content">在保险期间内，被保险人因遭受意外伤害事故导致身故或残疾的，保险人合同约定给付意外伤害保险金，且给付各项保险金之和不超过保险金额。</div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">意外伤害医疗保险(保额共享)<span class="plan-detail-card__text">3万</span></div>
                    <div class="plan-detail-card__content">被保险人因发生主险合同责任范围的意外伤害事故，经治疗地社会保险经办机构指定医院治疗而支出的符合当地社会医疗保险主管部门规定的可报销的医疗费用，保险人对每一被保险人每次事故意外门急诊医疗费用免赔额为300元，意外住院医疗费用免赔额0元，保险人在扣除免赔额后按80%的比例在保险金额内予以补偿。每次事故每人门急诊赔付限额500元。</div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">意外伤害住院津贴保险(保额共享)<span class="plan-detail-card__text">200元/天</span></div>
                    <div class="plan-detail-card__content">被保险人因意外伤害事故导致住院治疗的，保险公司按其实际住院天数乘以约定的日住院津贴标准给付住院津贴金。同一保单年度中，累计住院津贴的给付天数以180天为限，免赔天数3天。</div>
                </div>
            </div>
        </agreement>
        <!-- 非车险保险销售行为可回溯（底部协议、提交按钮） -->
        <trace-back ref="traceBack" v-model="accidentFooter" @confirm="onSubmit" :checked.sync="agreementChecked" @submit="onInsured" :premium="premium" :initialPremium="initialPremium" :nextPremium="minPremium" grid></trace-back>
    </div>
</template>
<script src="./index.js"></script>
<style scoped src="./index.scss"></style>