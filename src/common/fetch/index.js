import axios from 'axios'
import Loading from '../ui/loading'
import Toast from '../ui/toast'
import { errorText } from '../texts'
import qs from 'qs';
import memberModule from '../memberModule'

axios.interceptors.request.use(config => {
    //默认所有接口loading
    if (!config.params) {
        config.params = {};
    }
    // if(config.url.indexOf('randpage')>0){
    //     console.time('loading')
    // }
    config.params._t = +new Date();
    // debugger

    if (config.loading !== false) {
        Loading.show();
    }
    if (config.headers["Content-Type"]&&config.headers["Content-Type"].indexOf('application/x-www-form-urlencoded')>-1) {
        config.data = qs.stringify(config.data);
    }
    return config;
}, err => {
    // Toast

    return Promise.reject(err);
})
axios.interceptors.response.use((res) => {
    if (res.data &&
        res.data.errCode != 0 &&
        res.data.errMsg
        && !res.config.noAutoShowError &&!res.config.noAutoShowRight
    ) {
        Toast.show(res.data.errMsg);
    }
    if (res.config.loading !== false) {
        Loading.hide();
    }
    
    return res;
}, res => {
    if(res.config.loading){
        Loading.hide();
    }
    //不自动处理有些接口错误
    !res.config.noAutoShowError&&Toast.show(errorText || '服务器发生错误');
    return Promise.reject(res);
})
function handleData(res) {
    // 登录已过期,请重新登录
    if (res.data.errCode == 102) {
        memberModule.toLogin()
    }
    return res.data;
}
export function get(url, data, config) {
    return axios.get(url, data, config).then(handleData);
    // return new Promise((resolve,reject)=>{
    //     resolve(res.data,res)
    // })
}
export function post(url, data, config) {
    return axios.post(url, data, config).then(handleData);;
}
