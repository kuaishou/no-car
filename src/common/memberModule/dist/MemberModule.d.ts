import IMemberModule, { MemberWeiXinInfo, ToLoginOpt, ToAuthorizeOpt } from "./IMemberModule";
/**
 * 会员模块
 */
export declare class MemberModule implements IMemberModule {
    /**
     * 个人中心地址
     */
    url: string;
    /**
     * 微信授权中心地址
     */
    authorizeUrl: string;
    constructor();
    /**
     *  * 检查登陆状态
     * @param success 还在登陆回调函数
     * @param fail 没有登陆回调函数
     * @param error 服务器错误回调函数
     */
    checkLogin(success: (r: any) => any, fail?: (r: any) => any, error?: (r: any) => any): void;
    /**
     * * 获取微信token登陆注册系统用
     */
    getWxToken(): string;
    /**
     * 获取token
     */
    getToken(): string;
    /**
     * *  设置微信信息（昵称，头像，openid）
     * @param token
     */
    setWxToken(token: string): void;
    /**
     * *  设置微信信息（昵称，头像，openid）
     * @param weiXinInfo
     */
    setWeiXinInfo(weiXinInfo: MemberWeiXinInfo): void;
    /**
     * *  获取微信信息（昵称，头像，openid）
     */
    getWeiXinInfo(): MemberWeiXinInfo;
    /**
     *  * 获取微信openid
     */
    getOpenID(): string;
    /**
     * 判断是否登陆
     */
    isLogin(): boolean;
    /**
     *  * 设置登陆
     * @param token 登陆成功返回的token
     */
    setLogin(token: string): void;
    /**
     *  * 跳转微信授权
     * @param authInfo  授权方式对象或boolean 默认false
     * @param replace 跳转是否replace 默认true
     * @param backUrl 回调地址 默认location.href
     */
    toWxAuthorize(authInfo?: boolean | ToAuthorizeOpt, replace?: boolean, backUrl?: string): void;
    /**
     *  * 跳转登陆
     * @param opt
     */
    toLogin(opt?: string | ToLoginOpt): void;
    /**
     * 退出登陆
     * @param callback 退出登陆后回调
     */
    logout(callback?: () => void, err?: () => void): void;
    /**
     *  * 设置token
     * @param token 登陆成功返回token
     */
    setToken(token: string): void;
    /**
     * 移除token
     */
    removeToken(): void;
    /**
     * 当前页面授权
     * @param callBack
     */
    toNativeWxAuthorize(authInfo: ToAuthorizeOpt): void;
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
    }): Promise<unknown>;
}
export default MemberModule;
