
import queryProduct from './config/product'
import { isWeiXin ,getCookie } from '../../common/utils/browser'
import MemberModule from '../../common/memberModule'
import {startSitu,stopSitu,logSitu} from '../../common/situRecorder'
import wechat from '../../common/wechat'
import {queryBindSalesInfo, simpleUnderwrite} from "services/productDetail"
import Toast from 'components/toast'
export default {
    data () {
        return {
            productComponent: '',
            errorText: '',
            bindSalesCode: ''
        }
    },
    created() {
        const { productId } = this.$route.query
        if (!productId) {
            this.errorText = '哦豁！产品代码不能为空哦~，请确认后再试！'
            return
        }
        const product = queryProduct(productId)
        if (!product) {
            this.errorText = '哦豁！产品未找到，请确认后再试！'
            return
        }
        this.productComponent = product.component
        this.queryBindSalesInfo()//查询绑定业务员

        if (isWeiXin()) {
            // 微信授权
            if(!MemberModule.getOpenID()) MemberModule.toWxAuthorize();
            // 微信分享
            wechat.init(() => {
                let shareData = {
                    title: product.productName,
                    desc: product.productDesc,
                    imgUrl: product.productImg,
                    link: product.productUrl
                }
                wechat.onMenuShareQQ(shareData)
                wechat.onMenuShareQZone(shareData)
                wechat.onMenuShareAppMessage(shareData)
                wechat.onMenuShareTimeline(shareData)
                wechat.onMenuShareWeibo(shareData)
                wechat.updateAppMessageShareData(shareData)
                wechat.updateTimelineShareData(shareData)
            })
        }
        let StartOpts={//定时录屏参数
            timeout:20,
            videoMaxSize:3,
            recordPerTime:6
        }
        startSitu(true,StartOpts);
    },
    methods: {
        //获取业务员salesCode绑定信息
        queryBindSalesInfo() {
            if (this.$route.query.salesCode) {
                let params = {salesCode: this.$route.query.salesCode};
                queryBindSalesInfo({params}).then(res => {
                    if (res.errCode == 0 && res.data && res.data.bindSalesCode) {
                        this.bindSalesCode = res.data.bindSalesCode;
                    }
                })

            }
        },
        // 核保
        simpleUnderwrite(params, succCallback, failCallback) {
            const { outDf, outUserId, refereeId, share, ms, saleTerminal, issueChannel} = this.$route.query
            const { policy, source } = params
            if(['2','3'].indexOf(issueChannel)>=0 && !params.saleInfo.salesCode){//展业和保代渠道必须传salesCode
                Toast('无业务员工号，为避免落地错误，请重新登录，重新投保');
                return
            }
            // 全民保代跳转过来，参数存在传给后端
            outDf && (policy.outDf = outDf) // 全民优保外部渠道标识
            outUserId && (policy.outUserId = outUserId)
            refereeId && (policy.refereeId = refereeId)
            share && (source.detailBizCode = share)
            ms && (policy.discountKey = ms)
            saleTerminal && (source.saleTerminal = saleTerminal) // 统计
            params.policyExt.taskId = getCookie('taskId')||'';
            params.policyField=this.$route.query;//给后端传所有链接中参数
            params.payment = {//后端新增缴费方式;见费或非见费流程标识（2代表见费流程）
                payType : '2'
            };
            simpleUnderwrite(params).then(res => {
                if (res.errCode == '0' && res.data) {
                    succCallback && succCallback(res)
                    let Situdata={}//建议用promise
                    Situdata.callback=function(){
                        window.location.href = res.data.paymentUrl
                    }
                    stopSitu(0,Situdata)
                } else {
                    failCallback && failCallback()
                    Toast(res.errMsg || '投保失败，请稍后再试')
                }
            })
        }
    }
}
