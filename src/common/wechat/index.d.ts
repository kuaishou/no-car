import jssdk from "./jssdk";
export interface wxUitls extends jssdk{
    /**
     * 微信jssdk初始化接口
     */
    init:(opts?: () => void | {url: string}) => {}
}
declare const wxOpt:wxUitls
// export const wechat
export default wxOpt
