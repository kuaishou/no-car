import { isPlainObject, isFunction} from '../utils/jsType';
import { setCookie, removeCookie } from '../utils/browser';
import { isProduction } from '../config/env';
var taskId = '';
/**
* 录屏开始 #jiuy
* isInit:boolean 是否初始
* opts: object
*/
export function startSitu(isInit, opts) {
    if (window.SituRecorder) {
        var initParams = {
            env: isProduction ? 'prd' : 'test'       // 环境声明变量，可选， test/prd
        }

        if (isInit) {
            initParams.first = 1;
        }

        if (isPlainObject(opts)) {
            opts.baseUrl && (initParams.baseUrl = opts.baseUrl);
            opts.taskId && (initParams.taskId = opts.taskId);
            opts.publicKey && (initParams.publicKey = opts.publicKey);
            opts.cookieExpires && (initParams.cookieExpires = opts.cookieExpires);
            opts.timeout && (initParams.timeout = opts.timeout);
            opts.videoMaxSize && (initParams.videoMaxSize = opts.videoMaxSize);
            opts.recordPerTime && (initParams.recordPerTime = opts.recordPerTime);
        }

        try {
            var res = SituRecorder.startRecord(initParams);

            if (res.code === 10000) {
                taskId = res.result.taskId;
                setCookie('taskId', taskId);
            }
            return res;
        } catch (error) {
            return false;
        }
    }
    return false;
}
/**
* 录屏结束 #jiuy
* last: init 0 | 1 , 1(最后一个)
* opts: object | function
*/
export function stopSitu(last, opts) {
    var fData = {last: last};
    var callback;
    if (isPlainObject(opts)) {
        fData.orderInfo = {
            orderId: taskId,
            platform: '华安保险'
        };
        opts.orderId && (fData.orderInfo.orderId = opts.orderId);
        opts.platform && (fData.orderInfo.platform = opts.platform);
        opts.insuranceNo && (fData.orderInfo.insuranceNo = opts.insuranceNo);
        opts.channel && (fData.orderInfo.channel = opts.channel);
        opts.productName && (fData.orderInfo.productName = opts.productName);
        opts.productCode && (fData.orderInfo.productCode = opts.productCode);
        opts.account && (fData.orderInfo.account = opts.account);
        opts.policyHolder && (fData.orderInfo.policyHolder = opts.policyHolder);
        opts.success && (fData.orderInfo.success = opts.success);
        opts.extraInfo && (fData.orderInfo.extraInfo = opts.extraInfo);
        opts.callback && (callback = opts.callback);
    } else if (isFunction(opts)) {
        callback = opts
    }
    if (!window.SituRecorder) {
        isFunction(callback) && callback({});
        return Promise.resolve(false);
    }
    try {
        return SituRecorder.stopRecord(fData).then(function(res) {
            if (last) {
                taskId = '';
                removeCookie('taskId');
            }
            isFunction(callback) && callback(res);
            return res;
        }).catch(function(er){
            console.log(er);
            isFunction(callback) && callback(er);
            return er;
        });;
    } catch(err) {
        isFunction(callback) && callback({});
        return Promise.resolve(err);
    }
}
/**
* log记录 #jiuy
* type: string LOAD_PAGE载入页面 | CLICK_ENTER 点击输入 | CLICK_BUTTON 点击按钮 | CLICK_SELECT 点击选中 | CLICK_CLOSE 点击关闭
* des: string
*/
export function logSitu(type, des) {
    if (!window.SituRecorder) {
        return Promise.resolve(false);
    }
    try {
        return SituRecorder.createOperation({
            type: type,
            description: des
        });
    } catch (err) {
        return Promise.resolve(err);
    }
    
}

export default {
    startSitu,
    stopSitu,
    logSitu
}