interface StartOpts {
    baseUrl?: string;	    // 后端服务器域名，默认为POC环境；样例：http://xxx.abc.com/..
    publicKey?: string;	    // 公钥，默认为POC环境公钥
    cookieExpires?: number;	// cookie过期时长，时间戳，单位：毫秒；不少于60分钟；默认值：24 * 3600 * 1000（24小时）
    timeout?: number;       // 单次录制超时时间，单位：秒，不少于10秒；默认值：3600（1小时）
    videoMaxSize?: number;	// 录制视频最大容量限制，单位：M，不少于1M；默认值：8M
    recordPerTime?: number;	// 定时推送录制内容时长，单位：秒，不少于5秒；未传时请使用stopRecord方法终止录制；不设置则不推送
    taskId?: string;        // 本次录制的唯一编号；不传则会自动请求服务器生成一条
    first?: 1 | 0           // 是否初始录入 1： 是， 0：否
}
interface StopOpts {
    orderId	    ?: string;	    // 订单ID，orderInfo不为空时，orderId为必填项；一个订单应该至少有一次传递过orderId
    insuranceNo	?: string;	    // 保单号
    channel	    ?: string;	    // 渠道
    platform	?: string;	    // 平台：web H5 等
    productName	?: string;	    // 产品名称
    productCode	?: string;	    // 产品编码
    account	    ?: string;	    // 账号：手机、微信ID等
    policyHolder?: string;	    // 投保人
    success	    ?: string;	    // 订单是否购买成功
    extraInfo	?: string;	    // 订单额外信息，两层结构的json键值对即可
    callback    ?: () => void;	// 回调函数
}
/**
* 录屏开始 #jiuy
* isInit:boolean 是否初始
* opts: StartOpts
*/
export const startSitu: (isInit: boolean, opts?: StartOpts) => any;
/**
* 录屏结束 #jiuy
* last: init 0 | 1  是否最后一个视频 最后一个传1，非最后一个传0
* opts: object | function
*/
export const stopSitu: (last: 0 | 1, opts?: StopOpts | (() => void) ) => any;
/**
* log记录 #jiuy
* type: string LOAD_PAGE 载入页面 | CLICK_ENTER 点击输入 | CLICK_BUTTON 点击按钮 | CLICK_SELECT 点击选中 | CLICK_CLOSE 点击关闭
* des: string
*/
export const logSitu: (type: 'LOAD_PAGE' | 'CLICK_ENTER' | 'CLICK_BUTTON' | 'CLICK_SELECT' | 'CLICK_CLOSE', des: string) => any;