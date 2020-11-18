import dHeader from '../../components/dHeader'
import tabs from '../../components/tabs'
import dInput from '../../components/dInput'
import autoRenewal from '../../components/autoRenewal'
import agreement from '../../components/agreement'
import radio from '../../components/radio'
import getMobile from '../../../productDetail/config/mobile'
import Verify from '../../../../common/verify'
import { getCardInfo } from '../../../../common/utils/card'
import { format as formatDate } from '../../../../common/utils/date'
import { getInsurData, simpleUnderwrite } from 'services/productDetail'
import traceBack from '../../components/traceBack'
import Toast from 'components/toast'
// 滚动手机号数量
const MOBILE_NUMBER = 100
export default {
    components: {
        dHeader,
        tabs,
        dInput,
        autoRenewal,
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
    data () {
        return {
            banner: require('./images/banner.jpg'),
            tags: [
                { name: '责任全面', icon: require('./images/icon-item1.png') },
                { name: '全家保障', icon: require('./images/icon-item2.png') },
                { name: '最多保五人', icon: require('./images/icon-item3.png') }
            ],
            insuredList: getMobile(MOBILE_NUMBER),
            showPlanDetail: false,
            tabs: [{ name: '产品详情', anchor: 'detail' }, { name: '常见问题', anchor: 'question' }, { name: '我要投保', anchor: 'holder' }],
            renewalSwtich: true,
            formData: {
                holder: {   // 投保人
                    holderName: "",     // 姓名
                    holderType: "1",    // 投保人类型 1个人、2团队
                    idcartNo: "",       // 证件号码
                    idcartType: "01",   // 证件类型 01:身份证
                    mobile: "",         // 手机号
                    sex: "",            // 性别
                    addrsName: "广东省 深圳市 福田区",
                    areaCode: "440304",
                    areaName: "福田区",
                    businessName: "01|一般职业",
                    cityCode: "440300",
                    cityName: "深圳市",
                    country: "1010090156",
                    countryName: "中国",
                    detailedAddr: "福华一路117号",
                    identifyLongValid: "1",
                    provinceCode: "440000",
                    provinceName: "广东省",
                    releation: "0"
                },
                insureds: [{ // 被保人
                    insuredName: "",    // 姓名
                    idcartType: "01",   // 证件类型
                    idcartNo: "",       // 证件号码
                    insuredType: "1",   // 被保人类型 1个人、2团队
                    releation: "0",     // 投保人与被保人关系 0:本人
                    sex: "",            // 性别
                    addrsName: "广东省 深圳市 福田区",
                    areaCode: "440304",
                    areaName: "福田区",
                    businessName: "01|一般职业",
                    cityCode: "440300",
                    cityName: "深圳市",
                    country: "1010090156",
                    countryName: "中国",
                    detailedAddr: "福华一路117号",
                    identifyLongValid: "1",
                    provinceCode: "440000",
                    provinceName: "广东省"

                }],
                policy: {
                    appTime: '',             // 投保时间（年月日时分秒）
                    businessNo: '',          // 流水号
                    insuredBgnTime: '',      // 保险起期
                    insuredEndTime: "",      // 保险止期
                    insuredQuantity: 1,      // 投保人数
                    policyPeriod: "1y",      // 保险期限
                    actualPremiumAmt: 0,     // 实际保费(单位到分)
                    originalPremiumAmt: 0,   // 原始保费(单位到分)
                    totalInsuredAmt: 0       // 总保额(单位到分)
                },
                policyExt: {
                    byStages: "1",          // 缴费方式 1:按月缴，0:一次性缴
                    autoRenewal: "1"        // 自动续保开关 0:关闭, 1:打开
                },
                product: {
                    packageCode: `${this.$route.query.productId}-T1`,  // 套餐代码
                    productCode: this.$route.query.productId   // 产品代码
                },
                saleInfo: {
                    accessPassword: "micro123", // 接入密码
                    accessUser: "micro",        // 接入用户
                    channelCode: this.$route.query.extenterpCode || "micro",  // 渠道编码
                    salesCode: this.$route.query.salesCode || ''
                },
                source: {
                    detailBizCode: this.$route.query.share || "",
                    channelSource: "0000"
                }
            },
            insuredsOption: ['本人和配偶及子女'],
            stagesOption: ['按月缴费（12期）'],
            premium: 0,         // 实际保费
            initialPremium: 0,  // 分期首月保费
            minPremium: 0,      // 分期次月保费
            tPremium: 0,        // 原始总保费
            agreementChecked: false,
            accidentFooter: false
        }
    },
    created () {
        this.getInsurData()
        this.getIssueChannel()
    },
    methods: {
        // 报价
        getInsurData () {
            let requestData = JSON.stringify({
                ...this.$route.query,
                "policy_field|byStages|factor1Value|": this.formData.policyExt.byStages
            })
            getInsurData({ requestData }).then(res => {
                if (res.resultCode == '000000') {
                    this.premium = res.premium || 0
                    this.initialPremium = res.initialPremium || 0
                    this.minPremium = res.minPremium || 0
                    this.tPremium = res.tPremium || 0
                }
            })
        },
        // 理赔指南
        viewLPZN () {
            this.$refs.traceBack.viewAgreement(2)
        },
        // 立即投保
        onInsured () {
            if (this.validate()) {
                this.$refs.traceBack.trace()
            }
        },
        // 表单验证
        validate () {
            const holder = this.formData.holder
            return new Verify()
                .test(holder.holderName).required('请填写您的姓名')
                .test(holder.idcartNo).required('请填写您的身份证号').idCard('您填写的身份证不正确')
                .test(holder.mobile).required('请填写您的手机号码').phone('您填写的手机号码不正确')
                .test(this.agreementChecked).isTrue('请先阅读并勾选协议')
                .end((res) => {
                    if (res) {
                        Toast(res[0])
                        this.$refs.tabs.scrollIntoView('holder')
                    }
                })
        },
        onSubmit () {
            const { holder, insureds, policy, policyExt } = this.formData
            holder.sex = getCardInfo(holder.idcartNo).sex === '01' ? 'M' : 'F'
            // 被保人信息
            insureds[0].insuredName = holder.holderName
            insureds[0].idcartNo = holder.idcartNo
            insureds[0].sex = holder.sex
            // 自动续保
            policyExt.autoRenewal = this.renewalSwtich ? '1' : '0'
            // 投保时间（年月日时分秒）
            policy.appTime = this.getAppTime()
            // 流水号
            policy.businessNo = this.getBusinessNo()
            // 投保开始日期
            policy.insuredBgnTime = this.getInsuredBgnTime()
            // 投保截止日期
            policy.insuredEndTime = this.getInsuredEndTime()
            // 实际保费(单位到分)
            policy.actualPremiumAmt = this.unitMinute(this.premium)
            // 原始保费(单位到分)  
            policy.originalPremiumAmt = this.unitMinute(this.tPremium)
            // 总保额(单位到分)
            policy.totalInsuredAmt = this.unitMinute(350000 + 30000 + 36000)
            // 提交核保
            this.$parent.simpleUnderwrite(this.formData)
        },
        // 获取投保时间
        getAppTime () {
            const nowDate = new Date()
            const fillZero = (str) => str < 10 ? `0${str}` : str
            return [nowDate.getFullYear(), fillZero(nowDate.getMonth() + 1), fillZero(nowDate.getDate()), fillZero(nowDate.getHours()), fillZero(nowDate.getMinutes()), fillZero(nowDate
                .getSeconds())].join('')
        },
        // 生成流水号
        getBusinessNo () {
            return `${+new Date()}${Math.floor((Math.random() * 8 + 1) * Math.pow(10, 6))}`
        },
        // 生成保险起始日期
        getInsuredBgnTime (format = "yyyyMMdd") {
            let startDate = new Date()
            startDate.setDate(startDate.getDate() + 1)
            return `${formatDate(startDate, format)}000000`
        },
        // 生成保险截止日期
        getInsuredEndTime () {
            let endDate = new Date()
            endDate.setFullYear(endDate.getFullYear() + 1)
            return `${formatDate(endDate, 'yyyyMMdd')}235959`
        },
        // 保费金额元转分
        unitMinute (num) {
            return +((num * 100).toFixed(2)) || 0
        },
        pageScroll (scrollTop) {
            this.accidentFooter = scrollTop >= 666
        },
        // 获取渠道
        getIssueChannel () {
            let channelSourceObj = ['micro', 'zhanye', 'renrentuan', '0000'];//产品渠道
            this.formData.source.channelSource = channelSourceObj[this.$route.query.issueChannel - 1];
        },
    },
    watch: {
        bindSalesCode(n) {
			if (n) {
				this.formData.saleInfo.loginSalesCode = this.$route.query.salesCode;
				this.formData.saleInfo.salesCode = n;
			}
		}
    }
}