interface WxApiCallback<Res = undefined> {
    success?: (res: Res) => void;
    cancel?: (err: any) => void;
}

interface OpenInterfaceAPIs {
    addCard: any;
    openCard: any;
}
interface ShareOpts extends WxApiCallback {
    title: string, // 分享标题
    desc: string, // 分享描述
    link: string, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string, // 分享图标
}
type wxConfigOpt = {
    debug: string,
    appId: string,
    timestamp: string,
    nonceStr: string,
    signature: string,
    jsApiList: Array<string>,
    openTagList: Array<string>,
}
interface updateTimelineShareOpts extends ShareOpts { }

interface wx {

    /**
     *  自定义“分享到朋友”及“分享到QQ”按钮的分享内容（1.4.0）
     * */
    updateAppMessageShareData: (options: updateTimelineShareOpts) => {}
    /**
     *  自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
     * */
    updateTimelineShareData: (options: updateTimelineShareOpts) => {}
    /**
     * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
     * */
    onMenuShareTimeline: (options: updateTimelineShareOpts) => {}
    /**
     *  获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
     * */
    onMenuShareAppMessage: (options: updateTimelineShareOpts) => {}
    /**
     * 获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
     * */
    onMenuShareQQ: (options: updateTimelineShareOpts) => {}
    /**
     * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
     * */
    onMenuShareWeibo: (options: updateTimelineShareOpts) => {}
    /** 
     * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
     * */
    onMenuShareQZone: (options: updateTimelineShareOpts) => {}
    /**
     * 微信配置接口
     */
    config: (c: wxConfigOpt) => {}
}
export default wx