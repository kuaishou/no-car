/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-23 11:44:29
 * @LastEditTime: 2019-07-24 10:42:12
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 会员模块实现
 */


import IMemberModule, { MemberWeiXinInfo, WxAuthorize, ToLoginOpt, ToAuthorizeOpt } from "./IMemberModule";
import { getCookie, getUrlValue, setCookie, isWeiXin, $location, removeCookie } from "../../utils/browser";
import minFetch from '../../minFetch'
import mergeOptions from '../../utils/mergeOptions';
let {
    appCode,
    salesCode,
    productId,
    ARWX
} = getUrlValue();
!appCode && (appCode = 'wsc');
let prefix = `${appCode}_`;
const FAIL_TEXT = '抱歉，网络可能有点堵车，请稍后重试！'
/**
 * 隐式授权
 */
const SNSAPI_BASE = 'snsapi_base';
/**
 * 显式授权
 */
const SNSAPI_USERINFO = 'snsapi_userinfo';
/**
 * 会员模块
 */
export class MemberModule implements IMemberModule {
    /**
     * 个人中心地址
     */
    url: string;
    /**
     * 微信授权中心地址
     */
    authorizeUrl: string;
    constructor() {
        this.url = "/eb-web/vue/member/index.html"
        this.authorizeUrl = '/eb-web/vue/oAuth/index.html'
    }
    /**
     *  * 检查登陆状态
     * @param success 还在登陆回调函数
     * @param fail 没有登陆回调函数
     * @param error 服务器错误回调函数
     */
    checkLogin(success: (r: any) => any, fail?: (r: any) => any, error?: (r: any) => any): void {
        if (!this.isLogin()) {
            fail && fail({
                errCode: '-1',
                errMsg: '没登录'
            })
            return;
        }
        minFetch({
            method: 'post',
            url: `/pup/usercenter/sso/getUserByToken`,
            success: function (res: any) {
                if (res.errCode === 0) {
                    success(res.data);
                } else {
                    fail && fail(res);
                }
            },
            error: function (res: any) {
                error ? error(res) : alert(FAIL_TEXT);
            },
            params: {
                token: this.getToken()
            }
        })

    }
    /**
     * * 获取微信token登陆注册系统用
     */
    getWxToken(): string {
        return getCookie(`${prefix}wx_token`);
    }
    /**
     * 获取token
     */
    getToken(): string {
        return getCookie(`${prefix}token`);
    }
    /**
     * *  设置微信信息（昵称，头像，openid）
     * @param token 
     */
    setWxToken(token: string): void {
        setCookie(`${prefix}wx_token`, token, {
            expires: 60*60*1.5
        });
    }
    /**
     * *  设置微信信息（昵称，头像，openid）
     * @param weiXinInfo 
     */
    setWeiXinInfo(weiXinInfo: MemberWeiXinInfo): void {
        setCookie(`openid`, weiXinInfo.openid);
        setCookie(`${prefix}openid`, weiXinInfo.openid);
        if (weiXinInfo.headimgurl) {
            setCookie(`${prefix}headimgurl`, weiXinInfo.headimgurl);
        }
        if (weiXinInfo.nickname) {
            setCookie(`${prefix}nickname`, weiXinInfo.nickname);
        }

    }
    /**
     * *  获取微信信息（昵称，头像，openid）
     */
    getWeiXinInfo(): MemberWeiXinInfo {
        return {
            openid: this.getOpenID(),
            nickname: getCookie(`${prefix}nickname`),
            headimgurl: getCookie(`${prefix}headimgurl`)
        }

    }
    /**
     *  * 获取微信openid
     */
    getOpenID(): string {
        return getCookie(`${prefix}openid`);
    }
    /**
     * 判断是否登陆
     */
    isLogin(): boolean {
        return !!this.getToken()
    }
    /**
     *  * 设置登陆
     * @param token 登陆成功返回的token
     */
    setLogin(token: string): void {
        this.setToken(token);
    }
    /**
     *  * 跳转微信授权
     * @param authInfo  授权方式对象或boolean 默认false
     * @param replace 跳转是否replace 默认true
     * @param backUrl 回调地址 默认location.href
     */
    toWxAuthorize(authInfo: boolean | ToAuthorizeOpt = false, replace: boolean = true, backUrl: string = location.href): void {

        let config: ToAuthorizeOpt = {
            scope: SNSAPI_BASE,
            backUrl: backUrl,
            replace
        }
        if (typeof authInfo == 'boolean' && authInfo == true) {
            config.scope = SNSAPI_USERINFO

        } else if (typeof authInfo == 'object') {
            config = mergeOptions(config, authInfo) as ToAuthorizeOpt
        }

        let data = {
            oAuthBackUrl: encodeURIComponent(config.backUrl),
            appCode,
            scope: config.scope
        }
        $location(`${this.authorizeUrl}`, data, config.replace);

    }
    /**
     *  * 跳转登陆
     * @param opt 
     */
    toLogin(opt?: string | ToLoginOpt): void {
        let config: ToLoginOpt = {
            backUrl: location.href,
            scope: SNSAPI_BASE
        };
        if (typeof opt == 'string') {
            config.backUrl = opt;
        } else if (typeof opt == 'object') {
            config = mergeOptions(config, opt) as ToLoginOpt;
        }
        let p = '',
            userToken = getCookie(`user_token`);
        if (appCode && appCode != 'wsc') {
            p += (`appCode=${appCode}&`);
        }
        let loginUrl = location.origin + `/eb-web/vue/member/login.html?${p}loginBackUrl=${encodeURIComponent(config.backUrl)}`
        // 是微信或掌上宝直接跳授权页userToken>40 应该是掌上宝没有会员userid
        if (isWeiXin() || (userToken && userToken.length > 40)) {
            p += (`scope=${config.scope}&`);
            $location(`${this.authorizeUrl}?${p}source=login&oAuthBackUrl=${encodeURIComponent(loginUrl)}`)
        } else {
            $location(loginUrl);
        }

    }
    /**
     * 退出登陆
     * @param callback 退出登陆后回调
     */
    logout(callback?: () => void, err?: () => void): void {
        if (isWeiXin()) {
            minFetch({
                method: 'post',
                url: '/pup/usercenter/sso/wxUnbound',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'wx-unbind-id': this.getToken()
                },
                data: {
                    appCode,
                    openId: this.getOpenID()
                },
                success: function (res:any) {
                    if(res.errCode==0){
                        callback && callback();
                    }else{
                        err ? err() : alert(FAIL_TEXT)
                    }
                   
                },
                error: function () {
                    return err ? err() : alert(FAIL_TEXT)
                
                }
            })
        } else {
            this.removeToken();
            callback && callback();
        }
    }
    /**
     *  * 设置token
     * @param token 登陆成功返回token
     */
    setToken(token: string): void {
        setCookie(`${prefix}token`, token, {
            expires: 60 * 60 * 2
        })

    }
    /**
     * 移除token
     */
    removeToken() {
        removeCookie(`${prefix}token`);
    }
    /**
     * 当前页面授权
     * @param callBack 
     */
    toNativeWxAuthorize(authInfo: ToAuthorizeOpt) {
        let lParam: Array<string> = [];
        let redirect_uri = encodeURIComponent(authInfo.redirect_uri || location.href), state = 'auth';
        lParam.push(`appid=${authInfo.appid}`)
        lParam.push(`redirect_uri=${redirect_uri}`)
        lParam.push(`response_type=code`)
        lParam.push(`connect_redirect=1`)
        lParam.push(`scope=${authInfo.scope}`)
        lParam.push(`state=${state}`)
        lParam.push(`appCode=${appCode}`)

        $location(`https://open.weixin.qq.com/connect/oauth2/authorize?${lParam.join('&')}#wechat_redirect`, null, true)

    }
    /**
     * 记录微信客户访问
     * @param data -> {comeFrom: '模块来源', issueChannel: '渠道来源', productId: '产品代码', productName: '产品名称', salesCode: '业务员代码'} 
     * */ 
    accessRecordWeiXin(data: {productName: string, productId?: string, salesCode?: string, comeFrom?: string, issueChannel?: string}) {
        if (!isWeiXin()) {
            return Promise.resolve({errCode: 1, errMsg: '不是微信环境'});
        }
        const wxInfo: any = this.getWeiXinInfo();
        if (!wxInfo.nickname) {
            ARWX === '1' && this.toWxAuthorize(false, true, location.href.replace('&ARWX=1','&ARWX=2'));
            return Promise.resolve({errCode: 2, errMsg: ARWX === '1' ? '跳转微信授权' : '没用进行微信授权'});
        }
        const fData: any = Object.assign({comeFrom: '1', issueChannel: '2', salesCode: salesCode, productId: productId, nickName: wxInfo.nickname, headImgUrl: wxInfo.headimgurl}, data);
        return new Promise((re, ro) => {
            minFetch({
                method: 'post',
                url: `/pup/usercenter/statistic/accessRecord`,
                data: fData,
                success: function (res:any) {
                    re(res);
                },
                error: function () {
                    ro({errCode: 1, errMsg: '请求接口失败'});
                }
            })
        });
    }
}
export default MemberModule