<template>
    <div class="million-wrapper">
        <div class="scroll-wrapper">
            <!-- 顶部banner -->
            <div class="million-banner">
                <img src="./images/banner.png" alt="">
            </div>
            <!-- 保障计划 -->
            <div class="million-card">
                <div class="plan-wrap">
                    <div class="title-wrap">
                        <h2>保障计划</h2>
                        <span class="link" @click="showPlanDetail=true">详情</span>
                    </div>
                    <ul class="plan-list hairline--bottom">
                        <li class="plan-list__item"><span class="plan-list__name">一般医疗保险金</span><span class="plan-list__money">300万元</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">120种重大疾病医疗保险金</span><span class="plan-list__money">600万元</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">质子重离子医疗保险金</span><span class="plan-list__money">100万元</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">恶性肿瘤院外特定药品医疗保险金</span><span class="plan-list__money">100万元</span></li>
                        <li class="plan-list__item"><span class="plan-list__name">重大疾病异地转诊交通费用保险金</span><span class="plan-list__money">5000元</span></li>
                    </ul>
                    <div class="million-premium">
                        <div class="title-wrap">
                            <h2>首月3元，次月12元起</h2>
                            <span class="link" @click="showPremium=true">查看保费</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 导航（固顶导航） -->
            <tabs :data="tabs" fixed scroll-nav ref="tabs" offset-top="20"></tabs>
            <!-- 产品详情 -->
            <div class="million-detail" anchor="detail">
                <img src="./images/detail1.jpg" alt="">
                <img src="./images/detail2.jpg" alt="">
                <img src="./images/detail3.jpg" alt="">
                <img src="./images/detail4.jpg" alt="">
                <img src="./images/detail5.jpg" alt="">
            </div>
            <!-- 常见问题 -->
            <div class="million-card" anchor="question">
                <div class="million-cell">
                    <div class="title-wrap">
                        <h2>常见问题</h2>
                    </div>
                    <div class="million-question">
                        <div class="million-question__item" v-for="(item, index) in questionList" :key="index">
                            <div :class="['million-question__title',{'show': item.show}]" @click="item.show=!item.show">{{item.title}}</div>
                            <div class="million-question__text" v-show="item.show" v-html="item.content"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 理赔服务 -->
            <div class="million-card">
                <div class="million-cell">
                    <div class="title-wrap">
                        <h2>理赔服务</h2>
                    </div>
                    <div class="million-service">
                        <div class="million-service__list">
                            <a :href="'tel:' + 95556">
                                <img src="../../images/call-service.png" alt="">
                            </a>
                        </div>
                        <div class="million-service__text">
                            <p>您也可以阅读<span class="text-link" @click="viewLPZN">《理赔指南》</span></p>
                            <p>华安保险提供 7×24 小时理赔服务，可全国通赔！</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我要投保 占位锚点-->
            <div anchor="holder"></div>
            <!-- 渠道出单 -->
            <issue-channel v-model="issueChannelSwitch" @change="channelHandle"></issue-channel>
            <div class="million-card">
                <div class="million-insure">
                    <div class="title-wrap">
                        <h2>本人信息（投保人）</h2>
                        <span>信息保密，仅用于投保</span>
                    </div>
                    <div class="million-insure__input">
                        <d-input v-model="formData.holder.holderName" maxLength="20" inputType="name" placeholder="请填写您的姓名" label="投保人姓名" clearable border-bottom></d-input>
                        <div class="idcartNo">
                            <d-input v-model="formData.holder.idcartNo" maxLength="18" inputType="idcard" toUpperCase placeholder="请填写您的身份证号码" label="身份证号码" @input="idcartNoChange('holder')" clearable border-bottom></d-input>
                            <div class="camera-contain" id="camera-contain">
                                <img src="./images/camera_logo.png" alt="">
                                <input type="file" accept="image/*" name="file" class="camera" @change="imgHolderUpload" data-slcdata="camera1">
                            </div>
                        </div>
                        <d-input v-model="formData.holder.mobile" maxLength="11" inputType="phone" type="tel" placeholder="请填写您的手机号码" label="手机号码" clearable border-bottom></d-input>
                    </div>
                </div>
            </div>
            <div v-show="!isSelf">
                <div class="million-card">
                    <radio v-model="formData.insureds[0].releation" title="为谁投保（被保人）" :data="insuredsOption" @change="idcartNoChange"></radio>
                </div>
                <div class="million-card" anchor="insured">
                    <div class="million-insure">
                        <div class="title-wrap">
                            <h2>被保人信息</h2>
                            <span>信息保密，仅用于投保</span>
                        </div>
                        <div class="million-insure__input">
                            <d-input v-model="formData.insureds[0].insuredName" maxLength="20" inputType="name" placeholder="请填写被保人的姓名" label="被保人姓名" clearable border-bottom></d-input>
                            <div class="idcartNo">
                                <d-input v-model="formData.insureds[0].idcartNo" maxLength="18" inputType="idcard" toUpperCase placeholder="请填写被保人的身份证号码" label="身份证号码" @input="idcartNoChange(null)" clearable border-bottom></d-input>
                                <div class="camera-contain" id="camera-contain">
                                    <img src="./images/camera_logo.png" alt="">
                                    <input type="file" accept="image/*" name="file" class="camera" @change="imgInsuredsUpload" data-slcdata="camera1">
                                </div>
                            </div>
                            <d-input v-model="formData.insureds[0].mobile" maxLength="11" inputType="phone" type="tel" placeholder="请填写被保人的手机号码" label="手机号码" clearable border-bottom></d-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="million-card">
                <radio v-model="formData.insureds[0].releation" title="为谁投保（被保人）" :data="insuredsOption" @change="idcartNoChange(null)" v-show="isSelf"></radio>
                <radio v-model="formData.policyExt.byStages" title="缴费方式" :data="stagesOption" @change="idcartNoChange(null)"></radio>
                <radio v-model="claim" title="年度累计免赔额" :data="claimOption" @change="idcartNoChange(null)"></radio>
                <radio v-model="formData.insureds[0].insuredExt.shebao" title="被保人有无医保" doubt @doubt="onDoubt" :data="sebaoOption" @change="idcartNoChange(null)"></radio>
            </div>
            <div class="million-card" anchor="insureDate">
                <div class="million-insure">
                    <div class="title-wrap">
                        <h2>保险起止期</h2>
                        <span>保一年</span>
                    </div>
                </div>
                <div class="million-insure__input insure-date" :class="{hasVal: formData.policy.insuredBgnTime}">
                    <van-cell title="保险起期" @click="dateOption.isStartDate = true">
                        {{formatNowDate}}
                        <template #right-icon>
                            <img class="insure-detail6" src="./images/detail6.png" alt="">
                        </template>
                    </van-cell>
                    <van-cell title="保险止期" class="two" v-if="formatEndDate" :value="formatEndDate" />
                </div>
            </div>
            <!-- 自动续保 -->
            <auto-renewal v-model="renewalSwtich"></auto-renewal>
        </div>
        <!-- 非车险保险销售行为可回溯（底部协议、提交按钮） -->
        <trace-back ref="traceBack" @cancel="onAnswerShow" @confirm="onHealthNot" :checked.sync="agreementChecked" @submit="onInsured" :premium="premium" :initialPremium="initialPremium" :nextPremium="minPremium" :discount="discount" grid service service-link="https://guest.qb-tech.net/insurebotaimi/HACX-002"></trace-back>
        <!-- 保障计划 -->
        <agreement v-model="showPlanDetail" title="保障计划详情">
            <div class="plan-detail-wrap">
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">一般医疗保险金<span class="plan-detail-card__text">300万元</span></div>
                    <div class="plan-detail-card__content">因意外伤害或在等待期30天后因患疾病，在中华人民共和国境内（不包括香港、澳门、台湾地区）二级及以上公立医院发生需个人支付、必须且合理的住院或特殊门诊医疗费用，保险人对于被保险人需个人支付的、必需且合理的金额，在扣除约定免赔额后，依照约定的给付比例进行赔付。保险人在本项下累计给付金额之和以本保险合同约定的一般医疗保险金的保险金额为限，当保险人在本项下累计给付金额达到一般医疗保险金的保险金额时，保险人对被保险人在本项下的保险责任终止。本项保险金给付的医疗费用包括：住院医疗费用、特殊门诊医疗费用、门诊手术医疗费用、住院前后门急诊医疗费用。</div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">120种重大疾病医疗保险金<span class="plan-detail-card__text">600万元</span></div>
                    <div class="plan-detail-card__content">因意外伤害或在等待期30天后，经中华人民共和国境内（不包括香港、澳门、台湾地区）二级及以上公立医院专科医生初次确诊重大疾病并在医院接受治疗的，保险人对于被保险人需个人支付的、必需且合理的金额，依照约定的给付比例进行赔付。保险人在本项下累计给付金额之和以本保险合同约定的重大疾病医疗保险金的保险金额为限，当保险人在本项下累计给付金额达到重大疾病医疗保险金的保险金额时，保险人对被保险人在本项下的保险责任终止。本项保险金给付的医疗费用包括：费用包括：重大疾病住院医疗费用、重大疾病特殊门诊医疗费用、重大疾病门诊手术医疗费用、重大疾病住院前后门急诊医疗费用。</div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">质子重离子医疗保险金<span class="plan-detail-card__text">100万元</span></div>
                    <div class="plan-detail-card__content">在保险期间内，被保险人在等待期30天后经中华人民共和国境内（不包括香港、澳门、台湾地区）二级及以上公立医院专科医生确诊初次罹患本保险合同所定义的恶性肿瘤，并在上海质子重离子医院接受质子重离子治疗，则保险人对于被保险人需个人支付的、必需且合理的质子重离子医疗费用按照100%比例进行赔付。保险人在本项下累计给付金额以本保险合同约定的质子重离子医疗保险金的保险金额为限，当保险人在本项下的累计给付金额达到质子重离子医疗费用保险金的保险金额时，保险人对被保险人在本项下的保险责任终止。</div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">附加恶性肿瘤院外特定药品费用医疗保险金<span class="plan-detail-card__text">100万元</span></div>
                    <div class="plan-detail-card__content">在保险期间内，被保险人于等待期30天后，经中华人民共和国境内（不包括香港、澳门、台湾地区）二级及以上公立医院的专科医生初次确诊罹患附加险合同所定义的恶性肿瘤，保险人对于被保险人因治疗该恶性肿瘤实际发生的必需且合理的且同时满足以下条件的院外指定药店购买的特定药品费用，保险人按照合同约定的比例给付恶性肿瘤院外特定药品费用医疗保险金。给付恶性肿瘤院外特定药品费用保险金须同时满足以下条件：<br />
                        1、该特定药品须由医院专科医生开具处方且为被保险人当前治疗必需的药品；<br />
                        2、每次特定药品处方剂量不超过一个月；<br />
                        3、每次特定药品处方仅限治疗期间为保险期间内且在等待期后初次确诊了恶性肿瘤，但被保险人在等待期后初次确诊恶性肿瘤后未能续保本附加合同的，治疗期间可延长至本附加合同到期日后30日（含第30日）；<br />
                        4、该特定药品必须为本合同期满日前在中国国家药品监督管理局批准且已在中国上市的靶向药物和免疫治疗药物，且在约定的药品清单列表中；<br />
                        5、被保险人须在保险人指定药店购买上述处方中所列的特定药品；<br />
                        6、被保险人购买处方中所列特定药品前，需按保险人指定流程提交相应材料并通过处方审核，具体流程见条款“第五条 授权申请、药品处方审核及购药流程”。
                    </div>
                </div>
                <div class="plan-detail-card">
                    <div class="plan-detail-card__title">重大疾病异地就医交通费用保险金<span class="plan-detail-card__text">5000元</span></div>
                    <div class="plan-detail-card__content">在保险期间内，被保险人因遭受意外伤害事故或在等待期30天后经医院专科医生初次确诊罹患本保险合同所定义的重大疾病（无论一种或者多种），因病情需要跨省、自治区或直辖市（仅限中国大陆境内，不包括港、澳、台等境外地区）住院治疗，经被保险人申请，由转出医院开具转院证明，保险人对被保险人发生的合理且必要的因异地转诊产生的客运公共交通及救护车费用在本保险合同约定的保险金额内给付保险金。被保险人飞机舱位级别最高以经济舱（包含超级经济舱)为限,火车（含地铁、轻轨、动车、其他高速列车）以软卧或一等座为限。</div>
                </div>
            </div>
        </agreement>
        <!-- 查看保费 -->
        <agreement v-model="showPremium" title="查看保费详情">
            <div class="premium-details">
                <dropdown-menu :data="filterOption" @change="filterChange"></dropdown-menu>
                <div style="height:.9rem"></div>
                <div class="premium-scroll">
                    <table class="premium-wrapper" cellspacing="0">
                        <tr>
                            <th>投保年龄</th>
                            <th v-show="firstYear">首月保费</th>
                            <th v-show="firstYear">次月保费</th>
                            <th v-show="!firstYear">保费</th>
                        </tr>
                        <tr v-for="(item, index) in premiumData" :key="index">
                            <td>{{item.age}}周岁</td>
                            <td v-show="firstYear">3</td>
                            <td>{{item.premium}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </agreement>
        <answer v-model="isAnswerShow" :list="answerList" @submit="onAnswerSubmit" @fail="onAnswerFail"></answer>
        <van-popup v-model="dateOption.isStartDate" position="bottom" :overlay="true">
            <van-datetime-picker :value="dateOption.startDate" type="date" title="选择保险起期" :min-date="dateOption.minDate" :max-date="dateOption.maxDate" @cancel="dateOption.isStartDate = false" @confirm="onStartDateChange" />
        </van-popup>
        <my-dialog v-model="showHB" hide-on-blur>
            <div class="dialog-pg">
                <div class="close" @click="showHB = false">
                    <img src="../../components/answer/images/icon_4.png" alt="">
                </div>
                <div class="title">智能核保</div>
                <div class="desc">我们需要进一步了解被保人是否可以投保</div>
                <img class="img" src="./images/detail7.png" alt="">
                <div class="btn" @click="onPG">开始评估</div>
            </div>
        </my-dialog>
        <!-- 健康告知模板 -->
        <script type="text/template" ref="health">
            <div style="color: #333;font-size: .28rem;line-height: .4rem;">
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;text-indent: 2em;">投保人应在对所有被保险人健康、历史投保记录等以下情况充分了解的基础上履行如实告知义务。投保人承诺完全知晓所有被保险人以下情况。</p>
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;">若被保险人实际情况与下述告知内容不符：</p>
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;">（1）投保人故意或者因重大过失未履行如实告知义务，足以影响保险公司决定是否同意承保或者提高保险费率的，保险公司有权解除保险合同。</p>
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;">（2）投保人故意不履行如实告知义务的，保险公司对于合同解除前发生的保险事故，不承担给付保险金的责任，并不退还保险费。</p>
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;">（3） 投保人因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，保险公司对于合同解除前发生的保险事故，不承担给付保险金的责任，但应当退还保险费。</p>
                <br />
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;">投保人请确认被保险人是否存在以下情况？</p>
                <p><b>1、【保险情况】</b>被保险人过去2年内投保人身保险（健康保险）时，被保险公司拒保，延期，加费或者附加相关条件承保。</p>
                <p><b>2、【就医行为】</b>被保险人过去1年内存在括号内医学检查结果异常，被医生建议进一步检查，复查，随诊，或诊疗（检查项目包括：实验室检查，物理检查，心电图，超声检查，影像检查，内镜检查，病理检查）；或过去2年内曾住院，或曾被医生建议手术或住院治疗。</p>
                <p><b>3、【被保险人正在患有或曾经被诊断患下列疾病或罹患下列症状体征】</b> </p>
                <p>（1）良、恶性肿瘤，尚未证实为良性或恶性的肿瘤，原位癌，癌前病变；2级或以上高血压（收缩压≥160mmHg，和/或舒张压≥100mmHg），冠心病，心肌病，心梗，风湿性心脏病，心瓣膜病，严重心律失常，心功能不全二级（含）以上；主动脉瘤，主动脉夹层；脑血管病，脑卒中（含脑梗，脑出血），脑炎或脊髓炎后遗症，脑和脊髓的损伤；慢性肾病，肾功能不全，肾切除；肝炎及肝炎病毒携带者，重度脂肪肝，酒精肝，肝硬化，肝功能衰竭；胰腺炎；溃疡性结肠炎或克罗恩病；再生障碍性贫血；多发性硬化，重症肌无力，系统性红斑狼疮，类风湿性关节炎，结节病；糖尿病或空腹血糖>6.2mmol/l；间质性肺病，支气管扩张，慢性阻塞性肺病（慢性支气管炎，肺气肿），呼吸功能不全；帕金森氏病，癫痫，精神类疾病；先天性或遗传性疾病；法定传染病（包含甲类和乙类）；严重烧伤；HIV阳性，瘫痪 ，智力障碍，严重视力障碍或严重听力障碍，中重度残疾，接受过组织或器官移植或造血干细胞移植。</p>
                <p>（2）1年内曾罹患的症状：进食梗噎感或吞咽困难；不明原因皮下出血点，咳血，呕血，便血（非痔疮出血）或黑便，血尿，中重度贫血（男性Hb&lt;11g/dl, 女性Hb&lt;9g/dl）；不明原因的持续或间歇性疼痛（超过1个月）；黑痣增大，不明原因持续或反复发热（超过2周），皮肤或粘膜的溃疡久治不愈；不明原因持续消化不良，黄疸；浮肿，蛋白尿；抽搐，进行性加重的震颤，肌肉萎缩，运动功能障碍；任何不明性质的包块，肿块，结节，占位，息肉，囊肿或赘生物；消瘦（非健身原因所致的6个月内体重减轻5公斤以上），体格指数（体重kg/身高m^2）≥32或≤16（成年人）。</p>
                <p>（3）适用于女性被保险人：曾患有葡萄胎或其他妊娠滋养细胞疾病，宫颈不典型增生，多囊卵巢综合征，乳腺结节；半年内存在阴道异常出血，乳头异常溢液，疼痛，糜烂或回缩，乳房表面皮肤凹陷，皱褶或皮肤收缩的症状。</p>
                <p>（4）2周岁（含）以下被保险人：出生时体重低于2.5公斤，是否早产，窒息，发育迟缓，脑瘫。</p>
                <br />
                <p style="font-size: .3rem;line-height: .46rem;font-weight: 700;">上述“2、【就医行为】”中：</p>
                <p><b>1、2年内的住院不包含如下原因住院 </b></p>
                <p>（1）妊娠分娩，不伴有妊娠并发症或合并症；</p>
                <p>（2）外伤（非颅脑外伤、非多发外伤）已痊愈，无需后续治疗，无后遗症未遗留残障；</p>
                <p>（3）急性阑尾炎已手术，急性胃肠炎（无慢性胃炎肠炎病史）；</p>
                <p>（4）急性上呼吸道感染，无并发症；</p>
                <p>（5）急性肺炎单次发作，无并发症已痊愈； </p>
                <p>（6）新生儿母乳性黄疸无其他并发症。</p>
                <p><b>2、1年内的医学检查异常不包含如下事项： </b></p>
                <p>（1）乳腺小叶增生无结节或囊肿，或诊断为1-2期乳腺增生；</p>
                <p>（2）轻度脂肪肝不伴有肝功能异常、不伴有血糖异常、不伴有肥胖、不伴有嗜酒（每日饮白酒大于3两）；</p>
                <p>（3）血脂升高不伴有体格指数≥28，高血压，血糖升高，动脉硬化，且未服药情况下甘油三酯&lt;4mmol/l，同时总胆固醇&lt;7mmol/l。</p>
                <p>（4）矫正视力正常的屈光不正或超重未达体格指数32的情况。</p>
            </div>
        </script>
    </div>
</template>


<script src="./index.js"></script>
<style scoped src="./index.scss"></style>