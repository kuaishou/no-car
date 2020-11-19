import dHeader from '../../components/dHeader'
import tabs from '../../components/tabs'
import dInput from '../../components/dInput'
import autoRenewal from '../../components/autoRenewal'
import footerButton from '../../components/footerButton'
import agreement from '../../components/agreement'
import { getInsurData } from 'services/productDetail'
import radio from '../../components/radio'
import Toast from 'components/toast';
import issueChannel from '../../components/issueChannel'
import { getCardInfo } from '../../../../common/utils/card'
import { format as formatDate } from '../../../../common/utils/date'
import Verify from '../../../../common/verify'
import { isAndroid, $location, isWeiXin } from '../../../../common/utils/browser'
import traceBack from '../../components/traceBack'

const xyText = '请先阅读并勾选协议'
export default {
	name: 'family',
	components: {
		dHeader,
		tabs,
		dInput,
		autoRenewal,
		footerButton,
		agreement,
		radio,
		issueChannel,
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
			renewalSwtich: true,       // 自动续保
			agreementChecked: false,    // 勾选协议
			discount: '', 	// 是否折扣
			tPremium: '',	// 总保费
			premium: '',    // 实际保费
			dayPremium: '',  // 每日保费
			totalInsuredAmt: '', //总保额
			currentIndex: 0, //当前下标, 经典版还是优选版
			moneyList: moneyListData, // 保额列表
			tabs: [
				{ name: '产品详情', anchor: 'detail' },
				{ name: '常见问题', anchor: 'question' },
				{ name: '我要投保', anchor: 'insure' }
			],
			banner: require('./images/hjb_1.png'),
			tags: [
				{ name: '意外保障', icon: require('./images/hjb_icon1.png') },
				{ name: '财产保障', icon: require('./images/hjb_icon2.png') },
				{ name: '最多保8人', icon: require('./images/hjb_icon3.png') }
			],
			agreementTitle: '',     // 协议标题
			agreementContent: '',   // 协议内容
			showAgreement: false,   // 显示协议弹窗
			formData: { //拷过来的数据
				holder: {
					addrsName: "广东省 深圳市 福田区", //地址
					areaCode: "440304", //区code
					areaName: "福田区", //区名称
					bornDate: "", //出生日期
					businessName: "01|一般职业", //职业
					cityCode: "440300", //城市code
					cityName: "深圳市", //城市名称
					country: "1010090156", //国家code
					countryName: "中国", //国家名称
					detailedAddr: "福华一路117号", //地址
					holderName: "", //投保人姓名
					idcartNo: "", //投保人证件号码
					idcartType: "01", //证件类型 01:身份证
					identifyLongValid: "1", //是否长期有效
					mail: "", //邮箱
					mobile: "", //手机号
					provinceCode: "440000", //省code
					provinceName: "广东省", //省名称
					releation: "0", // 投保人与被保人关系 0:本人
					sex: "" //性别
				},
				insureds: [ // 被保人
					{
						addrsName: "广东省 深圳市 福田区",
						areaCode: "440304",
						areaName: "福田区",
						bornDate: "",
						businessName: "01|一般职业",
						cityCode: "440300",
						cityName: "深圳市",
						country: "1010090156",
						countryName: "中国",
						detailedAddr: "福华一路117号",
						idcartNo: "",
						idcartType: "01",
						identifyLongValid: "1",
						insuredName: "", //被保人姓名
						mail: "", //被保人邮箱
						mobile: "", //被保人手机
						provinceCode: "440000",
						provinceName: "广东省",
						releation: "0",
						sex: ""
					}
				],
				policy: {
					actualPremiumAmt: '', // 实际保费(单位到分)
					appTime: "",// 投保时间（年月日时分秒）示例:20200715102745
					businessNo: "", // 流水号, 示例:1594780065444r56
					insuredBgnTime: "", // 保险起期, 示例:20200716000000
					insuredEndTime: "", // 保险止期, 示例:20210715235959
					insuredQuantity: 1, // 投保人数
					originalPremiumAmt: '', // 原始保费(单位到分) 示例:58000
					policyPeriod: "1y", // 保险期限
					totalInsuredAmt:  ''// 总保额(单位到分) 示例:2655000000
				},
				policyExt: {
					autoRenewal: "1" // 自动续保开关 0:关闭, 1:打开
				},
				product: {
					packageCode: "P133101-T2", // 套餐代码: 优选版P133101-T1, 经典版P133101-T2
					productCode: "P133101" // 产品代码
				},
				saleInfo: {
					accessPassword: "micro123", // 接入密码
					accessUser: "micro", // 接入用户
					channelCode: this.$route.query.extenterpCode || "micro", // 渠道编码
					salesCode: this.$route.query.salesCode || ''
				},
				source: {
					channelSource: "micro"
				}
			},
			isFixedFoot: false, //底部按钮是否吸底
			insuredsOption: ['本人、配偶、子女及双方父母'],
			stagesOption: ['0 至 85 周岁'],
			claimOption: ['按年缴费'],
			stages: '0',     // 缴费方式
			claim: '0',     // 一般医疗保险金年度累计免赔额
			isZSB: false, //是否掌上宝环境
			issueChannelSwitch: false, // 渠道出单开关
			issueChannelDeptCode: '', 	// 部门code
			issueChannelSalesCode: '', // 代理人Code
			extBranchCode: '',
			businesSource: '',
			schjb:require('./images/hjb_6.png')
		}
	},
	computed: {
		currentList() { //保额价格列表
			const { moneyList, currentIndex } = this
			return moneyList[currentIndex].list
		}
	},
	created() {
		let hjbProductId=this.$route.query.productId;
		if(hjbProductId == 'P133103'){
			this.formData.product.productCode = 'P133103'
			this.formData.product.packageCode = "P133103-T2";
			this.moneyList[0].packageCode = 'P133103-T2';//套餐代码
			this.moneyList[0].list[9].value='2万'
			this.moneyList[0].totalInsuredAmt='13940000'
			this.moneyList[1].packageCode = 'P133103-T1';//套餐代码
			this.moneyList[1].totalInsuredAmt='26100000'
			this.moneyList[1].list[9].value='5万';
			
			this.schjb = require('./images/schjb_6.png');
		}
		this.init()
	},
	mounted() {
		const { query } = this.$route
		const _rp_info = JSON.parse(sessionStorage.getItem('rp_info')) || {}
		let { ms, haibaoShare, issueChannel, salesCode, name, phone } = _rp_info
		//ms: 媒体来源
		let _flag = false //是否显示海报按钮的标识
		if ((haibaoShare && haibaoShare=='1') || (query.haibaoShare && query.haibaoShare=='1')) {//从海报分享扫码过来的链接始终不再显示海报
			_flag = false;
		} else if ((issueChannel=='2' && !salesCode) || (query.issueChannel=='2' && !query.salesCode)) {//如果展业过来的，但是连salesCode都没有，那始终不能展示海报，因为无法记录业绩归属
			_flag = false;
		} else if ((issueChannel=='2' && ms != 'zhanye-app-share') || (query.issueChannel=='2' && query.ms != 'zhanye-app-share') && !isWeiXin()) {//展业过来的但不是展业分享出去的情况,也不能是微信端
			_flag = true;
		} else if ((issueChannel=='3' && name &&  phone) || (query.issueChannel=='3' && query.name && query.phone) && isWeiXin() ) {//人人团过来的，必须有传name和phone，同时是微信端，也显示海报，只是点击下载和分享时提示长按图片自己保存和分享
			_flag = true;
		}
		this.isZSB = _flag
	},
	methods: {
		init() {
			this.getIssueChannel()
			this.onCurrentChange(this.currentIndex)
			if (isAndroid()){ // 解决安卓输入框被键盘挡住问题
				window.addEventListener('resize', () => {
					const activeElement = document.activeElement
					if (activeElement && activeElement.tagName == 'INPUT') {
						setTimeout(() => {
							activeElement.scrollIntoViewIfNeeded()
						}, 100)
					}
				})
			}
		},
		getAppTime () { // 获取投保时间
			const nowDate = new Date()
			const fillZero = (str) => str < 10 ? `0${str}` : str
			return [nowDate.getFullYear(),fillZero(nowDate.getMonth()+1),fillZero(nowDate.getDate()),fillZero(nowDate.getHours()),fillZero(nowDate.getMinutes()),fillZero(nowDate
			.getSeconds())].join('')
		},
		getBusinessNo () { // 生成流水号
			return `${+new Date()}${Math.floor((Math.random() * 8 + 1) * Math.pow(10,6))}`
		},
		getIssueChannel() { // 获取渠道
			let channelSourceObj = ['micro', 'zhanye', 'renrentuan', '0000'];//产品渠道
			this.formData.source.channelSource=channelSourceObj[this.$route.query.issueChannel-1];
			if(['2','3','4'].indexOf(this.$route.query.issueChannel)>=0 && this.$route.query.extenterpCode){//子渠道编码
				if (this.$route.query.issueChannel === '4') {
                    this.formData.saleInfo.channelCode = this.$route.query.extenterpCode
                } else {
                    this.formData.saleInfo.subChannelCode=this.$route.query.extenterpCode;
                    this.formData.saleInfo.channelCode="micro";
                }
			}
		},
		getInsuredBgnTime (format = "yyyyMMdd") { // 生成保险起始日期
			let startDate = new Date()
			startDate.setDate(startDate.getDate() + 1)
			return `${formatDate(startDate,format)}000000`
		},
		getInsuredEndTime () { // 生成保险截止日期
			let endDate = new Date()
			endDate.setFullYear(endDate.getFullYear() + 1)
			return `${formatDate(endDate,'yyyyMMdd')}235959`
		},
		unitMinute (num) {
			return +((num * 100).toFixed(2))
		},
		validate() { // 表单验证
			const { holder } = this.formData
			holder.holderName = holder.holderName.replace(/\s*/g,'');
			holder.idcartNo = holder.idcartNo.replace(/\s*/g,'');
			holder.mobile = holder.mobile.replace(/\s*/g,'');
			const verify = new Verify()
			if (this.issueChannelSwitch) {  // 渠道出单是否选择了代理人或者经办渠道，没有则代表未完善
                verify.test(!!this.issueChannelSalesCode).isTrue('请完善渠道出单信息')
            }
			return verify.test(holder.holderName).required('请填写您的姓名')
					.test(holder.idcartNo).required('请填写您的身份证号').idCard('您填写的身份证不正确')
					.test(holder.mobile).required('请填写您的手机号码').phone('您填写的手机号码不正确')
					.test(this.agreementChecked).isTrue(xyText)
					.end((res) => {
						if (res ) {
							Toast(res[0])
							if (res.length == 1 && res[0] == xyText) {
								return
							}
							this.viewAnchor('insure')
						}
					})
		},
		viewAnchor (key) {
			this.$refs.tabs.scrollIntoView(key)
		},
		// 立即投保
		onInsured() {
			if (this.validate()) {
				this.$refs.traceBack.trace()
			}
		},
		// 提交核保
		onSubmit() {
			let { holder, insureds, policy, saleInfo, policyExt } = this.formData
			const { isChannelShare, departmentCode, shareExtenterpCode, businesSource, extBranchCode }  = this.$route.query
			const _cardInfo = getCardInfo(holder.idcartNo)
			holder.sex = _cardInfo.sex === '01' ? 'M' : 'F'
			holder.bornDate = _cardInfo.birthDay.replace(/-/g, '')

			insureds[0].insuredName = holder.holderName
			insureds[0].idcartNo = holder.idcartNo
			insureds[0].sex = holder.sex
			insureds[0].bornDate = holder.bornDate
			insureds[0].mobile = holder.mobile

			policy.appTime = this.getAppTime()
			policy.businessNo = this.getBusinessNo()
			policy.insuredBgnTime = this.getInsuredBgnTime()
			policy.insuredEndTime = this.getInsuredEndTime()
			policy.actualPremiumAmt = this.unitMinute(this.premium)
			policy.originalPremiumAmt = this.unitMinute(this.tPremium)
			policy.totalInsuredAmt = this.unitMinute(this.totalInsuredAmt)
			// 开启渠道出单，新增入参
			if (this.issueChannelSwitch) {
				saleInfo.departmentCode = this.issueChannelDeptCode
				saleInfo.subChannelCode = this.issueChannelSalesCode
				policyExt.businesSource = this.businesSource
				policyExt.extBranchCode = this.extBranchCode
			} 
			// 用户渠道出单投保未过，又关闭了渠道出单，那么要把渠道出单参数去掉 
			else if(saleInfo.departmentCode) {
                delete saleInfo.departmentCode
                delete saleInfo.subChannelCode
                delete policyExt.businesSource
                delete policyExt.extBranchCode
            }
			// 如果是渠道出单分享客户承保，客户投保时要带上承保代理人信息
			if (isChannelShare) {
				saleInfo.departmentCode = departmentCode
				saleInfo.subChannelCode = shareExtenterpCode
				policyExt.businesSource = businesSource
				policyExt.extBranchCode = extBranchCode
			}
			// 提交核保
            this.$parent.simpleUnderwrite(this.formData)
		},
		pageScroll(scrollTop) {
			this.isFixedFoot = scrollTop >= 750
		},
		viewAgreement (item) { //查看协议
			this.agreementTitle = item.TITLE
			this.agreementContent = item.CONTENT
			this.showAgreement = true
		},
		onCurrentChange(i) {
			this.currentIndex = i
			this.dayPremium = this.moneyList[i].dayPremium
			this.totalInsuredAmt = this.moneyList[i].totalInsuredAmt
			this.formData.product.packageCode = this.moneyList[i].packageCode
			this.getInsurData()
		},
		// 报价
		getInsurData () {
            let requestData = JSON.stringify({
				...this.$route.query,
                "nspFlag": "1",       // NSP系统 固定传1
                "premiumType": "1",     // 保费类型
				"productPlanId": this.formData.product.packageCode,  // 套餐编码
				"securityPeriod": "1y"
            })
            getInsurData({ requestData }).then(res => {
                if (res.resultCode == '000000') {
					this.premium = res.premium
					this.tPremium = res.tPremium
					this.discount = res.discount
                }
            })
		},
		// 渠道出单回调
		channelHandle(deptCode, salesCode, flag) {
			if (flag == 'businessType') {
				this.businesSource = salesCode
			} else if (flag == 'agent') {
				this.issueChannelDeptCode = deptCode
				this.issueChannelSalesCode = salesCode
			} else {
				this.extBranchCode = salesCode
			}
		}
	},
	watch: {
		renewalSwtich(v) {
			this.formData.policyExt.autoRenewal = v ? '1' : '0'
		},
		bindSalesCode(n) {
			if (n) {
				this.formData.saleInfo.loginSalesCode = this.$route.query.salesCode;
				this.formData.saleInfo.salesCode = n;
			}
		}
	}
}

const moneyListData = [
	{
		name: '经典版',
		anchor: 'jdb',
		premium: '365', //总保费
		dayPremium: '1.0', //每日保费
		totalInsuredAmt: '14120000', //总保额
		packageCode: 'P133101-T2', //套餐代码
		list: [
			{ name: '意外伤害保险', value: '' },
			{ name: '　　主被保人：', value: '20万/人' },
			{ name: '　　其他被保人：', value: '3万/人' },
			{ name: '意外伤害医疗保险（共享保额）', value: '3万' },
			{ name: '飞机意外伤害保障', value: '100万/人' },
			{ name: '自然灾害意外伤害保险', value: '30万/人' },
			{ name: '电梯意外伤害保障', value: '30万/人' },
			{ name: '家庭财产保险（共享保额）', value: '60万' },
			{ name: '第三者责任险（共享保额）', value: '8万' },
			{ name: '个人账户资金损失险（共享保额）', value: '20万' },
			{ name: '保险期限', value: '一年' },
			{ name: '被保人数', value: '最多8人' }
		]
	},
	{
		name: '优选版',
		anchor: 'yxb',
		premium: '580', //总保费
		dayPremium: '1.5', //每日保费
		totalInsuredAmt: '26550000', //总保额
		packageCode: 'P133101-T1', //套餐代码
		list: [
			{ name: '意外伤害保险', value: '' },
			{ name: '　　主被保人：', value: '50万/人' },
			{ name: '　　其他被保人：', value: '5万/人' },
			{ name: '意外伤害医疗保险（共享保额）', value: '10万' },
			{ name: '飞机意外伤害保障', value: '200万/人' },
			{ name: '自然灾害意外伤害保险', value: '50万/人' },
			{ name: '电梯意外伤害保障', value: '50万/人' },
			{ name: '家庭财产保险（共享保额）', value: '100万' },
			{ name: '第三者责任险（共享保额）', value: '10万' },
			{ name: '个人账户资金损失险（共享保额）', value: '50万' },
			{ name: '保险期限', value: '一年' },
			{ name: '被保人数', value: '最多8人' }
		]
	},
]
