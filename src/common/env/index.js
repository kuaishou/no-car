
let baseUrl = 'https://m.sinosafe.com.cn'
let apiUrl = 'https://api.sinosafe.com.cn'
let service_appid='jhcard'//token获取参数
let service_appSecret='jhcard_2017'
let appid = `wx57cc5818cd87508d`

let host = window.location.hostname;
let isProduction = true;


if (/10|127|localhost/.test(host)) {//本地环境
    isProduction = false;
} else if (/stg|test/.test(host)) {//测试环境
    isProduction = false;;
}
// isProduction = true;
if (!isProduction) {
    baseUrl = 'https://mtest.sinosafe.com.cn';
    apiUrl = 'https://proxytest.sinosafe.com.cn/cspwg'
    service_appid='cha_test'
    service_appSecret='123456'
    appid = `wx554f9515ada6c15c`
}

export {
    baseUrl,
    apiUrl,
    isProduction,
    service_appid,
    service_appSecret
}