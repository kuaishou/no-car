import {post, get} from '@/common/fetch'
import { isProduction,baseUrl } from '@/common/config/env';
export const sendSms = (data,config) => {
    data = Object.assign({
        smsSource: 'usercenter',
        smsType: 'sms-usercenter-login',
    }, data);
    // console.log('sendSms', data)
    return post(`/pup/usercenter/sms/sendSms`, data,Object.assign({
        loading:false,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },config));
}

// 获取城市地址
export const queryCity = () => {
    const getCyUrl = isProduction ?
        '/eauto/official/official/wxCityQuery' :
        '/eb-web/dist/wxCity.json';
    return get(getCyUrl);
}

// 极列行为验证签名
export const geetestSign = (params) => { 
    return get(baseUrl+'/pup/usercenter/gt/init', { params },{loading:false})
}

/**
 * 新增访问记录
 * @params comeFrom 模块来源    非空，1：海报
 * @params headImgUrl 微信用户头像  非空，2：展业
 * @params issueChannel 渠道来源
 * @params nickName 微信用户昵称
 * @params productId 产品代码
 * @params productName 产品名称
 * @params salesCode 业务员代码 非空
 */
export const accessRecord = (data,config) => {
    data = Object.assign({
        comeFrom: '1',
        issueChannel: '2',
    }, data);
    // console.log('sendSms', data)
    return post(`/pup/usercenter/statistic/accessRecord`, data, Object.assign({
        loading:false,
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },config));
}
/*
* @param data 
* @param config 
*/
export const validatemode = (params,config) => {
   config = Object.assign({
       loading: false
   }, config);
   return get(baseUrl + `/pup/usercenter/sms/validatemode`, { params }, config);
}