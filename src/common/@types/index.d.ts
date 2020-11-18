interface genTokenByWxCodeOpt {
    appCode?:string
    backUrl?:string
    code:string
}
interface sendSmsOpt {
    mobile:string
    verifyCode:string,
    params?:any
    smsSource?:string
    smsType?:string
    timeToSend?:string
}
interface codeLoginOpt extends baseLoginOpt{
    // mobile:string
    platform?:string
    // smsType?:string
    // smsVerifyCode:string
}
interface baseLoginOpt  {
    picVerifyCode:string
    mobile:string
    smsType?:string
    smsVerifyCode:string
}
interface wxBindMobileOpt extends baseLoginOpt{
    // mobile:string
    appCode?:string
    // smsType?:string
    // smsVerifyCode:string
    token:string
}
interface ResponseObject {
    [key:string]:any,
    errCode?:number
    errMsg?:string
    data?:any
}
interface ResponseOldObject {
    returnCode?:string
    returnMsg?:string
    [key:string]:any,
    data?:any
}

interface GeetestResult{
    gtCode?: string,
    geetest_challenge: string, 
    geetest_validate: string, 
    geetest_seccode: string
}