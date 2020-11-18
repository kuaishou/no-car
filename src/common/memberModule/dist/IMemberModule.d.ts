export declare type MemberWeiXinInfo = {
    headimgurl: string;
    openid: string;
    nickname: string;
};
export interface WxAuthorize {
    scope: 'snsapi_userinfo' | 'snsapi_base';
}
export interface ToAuthorizeOpt extends WxAuthorize {
    replace?: boolean;
    appid?: string;
    redirect_uri?: string;
    backUrl: string;
}
export interface ToLoginOpt extends WxAuthorize {
    backUrl: string;
}
interface IMemberModule {
    url: string;
    authorizeUrl: string;
    /**
     * 设置token
     * @param token
     */
    setToken(token: string): void;
    /**
     * 设置token
     * @param token
     */
    removeToken(): void;
    /**
     * 获取token
     * @return token
     */
    getToken(): string;
    /**
     * 获取微信token登陆注册系统用
     */
    getWxToken(): string;
    /**
     * 设置微信token登陆注册系统用
     * @param token
     */
    setWxToken(token: string): void;
    /**
     * 设置微信信息（昵称，头像，openid）
     * @param weiXinInfo 微信对象
     */
    setWeiXinInfo(weiXinInfo: MemberWeiXinInfo): void;
    /**
     * 获取微信信息（昵称，头像，openid）
     */
    getWeiXinInfo(): MemberWeiXinInfo;
    /**
     * 获取微信openid
     */
    getOpenID(): string;
    /**
     * 简单判断是否登陆
     */
    isLogin(): boolean;
    /**
     * 设置登陆
     * @param token 登陆后返回的token
     */
    setLogin(token: string): void;
    /**
     * 检查登陆
     * @param success 还在登陆回调函数
     * @param fail 没有登陆回调函数
     * @param error 服务器错误回调函数
     */
    checkLogin(success: () => 0, fail?: () => 0, error?: () => 0): void;
    /**
     * 微信授权
     * @param authInfo  是否显式授权
     * @param replaceFlag 跳转地址是否replace
     * @param backUrl 授权后回调
     */
    toWxAuthorize(authInfo?: boolean | ToAuthorizeOpt, replaceFlag?: boolean, backUrl?: string): void;
    /**
     * 跳转登陆
     * @param opt 跳转登陆参数
     */
    toLogin(opt?: string | ToLoginOpt): void;
    /**
     *
     * @param callback
     */
    logout(callback?: () => void, err?: () => void): void;
    toNativeWxAuthorize(authInfo?: ToAuthorizeOpt, callBack?: Function): void;
    /**
     * 记录微信客户访问
     * @param data -> {comeFrom: '模块来源', issueChannel: '渠道来源', productId: '产品代码', productName: '产品名称', salesCode: '业务员代码'}
     * */
    accessRecordWeiXin(data: {
        productName: string;
        productId?: string;
        salesCode?: string;
        comeFrom?: string;
        issueChannel?: string;
    }): any;
}
export default IMemberModule;
