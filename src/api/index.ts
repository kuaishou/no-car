import { post, get } from '@/common/fetch'
import {baseUrl,apiUrl,service_appid,service_appSecret} from '@/common/env'


/**
 * @params //获取token
 *  cardNo: 激活卡号
 *  cardPwd:激活密码
*   valCde: 激活验证码
 */
export const getToken = (data:any, params:any) => {
    data = Object.assign({
        appId: service_appid,
        appSecret: service_appSecret
    }, data)
    params = Object.assign({
        async: "false"
    }, params)
    return post(`${apiUrl}/token`, data, params)
}


// getProductInfo: BASEURL+'commonData/productInfo.do',   //商城首页所有信息
// getInsurData: BASEURL+'/commonData/getInsurData.do',  //报价
// saleInsurance: BASEURL+'commonInsurance/saleInsurance.do'   //投保
/**
 * @params //商城首页所有信息
 *  cardNo: 激活卡号
 *  cardPwd:激活密码
*   valCde: 激活验证码
 */

 
export const getProductInfo = (data:any) => {
    data = Object.assign({}, data)
    return post(`${baseUrl}/micro-plat/commonData/productInfo.do`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
        }
      })
}
/**
 * @params //提交投被保人信息

 */
export const submitPolicyInfo = (data:any, params:any) => {
    data = Object.assign({}, data)
    params = Object.assign({}, params)
    return post(`${apiUrl}/com-sinosafe-activecard/submitPolicyInfo`, data, params)
}

/**
 * @params //微信分享
 * reqURL/当前页面链接
 */
export const getWeiXinTicket = (data:any, params:any) => {
    data = Object.assign({}, data)
    params = Object.assign({}, params)
    return post(`${baseUrl}/micro-plat/commonData/getWeiXinTicket.do`, data, params)
}

/**
 * @params //领取保险卡查询用户信息
 * userId：当前登录用户id
 */
export const findUserByUserId = (data:any, params:any) => {
    data = Object.assign({}, data)
    params = Object.assign({}, params)
    return post(`${baseUrl}/pup/usercenter/userInfo/findUserByUserId`, data, params)
}

/**
 * @params //短连接转化
 * long_url:源地址：请使用原始地址，不需要进行url编码(必传)
 * appid：使用账号（feiche）
 * source：系统来源（baoxianka）
 * eff：有效期：以天为单位，365:一年，-1:永久，其他的传所需天数值，不传则默认是90天[三个月]
 */
export const getSKB= (data:any, params:any) => {
    data = Object.assign({}, data)
    params = Object.assign({}, params)
    return post(`${baseUrl}/u/gen`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
        }
      })
}

/**
 * @params //登录信息
 *  userId: 用户id
 *  wxOpenId:微信OpenId
*   toBubi: 
 */
export const login = (data:any) => {
    return get(`${baseUrl}/mplatform/bubi/user/login`, {
        params: data
    })
}
/**
 * @params 
 * 获取激活卡图片验证码
 */
export const  getRandCode = () => {
    return get(`${apiUrl}/com-sinosafe-activecard/randCode`, {

        responseType: 'blob' 
    })
}
/**
 * @params 
 * 获取条款信息
 */
export const  webSubject = (data: any) => {
    return get(`${baseUrl}/cmscenter/subject/webSubject`, {
        params: data
    })
}

/**
 * @params 查询待激活列表
 * userId  登录后的userId
 * pNum  页码
 * pSize 页数
 * type  类型 (member当前写死用于后台区分是否需要登录)
 */
export const  queryUserInstockActivations = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/queryUserInstockActivations`, {
        params: data
    })
}

/**
 * @params 查询已激活列表
 * userId  登录后的userId
 * pNum  页码
 * pSize 页数
 * type  类型 (member当前写死用于后台区分是否需要登录)
 */
export const  queryActivedActivations = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/queryActivedActivations`, {
        params: data
    })
}
/**
 * @params 查询已赠送列表
 * userId  登录后的userId
 * pNum  页码
 * pSize 页数
 * type  类型 (member当前写死用于后台区分是否需要登录)
 */
export const  sendGiftList = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/gift/sendGiftList`, {
        params: data
    })
}
/**
 * @params 赠送保险卡接口
 * assetCode 产品id
 * giftCount  红包数量
 * totalAmount 赠送数量
 * prepayOrderId  支付id
 * sendType:"WeChat" //赠送类型：WeChat-微信赠送、short-短信赠送、batch-邮件提取（即批量赠送）
 */
export const  sendGift = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/gift/sendGift`, {
        params: data
    })
}
/**
 * @params 邮箱批量赠送保险卡接口
 * amount 赠送数量
 * email  提取邮箱
 * prepayOrderId  支付id
 * sendType:"WeChat" //赠送类型：WeChat-微信赠送、short-短信赠送、batch-邮件提取（即批量赠送）
 */
export const  pickupActivations = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/pickupActivations`, {
        params: data
    })
}
/**
 * @params 邮件重新赠送
 * pickupNo--提取码
 * email--邮箱
 */
export const  rePickupActivations = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/rePickupActivations`, {
        params: data
    })
}
/**
 * @params 查询保险卡详情
 * userId  登录后的userId
 * prepayOrderId  订单id
 */
export const  queryActivedDetail = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/queryActivedDetail`, {
        params: data
    })
}

/**
 * @params 查询保险卡的卡号和卡密
 * userId  登录后的userId
 * prepayOrderId  订单id
 * type  类型 (member当前写死用于后台区分是否需要登录)
 */
export const  findActivationPwd = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/findActivationPwd`, {
        params: data
    })
}


/**
 * @params 查询查询投保后详情
 * smallPolicyNo  小保单号
 */
export const  queryPolicyDetail = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/asset/queryPolicyDetail`, {
        params: data
    })
}
/**
 * @params 查询已经赠送详情
 * sendGiftNo--红包号
 * sendType--赠送类型
 */
export const  memberGiftDetail = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/gift/memberGiftDetail`, {
        params: data
    })
}
/**
 * @params 查询领取赠送保险卡信息-----重构后页面不需要使用
 * sendGiftNo--红包号
 */
export const  sendGiftInfo = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/gift/sendGiftInfo`, {
        params: data
    })
}
/**
 * @params 查询领取赠送保险卡接口
 * sendGiftNo--红包号
 */
export const  receiveGift = (data: any) => {
    return get(`${baseUrl}/mplatform/bubi/gift/receiveGift`, {
        params: data
    })
}

/**
 * @params 查询查询电子保单链接
 * sendGiftNo--红包号
 * sendType--赠送类型
 */
export const  queryPolicy = (data: any) => {
    data = Object.assign({
        actionType: "checkAndGetElecPly"
    }, data)
    return get(`${baseUrl}/elec/query.do`, {
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },//get设置header
        params: data
    })
}

//https://mtest.sinosafe.com.cn/mplatform/bubi/asset/queryPolicyDetail
//https://m.sinosafe.com.cn/elec/query.do?actionType=checkAndGetElecPly
//https://mtest.sinosafe.com.cn/cmscenter/subject/webSubject?subjectCodes=vircard-item&_=1593482454476

// export const  getRandCode = (applyNo: string) => {
//     return get(`${process.env.VUE_APP_WECHAT_ACTIVATION}/cspwg/com-sinosafe-activecard/randCode`, {
//         headers: { 'Authorization':'Ae4lPf0beg2qRtjCk2AVeuHiOE7eCGfQFZVncZ61' },//get设置header
//         responseType: 'blob' 
//     })
// }
// export const sendVerificationCode = (data: any) => {
//     data = Object.assign({}, data)
//     return get(`/eauto/eshopauto/payment/sendVerificationCode`, {
//         params: data
//     })y

// }