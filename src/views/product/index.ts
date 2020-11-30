import { reactive, toRefs, unref } from "vue";
import { useRouter } from 'vue-router';
import qs from 'qs'
import { getProductInfo } from '@/api'

export default {
    name: "App",
    setup() {
        interface DataProps {
            girls: string[];
            selectGirl: string;
            selectGirlFun: (index: number) => void;
        }

        const { currentRoute } = useRouter();
        // const route = unref(currentRoute);
        const route = currentRoute.value;
        const query = route.query;

        const state: any = reactive({
            formData: {
                holder: {   // 投保人
                    holderName: "邢浩东",     // 姓名
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
                    productCode: query.productId   // 产品代码
                },
                saleInfo: {
                    accessPassword: "micro123", // 接入密码
                    accessUser: "micro",        // 接入用户
                    channelCode: query.extenterpCode || "micro",  // 渠道编码
                    salesCode: query.salesCode || ''
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
            time: {
                insrncBgnTm: "2020-05-23 00:00:00",
                insrncEndTm: "2021-05-22 23:59:59",
                minDate: new Date(2010, 0, 1),
                maxDate: new Date(2050, 0, 31),
                show: false,
                clickBoxFlag: ""
            },
            itemList: {},
            ProductInfo:{
                quoteList:[{itemList:[]}],
                noticeInfo:[],
                nspFlag:'',
                planInfo:[],
                uiInfo:{},
                baseInfo:{},
                salesInfo:{}
            }
        })

        // const girls = ref(["大脚", "刘英", "晓红"]);
        // const selectGirl = ref("");
        // const selectGirlFun = (index: number) => {
        //   selectGirl.value = girls.value[index];
        // };
        // const itemList = reactive({
        //     girls: ["大脚", "刘英", "晓红"],
        //     selectGirl: "",
        //     selectGirlFun: (index: number) => {
        //         data.selectGirl = data.girls[index];
        //     },
        // });
        // let ProductInfo:any=reactive({
        //     quoteList:[{itemList:{}}]

        // })
        // let ProductInfo:any=reactive({
        //     quoteList:[{itemList:[]}],
        //     noticeInfo:[],
        //     nspFlag:'',
        //     planInfo:[],
        //     uiInfo:{},
        //     baseInfo:{},
        //     salesInfo:{}
        // })
        const getProduct = () => {
            let datas = { requestData: JSON.stringify(query) };
            getProductInfo(datas).then(res => {
                if (res.resultCode == '000000') {
                    //alert(res)
                    state.ProductInfo=Object.assign(state.ProductInfo,res)
                   //return reactive(ProductInfo)
                    // this.planInfo = response.data.planInfo;
                    // this.requestData.productPlanId = this.planInfo[0].PLAN_CODE; //设置初始套餐
                    // for (let index = 0; index < response.data.quoteList.length; index++) {
                    //   let GetItemList: any = response.data.quoteList[index].itemList;
                    //   for (let key = 0; key < GetItemList.length; key++) {
                    //     let QuotationFactor: any = GetItemList[key];
                    //     this.itemList.push(QuotationFactor as never);
                    //     this.requestData[QuotationFactor.CODE] =
                    //       QuotationFactor.DEFAULT_VALUE; //报价因子添加
                    //   }
                    // }
          
                    // let GetList: any = [];
                    // // let fristPlanInfo:any=this.planInfo[0].KIND_DATA_LIST
                    // // for (let en = 0; en < fristPlanInfo.length; en++) {
                    // //   let fristList:any=fristPlanInfo[en].LIST;
                    // //   for (let index1 = 0; 1 < fristList.length; index1++) {
                    // //      GetList.push(fristList[index1])//报价详情
                    // //   }
                    // // }
                    // this.requestData.list = GetList; //报价详情
                    // this.getInsurData();
                }
            })
        }

        getProduct()

        // // 报价
        // const getInsurData = () => {
        //     let requestData = JSON.stringify({
        //         ...this.$route.query,
        //         "policy_field|byStages|factor1Value|": this.formData.policyExt.byStages
        //     })
        //     getInsurData({ requestData }).then(res => {
        //         if (res.resultCode == '000000') {
        //             this.premium = res.premium || 0
        //             this.initialPremium = res.initialPremium || 0
        //             this.minPremium = res.minPremium || 0
        //             this.tPremium = res.tPremium || 0
        //         }
        //     })
        //   };


        const refData = toRefs(state);

        return {
            ...refData
        };
    },
};