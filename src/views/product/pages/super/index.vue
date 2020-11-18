<template>
    <div class="super-wrapper">
        <div class="scroll-wrapper">
            <!-- 超能保头部 -->
            <div class="super-header">
                <img src="./images/banner.png" alt="">
            </div>
            <!-- 版本类型 -->
            <tabs @change="changeSuperType" type="card" :data="card" class="super-type"></tabs>
            <div class="type-tabs-content">
                <div v-if="activeCard==='P060448-T1'">
                    <div class="version-row version-row-hd">
                        <h2 class="row-left">保障计划</h2>
                        <span class="row-right" @click="showAgreementSuper=true">详情</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">个人人身意外伤害险</span>
                        <span class="row-right">30万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">意外伤害医疗</span>
                        <span class="row-right">3万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">疾病住院医疗</span>
                        <span class="row-right">1万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">航空乘客意外伤害保险</span>
                        <span class="row-right">100万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">附加重大疾病保险</span>
                        <span class="row-right">10万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">疾病身故保险</span>
                        <span class="row-right">20万</span>
                    </div>
                </div>
                <div v-if="activeCard==='P060448-T2'"><div class="version-row version-row-hd">
                        <h2 class="row-left">保障计划</h2>
                        <span class="row-right" @click="showAgreementSuper=true">详情</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">个人人身意外伤害险</span>
                        <span class="row-right">50万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">意外伤害医疗</span>
                        <span class="row-right">5万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">疾病住院医疗</span>
                        <span class="row-right">1万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">航空乘客意外伤害保险</span>
                        <span class="row-right">500万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">特定营运交通工具意外伤害保险责任</span>
                        <span class="row-right">50万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">特定非营运汽车意外伤害保险责任</span>
                        <span class="row-right">50万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">附加重大疾病保险</span>
                        <span class="row-right">20万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">疾病身故保险</span>
                        <span class="row-right">30万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">疾病住院津贴</span>
                        <span class="row-right">3.6万</span>
                    </div>
                    <div class="version-row">
                        <span class="row-left">意外住院津贴</span>
                        <span class="row-right">3.6万</span>
                    </div>
                </div>
            </div>
            <!--产品详情 常见问题 我要投保 -->
            <tabs :data="tabs" fixed scroll-nav ref="tabs" @scroll="pageScroll"></tabs>
            <div class="main-tabs-content">
                <div anchor="detail" class="tabs-detail">
                    <div class="part-one part">
                        <div class="title-part">
                            <h2 class="title">最高500万综合意外+疾病保障</h2>
                            <p class="main-title">意外门诊及住院医疗均可保</p>
                            <p class="sub-title">10项保障为您贴身守护</p>
                        </div>
                        <img alt="" src="./images/detail1.jpg"/>
                    </div>
                    <div class="part-two part">
                        <div class="title-part">
                            <h2 class="title">意外的护身符</h2>
                            <p class="main-title">最高可提供500万元的综合意外伤害高额保障</p>
                            <p class="sub-title">海陆空出行全方位为您保驾护航，上班、远行更安心</p>
                        </div>
                        <img alt="" src="./images/detail2.jpg"/>
                    </div>
                    <div class="part-three part">
                        <div class="title-part">
                            <h2 class="title">健康的守护神</h2>
                            <p class="main-title">重疾+身故+住院三重保障</p>
                            <p class="sub-title"></p>
                        </div>
                        <img alt="" src="./images/detail3.jpg"/>
                    </div>
                </div>
                <div anchor="problem" class="tabs-problem">
                    <div class="title-wrap"><h2>常见问题</h2></div>
                    <div class="problem-item" v-for="(item, index) in questionList" :key="index">
                        <div :class="['problem-item-title',{'show': item.show}]" @click="item.show=!item.show">{{item.title}}</div>
                        <div class="problem-item-text" v-show="item.show">{{item.content}}</div>
                    </div>
                </div>
                <!-- 理赔服务 start-->
                <div class="million-card">
                    <div class="million-cell">
                        <div class="title-wrap"><h2>理赔服务</h2></div>
                        <div class="million-service">
                            <div class="million-service__list">
                                <a :href="'tel:' + 95556">
                                    <img src="../../images/call-service.png" alt="">
                                </a>
                            </div>
                            <div class="million-service__text">
                                <p>您也可以阅读<span class="text-link" @click="viewLPZN(2)">《理赔指南》</span></p>
                                <p>华安保险提供 7×24 小时理赔服务，可全国通赔！</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 理赔服务 end-->
                <div anchor="insure" class="tabs-insure">
                    <div class="holder-form-content">
                        <div class="holder-title">
                            <h2 class="left">本人信息（投保人）</h2>
                            <span class="right">信息加密，仅用于投保</span>
                        </div>
                        <d-input v-model="formData.holder.holderName" maxLength="20" inputType="name" placeholder="请填写您的姓名" label="投保人姓名" clearable border-bottom></d-input>
                        <d-input v-model="formData.holder.idcartNo" maxLength="18" inputType="idcard" placeholder="请填写您的身份证号码" label="身份证号码"  @input="idcartNoChange('holder')"  clearable border-bottom></d-input>
                        <d-input v-model="formData.holder.mobile" maxLength="11" inputType="phone" type="tel" placeholder="请填写您的手机号码" label="手机号码" clearable border-bottom></d-input>
                        <d-input v-model="formData.holder.mail" placeholder="请填写您的邮箱" label="邮箱（非必填）" clearable border-bottom></d-input>
                    </div>
                    <div class="radio-form-content">
                        <radio v-model="formData.holder.releation" title="为谁投保" :data="['本人', '配偶','父母','子女']" class="insured-person"></radio>
                        <div class="insure-form-content" v-show="formData.holder.releation==1 || formData.holder.releation==2 || formData.holder.releation==3">
                            <div class="insure-title">
                                <h2 class="left">被保人信息</h2>
                                <span class="right">信息加密，仅用于投保</span>
                            </div>
                            <d-input v-model="formData.insureds[0].insuredName" maxLength="20" inputType="name" placeholder="请填写被保人的姓名" label="被保人姓名" clearable border-bottom></d-input>
                            <d-input v-model="formData.insureds[0].idcartNo"  maxLength="18" inputType="idcard" placeholder="请填写被保人的身份证号码" label="身份证号码"  @input="idcartNoChange('holder')"  clearable border-bottom></d-input>
                            <d-input v-model="formData.insureds[0].mobile" maxLength="11" inputType="phone" type="tel" placeholder="请填写被保人的手机号码" label="手机号码" clearable border-bottom></d-input>
                            <d-input v-model="formData.insureds[0].mail" placeholder="请填写被保人的邮箱" label="邮箱（非必填）" clearable border-bottom></d-input>
                        </div>
                        <radio v-model="socialInsurance" @input="changeSocialInsur" title="有无社保" :data="['有社保', '无社保']" class="social-insurance" :style="{ 'padding-top': formData.holder.releation==1||formData.holder.releation==2||formData.holder.releation==3 ? '0.32rem' : '' }"></radio>
                        <radio v-model="payMethod" long title="缴费方式" :data="['按月缴费（12期）']" class="pay-method"></radio>
                    </div>
                </div>
            </div>
            <!-- 自动续保 -->
            <auto-renewal v-model="renewalSwtich"></auto-renewal>
        </div>
        <!-- 非车险保险销售行为可回溯（底部协议、提交按钮） -->
        <trace-back ref="traceBack" v-model="superFooter" :checked.sync="agreementChecked" @cancel="(hide)=>{hide()}" @confirm="onSubmit" @submit="onInsuredBottom" :initialPremium="initialPremium" :nextPremium="nextPremium" service service-link="https://guest.qb-tech.net/insurebotaimi/41-9ba6b8 "></trace-back>
        <!-- 投资方案详情弹窗 -->
        <agreement v-model="showAgreementSuper" title="详情"><img alt='' src='./images/type_detail.png'/></agreement>
        <!-- 健康告知事项模板 -->
        <script type="text/template" ref="health">
            <div style="color: #333;font-size: .28rem; line-height: .4rem;text-align: left;">
                <p style="font-size: .3rem;font-weight: 700;text-indent: 2em;">请投保人仔细阅读本《健康告知事项》，若未如实告知其中列明的健康情况，保险人有权解除合同并对保险合同解除前发生的保险事故不承担赔偿或者给付保险金的责任，并有权根据《保险法》等相关法律规定或保险合同的约定不退还保险费。</p>
                <p style="margin-top: .15rem;">1. 被保险人最近1年内，没有参加以下运动的计划：飞行、深度潜水（超20米）、跳伞、拳击、赛车、特技表演等；</p>
                <p style="margin-top: .15rem;">2. 被保险人最近2年内没有因健康异常发生过住院或手术；没有体检医师或医生给您提出复查、住院治疗或手术建议；没有因其他慢性疾病需要长期（一个月以上）服药控制；</p>
                <p style="margin-top: .15rem;">3. 被保险人没有或未被怀疑有下列健康异常：精神疾病、语言功能丧失、肢体缺损、恶性肿瘤（癌症）、尚未证实为良性或恶性的肿瘤、结石、任何不明性质的包块/肿物/息肉、结节（如肺结节、甲状腺结节）、白斑；</p>
                <p style="margin-top: .15rem;">4. 被保险人没有或未被怀疑有下列循环及呼吸系统疾病：高血压、脑血管疾病、主动脉疾病、心律失常、其他心脏病、椎基底动脉疾病、静脉曲张、外周动脉血管疾病；肺纤维化、支气管扩张、慢性支气管炎、肺气肿、哮喘、肺结核、咯血、肺动脉高压；</p>
                <p style="margin-top: .15rem;">5. 被保险人没有或未被怀疑有下列内分泌及消化系统疾病：糖尿病、系统性红斑狼疮、甲状腺疾病、脑垂体疾病；肝炎、肝硬化、消化道溃疡、胰腺疾病、慢性胃炎、消化道出血、肠息肉、直肠炎、结肠炎；</p>
                <p style="margin-top: .15rem;">6. 被保险人没有或未被怀疑有下列血液、免疫及泌尿系统疾病：类风湿性疾病、重症肌无力、贫血、血友病、痛风、强直性脊柱炎、紫癜症；尿毒症、肾病综合征、肾炎、肾功能不全、血尿；</p>
                <p style="margin-top: .15rem;">7. 被保险人没有或未被怀疑有下列肌肉、骨骼及神经系统疾病：颈椎病、腰椎间盘突出、腰肌劳损；癫痫、脊髓病变、帕金森病、慢性酒精中毒；</p>
                <p style="margin-top: .15rem;">8. 被保险人没有或未被怀疑有下列五官疾病：白内障、青光眼、视网膜疾病、失明、失聪、中耳炎。</p>
                <div style="margin-top: .15rem;">女性部分：</div>
                <p style="margin-top: .15rem;">1. 被保险人不在妊娠期间；未患有妊娠高血压、妊娠糖尿病；未曾因异常妊娠反应住院治疗或手术；</p>
                <p style="margin-top: .15rem;">2. 被保险人未曾患异位妊娠；未曾被医生或体检医师告知过被保险人有盆腔炎症、乳腺结节、乳腺增生、乳腺纤维腺瘤、子宫肌瘤、子宫内膜异位症、子宫内膜增生、卵巢囊肿、宫颈炎、宫颈纳囊、宫颈不典型增生、HPV检测阳性；</p>
            </div>
        </script>
    </div>
</template>

<script src="./index.js"></script>
<style scoped src="./index.scss"></style>