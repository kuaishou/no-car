let baseUrl = 'https://m.sinosafe.com.cn'
let apiUrl = 'https://agent.sinosafe.com.cn'
let cdnUrl = 'https://s.sinosafe.com.cn'
let appid = `wx57cc5818cd87508d`
let routerMode =''
// baseUrl = 'https://mtest.sinosafe.com.cn'
// apiUrl = 'https://agenttest.sinosafe.com.cn'
// cdnUrl = 'https://stest.sinosafe.com.cn'
let host = window.location.hostname;
let isProduction = true;
if (/10|127|localhost/.test(host)) {//本地环境
    isProduction = false;
} else if (/stg|test/.test(host)) {//测试环境
    isProduction = false;;
}

if (!isProduction) {
    if(/stg/.test(host)){
        baseUrl = 'https://mstg.sinosafe.com.cn';
        cdnUrl = 'https://sstg.sinosafe.com.cn';
        apiUrl = 'https://agentstg.sinosafe.com.cn'
        appid = `wx554f9515ada6c15c`
    }else if(/zbuat/.test(host)){
        baseUrl = 'https://zbuat-mtest.sinosafe.com.cn';
        cdnUrl = 'https://zbuat-stest.sinosafe.com.cn';
        apiUrl = 'https://zbuat-agenttest.sinosafe.com.cn'
        appid = `wx554f9515ada6c15c`
    }else{
        baseUrl = 'https://mtest.sinosafe.com.cn';
        cdnUrl = 'https://stest.sinosafe.com.cn';
        apiUrl = 'https://agenttest.sinosafe.com.cn'
        appid = `wx554f9515ada6c15c`
    }
}
export {
    baseUrl,
    apiUrl,
    cdnUrl,
    appid,
    isProduction,
    routerMode
}