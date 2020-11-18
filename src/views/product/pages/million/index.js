import dHeader from '../../components/dHeader'
import tabs from '../../components/tabs'
import dInput from '../../components/dInput'
import autoRenewal from '../../components/autoRenewal'
import footerButton from '../../components/footerButton'
import agreement from '../../components/agreement'
import radio from '../../components/radio'
import dropdownMenu from '../../components/dropdownMenu'
import answer from '../../components/answer'
import myDialog from '../../components/myDialog'
import issueChannel from '../../components/issueChannel'
import { getInsurData, simpleUnderwrite, queryIntellectQuestion,recognize } from 'services/productDetail'
import Verify from 'common/verify'
import { getCardInfo } from 'common/utils/card'
import Toast from 'components/toast';
import { format as formatDate} from 'common/utils/date'
import { imagesCompress} from 'common/utils/images'
import queryPremium from './premium'
import { Loading } from 'components/loading'
import traceBack from '../../components/traceBack'

export default {
    components: {
        dHeader,
        tabs,
        dInput,
        autoRenewal,
        footerButton,
        agreement,
        radio,
        dropdownMenu,
        answer,
        myDialog,
        issueChannel,
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
            dateOption: { //保险起期和保险止期变量的集合
                startDate: null,
                endDate: null,
                minDate: null,
                maxDate: null,
                isStartDate: false
            },
            showHB: false,
            premium: 0,         // 年缴保费
            initialPremium: 3,  // 分期首月保费
            minPremium: 12,      // 分期次月保费
            tPremium: 0,         // 总保费
            discount: '',       // 折扣
            tabs: [{ name: '产品详情', anchor: 'detail' }, { name: '常见问题', anchor: 'question' }, { name: '我要投保', anchor: 'holder' }],
            formData: {
                holder: {   // 投保人
                    holderName: "",     // 姓名
                    holderType: "1",    // 投保人类型 1个人、2团队
                    idcartNo: "",       // 证件号码
                    idcartType: "01",   // 证件类型 01:身份证
                    mobile: "",         // 手机号
                    sex: "",            // 性别
                    // releation: "0",  // 投保人与被保人关系 0本人，1配偶，2父母，3子女
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
                },
                insureds: [{ // 被保人
                    insuredName: "",    // 姓名
                    idcartType: "01",   // 证件类型
                    idcartNo: "",       // 证件号码
                    insuredType: "1",   // 被保人类型 1个人、2团队
                    sex: "",            // 性别
                    releation: "0",     // 投保人与被保人关系 0本人，1配偶，2父母，3子女
                    insuredExt: {
                        shebao: "1"     // 有无社保 0无 1有
                    },
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
                policyExt: {
                    byStages: "1",          // 缴费方式 1:按月缴，0:一次性缴
                    autoRenewal: "1"        // 自动续保开关 0:关闭, 1:打开
                },
                product: {
                    packageCode: '',  // 套餐代码
                    productCode: this.$route.query.productId   // 产品代码
                },
                saleInfo: {
                    accessPassword: "micro123", // 接入密码
                    accessUser: "micro",        // 接入用户
                    channelCode: this.$route.query.extenterpCode || "micro",  // 渠道编码
                    salesCode: this.$route.query.salesCode || ''
                },
                source: {
                    channelSource: "micro"
                },
                tempDataMap: {
                    factorValueMap: {
                        age: "",      // 年龄
                        byStages: "1",  // 缴费方式
                        shebao: "1"     // 有无社保 0无 1有
                    }
                }
            },
            insuredsOption: ['本人', '配偶', '父母', '子女'],
            stagesOption: ['年缴', '月缴（12期）'],
            sebaoOption: ['无医保', '有医保'],
            claimOption: ['1万元', '5千元'],
            claim: '0',     // 一般医疗保险金年度累计免赔额
            renewalSwtich: true,   // 自动续保开关
            agreementChecked: false,  // 勾选协议
            showPlanDetail: false,  // 保障计划详情
            showHealth: false,     // 展示健康告知
            showPremium: false,     // 查看保费详情
            filterOption: [{
                index: 0,
                list: ['首年', '续保']
            }, {   // 筛保费筛选下拉框展示选项
                index: 0,   // 默认值
                list: ['有医保', '无医保']
            }, {
                index: 0,
                list: ['月缴', '年缴']
            }, {
                index: 0,
                list: ['1万元免赔额', '5千元免赔额']
            }],
            premiumData: [], // 保费数据
            questionList:[{
                title: '本保障计划是否有等待期？',
                content: '本保障计划因疾病导致的责任范围内的医疗责任等待期为30天，扁桃腺、甲状腺、疝气、女性生殖系统疾病的检查与治疗等待期为120天。续保或因遭受意外伤害导致的责任范围内的医疗责任无等待期。',
                show: false
            }, {
                title: '可以赔付哪些医疗费用？',
                content: '被保险人因遭受意外伤害事故或在等待期后因患疾病在二级及以上的公立医院普通部接受住院、住院前30天（含住院当日）和出院后30天（含出院当日）门急诊（与该次住院相同原因）、特殊门诊和门诊手术治疗的，对于责任内个人支付超过免赔额的部分，按约定的赔付比例给付，不限医保目录范围，合理且必需的进口药自费药均可赔付。<br/>此外，若被保险人在等待期后初次确诊罹患恶性肿瘤，承担责任内的恶性肿瘤相关的院外特定药品费用以及在上海市质子重离子医院接受质子重离子治疗的医疗费用。',
                show: false
            }, {
                title: '年免赔额1万元，怎么理解? 什么情况下没有免赔额？',
                content: '保险期间内，属于保险责任范围且由您个人支付的医疗费用，累计超过1万元部分由华安保险赔付。在其他商业保险或其他第三方已赔付部分可用于抵扣免赔额，但基本医保或公费医疗赔付部分不能用于抵扣免赔额。<br/>如被保险人因遭受意外伤害事故或在等待期后初次确诊罹患本合同约定的120种重大疾病在医院接受治疗的，则被保险人自该重大疾病确诊并接受住院治疗之日起发生的保险责任内的医疗费用不再扣除免赔额。 质子重离子医疗责任和恶性肿瘤特定药品费用医疗责任中的免赔额均为0元。',
                show: false
            }, {
                title: '投保前已经生的病可以赔付么？',
                content: '不可以，本险种不接受带病投保的行为。首次投保前已患有的疾病以及症状，均不属于保障范围。',
                show: false
            }, {
                title: '发生理赔后是否支持续保？',
                content: '如首年投保如实告知，保险人不会因被保险人的健康变化及历史理赔情而拒绝续保。同时，本产品为一年期非保证续保产品，在如下情况下不再接受续保：<br/>（1）续保时被保险人的年龄超过100周岁。<br/>（2）本保险产品统一停售。<br/>（3）被保险人身故。',
                show: false
            }],
            answerList: [], //问答列表
            isAnswerShow: false,
            issueChannelSwitch: false, // 渠道出单-开关
            issueChannelDeptCode: '',  // 渠道出单-部门code
            issueChannelSalesCode: '', // 渠道出单-代理人code
            extBranchCode: '',
			businesSource: '',
        }
    },
    created () {
        if (this.$route.query.extenterpCode === '0107100327') {//扬子江渠道接入用户密码
            this.formData.saleInfo.accessUser='yzj';
            this.formData.saleInfo.accessPassword='yzj123';
        };
        this.getInsurData(11)  // 初始化报价
        this.getIssueChannel() // 获取渠道
        this.iniDate() //初始化日期范围
        this.isSubmitFlag = false // 提交按钮防止多次提交接口
        const res = this.filterOption.map(item => item.index) // 初始化保费数据
        this.premiumData = queryPremium(res[0], res[1], res[2], res[3])
        this.getQueryIntellectQuestion(false) //获取健康问答数据
    },
    methods: {
        // 投保人身份图片上传
        imgHolderUpload(event) {
            this.getOcrImg(event, 0)
        },
        // 被投保人身份图片上传
        imgInsuredsUpload(event) {
            this.getOcrImg(event, 1)
        },
        // 投保人和被投保人支持ocr身份证录入
        getOcrImg(event, flag) {
            let file = event.target.files[0];
            if (/^image\/([a-zA-Z]|\*)+$/.test(file.type)) {
                imagesCompress(file).then(res => { 
                    let imageData = res.split(",")[1];//返回base64图片数据
                    let params = {
                        imageData,
                        funcCode: "0002",
                        funcName: "投保流程模块",
                        type: "2"
                    }
                    recognize(params).then(data => {
                        if (data.errCode == 0) {
                            let { name, id_number } = data.data
                            if (flag == 0) {
                                this.formData.holder['holderName'] = name
                                this.formData.holder['idcartNo'] = id_number
                            } else {
                                this.formData.insureds[0]['insuredName'] = name
                                this.formData.insureds[0]['idcartNo'] = id_number
                            }
                        }
                    })
                });
            }
        },
        iniDate() { //日期范围是从今天日期的明天开始算, 可以提前1个月投保
            const minDate = new Date()
            minDate.setDate(minDate.getDate() + 1)
            this.dateOption.minDate = minDate
            this.dateOption.startDate = minDate
            this.onStartDateChange(minDate)
            const maxDate = new Date(minDate)
            maxDate.setMonth(maxDate.getMonth() + 1)
            maxDate.setDate(maxDate.getDate() - 2)
            this.dateOption.maxDate = maxDate
        },
        // 获取渠道
        getIssueChannel() {
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
        getQueryIntellectQuestion(flag) { //flag: 是否是页面初始化时的初次查询数据
            const params = { productCode: this.$route.query.productId || '' }
            flag && Loading.show()
            queryIntellectQuestion({ params })
                .then(res => {
                    if (res.errCode == 0) {
                        if (res.data && res.data.length) {
                            res.data.forEach(item => {
                                item.hasVal = false //手动新增变量,小数组有数据选中时, 文案高亮提示
                                if (item.detailCategoryList && item.detailCategoryList.length) {
                                    item.detailCategoryList.forEach(item2 => {
                                        item2.select = false
                                        if (item2.questionList && item2.questionList.length) {
                                            item2.questionList.forEach(item3 => {
                                                item3.result = ''
                                                item3.select = false //自己回答"是"或"否"是否显示
                                            })
                                        }
                                    })
                                }
                            })
                            this.answerList = res.data
                            if (flag) {
                                this.isAnswerShow = true
                                this.showHB = false
                            }
                        }
                    } else Toast(res.errMsg || '网络异常，请稍后再试~')
                })
                .finally(() => {
                    flag && Loading.hide()
                })
        },
        // 验证
        validate () {
            const holder = this.formData.holder
            const insureds = this.formData.insureds[0]
            const { insuredBgnTime, insuredEndTime } = this.formData.policy
            const holderTextArr = ['请填写投保人姓名', '请填写投保人身份证号', '投保人身份证不正确', '请填写投保人手机号码', '投保人手机号码不正确', '请选择保险起期', '请选择保险止期', '请完善渠道出单信息']
            const agreementText = '请先阅读并勾选协议'
            const insuredTextArr = ['请填写被保人姓名', '请填写被保人证件号码', '被保人身份证不正确', '请填写被保人手机号码', '被保人手机号码不正确']
            const verify = new Verify()
            if (this.issueChannelSwitch) {  // 渠道出单是否选择了代理人或者经办渠道，没有则代表未完善
                verify.test(!!this.issueChannelSalesCode).isTrue(holderTextArr[7])
            }
            verify.test(holder.holderName).required(holderTextArr[0])
                .test(holder.idcartNo).required(holderTextArr[1]).idCard(holderTextArr[2])
                .test(holder.mobile).required(holderTextArr[3]).phone(holderTextArr[4])
                .test(insuredBgnTime).required(holderTextArr[5])
                .test(insuredEndTime).required(holderTextArr[6])
            if (!this.isSelf) {
                verify.test(insureds.insuredName).required(insuredTextArr[0])
                verify.test(insureds.idcartNo).required(insuredTextArr[1]).idCard(insuredTextArr[2])
                verify.test(insureds.mobile).required(insuredTextArr[3]).phone(insuredTextArr[4])
            }
            verify.test(this.agreementChecked).isTrue(agreementText)
            return verify.end(res => {
                if (res) {
                    Toast(res[0])
                    if (agreementText === res[0]) return
                    if (res[0] == holderTextArr[5] || res[0] == holderTextArr[6]) {
                        this.$refs.tabs.scrollIntoView('insureDate')
                        return
                    }
                    let name = holderTextArr.includes(res[0]) ? 'holder' : 'insured'
                    this.$refs.tabs.scrollIntoView(name)
                }
            })
        },
        // 立即投保
        onInsured () {
            if (this.validate()) {
                this.$refs.traceBack.trace({
                    title: '健康告知',
                    content: this.$refs.health.innerHTML
                })
            }
        },
        onAnswerShow() {
            this.showHB = true
        },
        onHealthNot() {
            delete this.formData.intellectQuestion //没有健康问题则删除"智能核保"数据
            this.onSubmit()
        },
        onAnswerFail() {
            this.showHealth = false
        },
        onAnswerSubmit(list) {
            const intellectQuestion = []
            list.map(item => {
                item.map(({choiceResult,code,result}) => {
                    intellectQuestion.push({ choiceResult , code, result })
                })
            })
            this.onSubmit(intellectQuestion)
        },
        onPG() { //去评估健康情况
            if (this.answerList.length) {
                this.isAnswerShow = true
                this.showHB = false
            } else {
                this.getQueryIntellectQuestion(true) //获取问答接口            
            }
            // 关闭健康告知
            this.$refs.traceBack.close()
        },
        // 以上全否
        onSubmit (intellectQuestion) {
            const { holder, insureds, product, policyExt, tempDataMap, policy ,saleInfo, source} = this.formData
            const { outDf, outUserId, refereeId, share, ms, saleTerminal, isChannelShare, shareExtenterpCode, departmentCode, businesSource, extBranchCode } = this.$route.query
            const holderIdCardInfo = this.getCardInfo(holder.idcartNo)
            const insuredIdCardInfo = this.getCardInfo(insureds[0].idcartNo)
            // 产品套餐
            product.packageCode = this.productPlanId
            // 自动续保
            policyExt.autoRenewal = this.renewalSwtich ? '1' : '0'

            // 投保人信息
            holder.age = holderIdCardInfo.age   // 年龄
            holder.sex = holderIdCardInfo.sex === '01' ? 'M' : 'F'    // 性别

            // 被保人信息，如果是为本人投保，则被保人信息同投保人
            if (this.isSelf) {
                insureds[0].insuredName = holder.holderName
                insureds[0].idcartNo = holder.idcartNo
                insureds[0].mobile = holder.mobile
                insureds[0].age = holderIdCardInfo.age     // 年龄
                insureds[0].sex = holderIdCardInfo.sex === '01' ? 'M' : 'F'     // 性别
            } else {
                insureds[0].age = insuredIdCardInfo.age     // 年龄
                insureds[0].sex = insuredIdCardInfo.sex === '01' ? 'M' : 'F'     // 性别
            }
            // 新增节点：tempDataMap 被保人相关信息
            tempDataMap.factorValueMap.shebao = `${insureds[0].insuredExt.shebao}` // 有无社保
            tempDataMap.factorValueMap.age = `${insureds[0].age}` // 年龄
            tempDataMap.factorValueMap.byStages = `${policyExt.byStages}`  // 缴费方式

            // 流水号
            policy.businessNo = this.getBusinessNo()
            // 投保时间（年月日时分秒）
            policy.appTime = this.getAppTime()

            // 实际保费(单位到分)
            policy.actualPremiumAmt = this.unitMinute(this.premium)
            // 原始保费(单位到分)
            policy.originalPremiumAmt = this.unitMinute(this.tPremium)
            // 总保额(单位到分)
            policy.totalInsuredAmt = this.unitMinute(7000000)
            // 健康问答告知情况数组
            intellectQuestion && intellectQuestion.length && (this.formData.intellectQuestion = intellectQuestion)
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
            if(this.isSubmitFlag) return
            this.isSubmitFlag = true
            // 提交核保
            this.$parent.simpleUnderwrite(this.formData, null, () => {
                this.isSubmitFlag = false
            })
        },
        // 理赔指南
        viewLPZN () {
            this.$refs.traceBack.viewAgreement(2)
        },
        // 检验身份证是否合格请求报价
        idcartNoChange (flag) {
            // 如果有被保人信息，那本人身份证输入框触发，则不执行获取报价信息
            if (!this.isSelf && flag) return
            let idcartNo = this.isSelf ? this.formData.holder.idcartNo : this.formData.insureds[0].idcartNo
            let isTrue = new Verify().test(idcartNo).idCard().end()
            // 身份证为空或者不符合，直接返回
            if (!isTrue) return
            setTimeout(this.getInsurData, 20)
        },
        // 报价
        getInsurData (age) {
            const { holder, insureds, policyExt } = this.formData
            if (!age){
                age = this.isSelf ? this.getCardInfo(holder.idcartNo).age : this.getCardInfo(insureds[0].idcartNo).age
            }
            let requestData = JSON.stringify({
                ...this.$route.query,
                "nspFlag": "1",       // NSP系统 固定传1
                "premiumType": "2",     // 保费类型
                "productPlanId": this.productPlanId,      // 套餐编码
                "insured_field|shebao|factor2Value|": +insureds[0].insuredExt.shebao,  // 有无社保 0无 1有
                "insured|age|factor1Value|": age,  // 被保人年龄
                "policy_field|byStages|factor3Value|": +policyExt.byStages  //是否分期 0年缴 1分期
            })
            getInsurData({ requestData }).then(res => {
                if (res.resultCode == '000000') {
                    this.premium = res.premium
                    this.initialPremium = res.initialPremium
                    this.minPremium = res.minPremium
                    this.tPremium = res.tPremium
                    this.discount = res.disCountValue
                }
            })
        },
        // 保费详情筛选
        filterChange (res) {
            this.premiumData = queryPremium(res[0], res[1], res[2], res[3])
        },
        // 获取身份信息
        getCardInfo (idcartNo) {
            return getCardInfo(idcartNo) || {}
        },
        // 生成订单流水号
        getBusinessNo () {
            return `${+new Date()}${Math.floor((Math.random() * 8 + 1) * Math.pow(10,6))}`
        },
        // 生成当前日期时间yyyyMMddhhmmss
        getAppTime () {
            const fillZero = (str) => str < 10 ? `0${str}` : str
            const nowDate = new Date()
            return [nowDate.getFullYear(),fillZero(nowDate.getMonth()+1),fillZero(nowDate.getDate()),fillZero(nowDate.getHours()),fillZero(nowDate.getMinutes()),fillZero(nowDate.getSeconds())].join('')
        },
        // 保费金额元转分
        unitMinute (num) {
            return +((num * 100).toFixed(2)) || 0
        },
        onStartDateChange(e) {
            this.dateOption.startDate = e

            const endDate = new Date(e) //结束日期默认比开始日期多1年
            endDate.setFullYear(endDate.getFullYear() + 1)
            endDate.setDate(endDate.getDate() - 1)
            this.dateOption.endDate = endDate

            this.formData.policy.insuredBgnTime = `${formatDate(e,'yyyyMMdd')}000000`
            this.formData.policy.insuredEndTime = `${formatDate(endDate,'yyyyMMdd')}235959`
            this.dateOption.isStartDate = false
        },
        onDoubt() {
            this.$dialog({
                content: '社会基本医疗保险包括城镇职工基本医疗保险、城镇居民基本医疗保险、新型农村合作医疗等政府举办的基本医疗保障项目。',
                confirmButtonColor: '#777',
            })
        },
        // 渠道出单回调
        channelHandle(deptCode, salesCode, flag) {
			// this.issueChannelDeptCode = deptCode
            // this.issueChannelSalesCode = salesCode
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
    computed: {
        // 产品套餐
        productPlanId () {
            return `${this.$route.query.productId}-T${this.claim == 0 ? '1' : '2'}`
        },
        // 为本人投保
        isSelf () {
            return this.formData.insureds[0].releation == 0
        },
        // 保费详情首年
        firstYear() {
            // 首年 且 月缴显示列（首月、次月）
            return this.filterOption[0].index == 0 && this.filterOption[2].index == 0
        },
        formatNowDate() {
            const { startDate } = this.dateOption
            if (!startDate) return '请选择保险起期'
            const y = startDate.getFullYear()
            const m = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1
            const d = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()
            return `${y}-${m}-${d}  0时`
        },
        formatEndDate() {
            const { endDate } = this.dateOption
            if (!endDate) return ''
            const y = endDate.getFullYear()
            const m = endDate.getMonth() + 1 < 10 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1
            const d = endDate.getDate() < 10 ? `0${endDate.getDate()}` : endDate.getDate()
            return `${y}-${m}-${d}  24时`
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
