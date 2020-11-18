import tabs from '../../components/tabs'
import dInput from '../../components/dInput'
import autoRenewal from '../../components/autoRenewal'
import footerButton from '../../components/footerButton'
import agreement from '../../components/agreement'
import radio from '../../components/radio'
import { noticeInfo,getInsurData,simpleUnderwrite } from '../../../../services/productDetail'
import Verify from '../../../../common/verify'
import { getCardInfo } from '../../../../common/utils/card'
import { format as formatDate} from '../../../../common/utils/date'
import Toast from 'components/toast';
import traceBack from '../../components/traceBack'
export default {
    name: 'super',
    components: {
        tabs,
        dInput,
        autoRenewal,
        footerButton,
        agreement,
        radio,
        traceBack
    },
    props: {
        bindSalesCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showAgreementSuper: false,
            agreementTitleSuper: "",
            agreementContentSuper:"",
            superFooter:false,// 底部是否可见
            renewalSwtich: true,       // 自动续保
            agreementChecked: false,    // 勾选协议
            tabs: [{ name: '产品详情', anchor: 'detail' }, { name: '常见问题', anchor: 'problem' }, { name: '我要投保', anchor: 'insure' }],
            activeCard:'P060448-T1',  //选中的投保类型
            card:[{
                name: '普惠版',
                value:'P060448-T1'
            }, {
                name: '尊享版',
                value:'P060448-T2'
            }],
            formData: {
                holder: {   // 投保人信息
                    holderName: "",     // 姓名
                    idcartType: "01",   // 证件类型 01:身份证
                    idcartNo: "",       // 证件号码
                    mobile: "",         // 手机号
                    mail: "",            //邮箱
                    sex: "M", 
                    age: "0",
                    bornDate: "20000601",
                    "addrsName": "辽宁省 抚顺市 望花区",
                    "areaCode": "210404",
                    "areaName": "望花区",
                    "businessName": "01|一般职业",
                    "cityCode": "210400",
                    "cityName": "抚顺市",
                    "country": "1010090156",
                    "countryName": "中国",
                    "detailedAddr": "第三方",
                    "provinceCode": "210000",
                    "provinceName": "辽宁省",
                    "releation": "0"
                },
                insureds: [{ // 被保人信息
                    insuredName: "",    // 姓名
                    idcartType: "01",   // 证件类型
                    idcartNo: "",       // 证件号码
                    mobile: "",          // 手机号
                    mail: "",            //邮箱
                    age: "20",
                    sex: "M",
                    insuredType: "1",   // 被保人类型 1个人、2团队
                    releation: "0",     // 投保人与被保人关系 0:本人
                    insuredExt: {
                        shebao: "0"    //有无社保
                    },
                    bornDate: "20000601",
                    "addrsName": "辽宁省 抚顺市 望花区",
                    "areaCode": "210404",
                    "areaName": "望花区",
                    "businessName": "01|一般职业",
                    "cityCode": "210400",
                    "cityName": "抚顺市",
                    "country": "1010090156",
                    "countryName": "中国",
                    "detailedAddr": "第三方",
                    "identifyLongValid": "1",
                    "provinceCode": "210000",
                    "provinceName": "辽宁省",
                }],
                policy: {
                    actualPremiumAmt: 0,     // 实际保费(单位到分)
                    appTime: '',             // 投保时间（年月日时分秒）
                    businessNo: '',          // 流水号
                    insuredBgnTime: '',      // 保险起期
                    insuredEndTime: "",      // 保险止期
                    insuredQuantity: 1,      // 投保人数
                    policyPeriod: "1y",      // 保险期限
                    originalPremiumAmt: 0,   // 原始保费(单位到分)
                    totalInsuredAmt: 0       // 总保额(单位到分)
                },
                tempDataMap: {
                    factorValueMap: {
                        age: "",           //被保人年龄
                        byStages: "1",    //是否分期，默认为1分期
                        shebao: "0"       //被保人有无社保
                    }
                },
                policyExt: {
                    autoRenewal: "1",        // 自动续保开关 0:关闭, 1:打开
                    byStages: "1"          // 缴费方式 1:按月缴，0:一次性缴
                },
                product: {
                    packageCode: "",  // 套餐代码
                    productCode: this.$route.query.productId   // 产品代码
                },
                saleInfo: {
                    accessPassword: "micro123", // 接入密码
                    accessUser: "micro",        // 接入用户
                    channelCode: this.$route.query.extenterpCode || "micro",  // 渠道编码
                    salesCode: this.$route.query.salesCode || ''
                },
                source:{
                    channelSource:"micro"
                }
            },
            socialInsurance:0,//有无社保
            payMethod: 0, //缴费方式
            premium: '',             // 年缴保费
            tPremium:'',          // 总保费
            initialPremium: '9',  // 首月保费
            nextPremium: '30',    // 次月保费
            questionList:[{
                title: '什么是等待期？为什么要设置等待期？',
                content: '指被保险人首次参保本保险时，自合同生效之日起到约定的一段期间以后，保险公司才开始承担给付保险金责任，此约定的一段期间称为等待期。等待期是为了防止逆选择，即投保人明知道将发生保险事故，而马上投保获利的行为。本产品各个责任的等待期有差异，重大疾病、疾病身故首次投保等待期90天（续保无等待期限制）、疾病住院医疗、疾病住院津贴责任首次投保等待期60天（续保无等待期限制），意外责任没有等待期。',
                show: false
            }, {
                title: '本产品附加重大疾病保险责任保障范围包括哪些？',
                content: '本产品附加重大疾病保险责任保障包含25种重大疾病项目，具体承保的重大疾病项目及其定义详见《华安财产保险股份有限公司附加重大疾病保险（A款）条款》条款释义。',
                show: false
            }, {
                title: '投保本产品需要体检吗？',
                content: '本产品无需体检，但您需如实填写健康告知，健康告知通过后即可快速完成投保。',
                show: false
            }, {
                title: '续保无等待期的含义是什么？',
                content: '经投保人向保险人提出续保申请，并经保险人审核同意并收取保险费后，续保合同生效，续保合同具体的生效日以保险人另行签发的保险单的日期为准。上述为同一被保险人的续保合同无等待期。如本保险产品统一停售，则保险人不再接受投保人投保申请。',
                show: false
            }, {
                title: '本产品有无投保份数限制？',
                content: '本产品每一被保险人仅限购买一份。',
                show: false
            }]
        }
    },

    created() {
        this.getIssueChannel();
    },
    methods: {
        pageScroll(scrollTop) {
            this.superFooter = scrollTop >= 750
        },
        // 理赔指南
        viewLPZN () {
            this.$refs.traceBack.viewAgreement(2)
        },
        // 立即投保
        onInsuredBottom () {
            if (this.validate()) {
                this.$refs.traceBack.trace({
                    title: '健康告知事项',
                    content: this.$refs.health.innerHTML
                })
            }
        },
        // 底部立即投保
        onSubmit() {
            let { holder, insureds, policy, policyExt,product, tempDataMap,saleInfo } = this.formData
            let holderInfo=getCardInfo(holder.idcartNo)
            holder.sex = holderInfo.sex === '01' ? 'M' : 'F'
            holder.bornDate = holderInfo.birthDay
            holder.age = ""+holderInfo.age
            tempDataMap.factorValueMap.shebao = insureds[0].insuredExt.shebao = this.socialInsurance == 0 ? "1" : "0"
            policyExt.autoRenewal = this.renewalSwtich ? 1 : 0
            product.packageCode = this.activeCard;
            if (holder.releation==0) { //为本人投保
                insureds[0].insuredName = holder.holderName
                insureds[0].idcartNo = holder.idcartNo
                insureds[0].mobile = holder.mobile
                insureds[0].mail= holder.mail
            }
            let insuredsInfo = getCardInfo(insureds[0].idcartNo);
            tempDataMap.factorValueMap.age=insureds[0].age =""+ insuredsInfo.age;
            insureds[0].sex = insuredsInfo.sex === '01' ? 'M' : 'F'
            insureds[0].bornDate = insuredsInfo.birthDay
            insureds[0].releation = holder.releation
            policy.appTime = this.getAppTime()
            policy.businessNo = this.getBusinessNo()
            policy.insuredBgnTime = this.getInsuredBgnTime()
            policy.insuredEndTime = this.getInsuredEndTime()
            policy.actualPremiumAmt = this.unitMinute(this.tPremium)
            policy.originalPremiumAmt = this.unitMinute(this.tPremium)
            policy.totalInsuredAmt = 0;
            if (this.activeCard==='P060448-T1') {
                policy.totalInsuredAmt =this.unitMinute((30+3+1+100+10+20)*10000)
            } else {
                policy.totalInsuredAmt =this.unitMinute((50+5+1+500+50+50+20+30+3.6+3.6)*10000)
            }
            // 提交核保
            this.$parent.simpleUnderwrite(this.formData)
        },
        // 表单验证
        validate() {
            let { holder, insureds } = this.formData;
            holder.holderName=holder.holderName.replace(/\s*/g,'');
            holder.idcartNo=holder.idcartNo.replace(/\s*/g,'');
            holder.mobile = holder.mobile.replace(/\s*/g, '');
            const verify = new Verify()
                .test(holder.holderName).required('请填写您的姓名')
                .test(holder.idcartNo).required('请填写您的身份证号').idCard('您填写的身份证不正确')
                .test(holder.mobile).required('请填写您的手机号码').phone('您填写的手机号码不正确')
            if (holder.mail) {
               verify.test(holder.mail).email('您填写的邮箱不正确')
            }
            if (holder.releation=="1" ||holder.releation=="2"||holder.releation=="3") {
                verify.test(insureds[0].insuredName).required('请填写被保人的姓名')
                verify.test(insureds[0].idcartNo).required('请填写被保人的身份证号').idCard('被保人的身份证号填写不正确')
                verify.test(insureds[0].mobile).required('请填写被保人的手机号码').phone('被保人的手机号码填写不正确')
                if (insureds[0].mail) {
                    verify.test(insureds[0].mail).email('被保人的邮箱填写不正确')
                }
            }
            verify.test(this.agreementChecked).isTrue('请先阅读并勾选协议')
            return verify.end(res => {
                if (res) {
                    Toast(res[0])
                    if ('请先阅读并勾选协议' === res[0]) return
                    let name = 'insure'
                    this.$refs.tabs.scrollIntoView(name)
                }
            })
        },
        //切换投保方案
        changeSuperType(index,item) {
            this.activeCard = item.value;
            this.getInsurPriceInfo();
        },
        //切换有无社保
        changeSocialInsur() {
            this.$nextTick(() => {
                this.getInsurPriceInfo();
            });
        },
        // 检验身份证是否合格请求报价
        idcartNoChange (flag) {
            // 如果有被保人信息，那本人身份证输入框触发，则不执行获取报价信息
           // if (!this.isSelf && flag) return
            let releation = this.formData.holder.releation;
            let idcartNo = releation == 0 ? this.formData.holder.idcartNo : this.formData.insureds[0].idcartNo;
            let isTrue = new Verify().test(idcartNo).idCard().end()
            // 身份证为空或者不符合，直接返回
            if (isTrue) {
                setTimeout(this.getInsurPriceInfo, 20)
            }
        },
        // 获取投保时间
        getAppTime () {
            const nowDate = new Date()
            const fillZero = (str) => str < 10 ? `0${str}` : str
            return [nowDate.getFullYear(),fillZero(nowDate.getMonth()+1),fillZero(nowDate.getDate()),fillZero(nowDate.getHours()),fillZero(nowDate.getMinutes()),fillZero(nowDate
            .getSeconds())].join('')
        },
        // 生成流水号
        getBusinessNo () {
            return `${+new Date()}${Math.floor((Math.random() * 8 + 1) * Math.pow(10,6))}`
        },
        // 生成保险起始日期
        getInsuredBgnTime (format = "yyyyMMdd") {
            let startDate = new Date()
            startDate.setDate(startDate.getDate() + 1)
            return `${formatDate(startDate,format)}000000`
        },
        // 生成保险截止日期
        getInsuredEndTime () {
            let endDate = new Date()
            endDate.setFullYear(endDate.getFullYear() + 1)
            return `${formatDate(endDate,'yyyyMMdd')}235959`
        },
        unitMinute (num) {
            return +((num * 100).toFixed(2))
        },
        // 获取渠道
        getIssueChannel() {
            let channelSourceObj = ['micro', 'zhanye', 'renrentuan', '0000'];//产品渠道
            this.formData.source.channelSource=channelSourceObj[this.$route.query.issueChannel-1];
            if(['2','3'].indexOf(this.$route.query.issueChannel)>=0 && this.$route.query.extenterpCode){//子渠道编码
                this.formData.saleInfo.subChannelCode=this.$route.query.extenterpCode;
                this.formData.saleInfo.channelCode="micro";
            }
        },
        // 通过身份证获取年龄
        getAge(identityCard) {
            var len = (identityCard + "").length;
            if (len == 0) {
                return 0;
            } else {
                if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
                {
                    return 0;
                }
            }
            var strBirthday = "";
            if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
            {
                strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
            }
            if (len == 15) {
                strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
            }
            //时间字符串里，必须是“/”
            var birthDate = new Date(strBirthday);
            var nowDateTime = new Date();
            var age = nowDateTime.getFullYear() - birthDate.getFullYear();
            //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
            if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
                age--;
            }
            return ""+age;
        },
        // 报价
        getInsurPriceInfo() {
            let shebao = this.socialInsurance == 0 ? 1 : 0;
            let releation = this.formData.holder.releation;
            let idcartNo = releation == 0 ? this.formData.holder.idcartNo : this.formData.insureds[0].idcartNo;
            let age = this.getAge(idcartNo);
            let requestData=JSON.stringify({
                ...this.$route.query,
                "nspFlag": "1",
                "premiumType": "2",
                "productPlanId": this.activeCard,     //保险方案
                "insured_field|shebao|factor2Value|": shebao,  //有无社保
                "insured|age|factor1Value|": age,    //年龄
                "securityPeriod": "365",
                "policy_field|byStages|factor3Value|": "1"  //是否分期，固定为分期
            })
            getInsurData({ requestData }).then(res => {
                if (res.resultCode == '000000') {
                    this.premium =''+(res.premium || 0)
                    this.initialPremium = ''+(res.initialPremium || 0)
                    this.nextPremium = ''+(res.minPremium || 0)
                    this.tPremium = ''+(res.tPremium || 0)
                }
            })
        }
    },
    watch:{
        bindSalesCode(n) {
			if (n) {
				this.formData.saleInfo.loginSalesCode = this.$route.query.salesCode;
				this.formData.saleInfo.salesCode = n;
			}
		}
    }
}
