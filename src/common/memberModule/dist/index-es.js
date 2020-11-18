var device = navigator.platform + '---' + navigator.userAgent;
var lDev = device.toLowerCase();
function getUrlValue(url) {
    url = url ? url : window.location.href;
    if (url.indexOf('#') > -1) {
        url = url.split('#')[0];
    }
    var variable = url.split('?')[1];
    if (!variable) {
        return {};
    } else {
        var value = {};
        variable = variable.split('&');
        for (var i = 0, m = variable.length; i < m; i++) {
            var tempv = variable[i].split('=')[1];
            if (typeof (tempv) != 'undefined') {
                if (tempv == 'null' || tempv == 'undefined') {
                    tempv = '';
                }
                tempv = decodeURIComponent(tempv).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                value[variable[i].split('=')[0]] = tempv;
            }
        }
        return value;
    }
}
function isWeiXin() {
    return lDev.match(/micromessenger\/([\d\.]+)/i);
}
function $location(url, data, replaceFlag) {
    var p = getUrlValue();
    if (p.isLog == 'true') {
        data ? data = data.isLog = true : data = { isLog: true };
    }
    if (data) {
        if (url.indexOf('?') > -1) {
            url = url + "&" + (serialize(data));
        } else {
            url = url + "?" + (serialize(data));
        }
        // return false;
    }
    if (replaceFlag) {
        window.location.replace(url);
    } else {
        window.location.href = url;
    }

}
function serialize(data) {
    var arr = [];
    for (var name in data) {
        arr.push(name + "=" + data[name]);
    }
    return arr.join("&");
}
function setCookie(key, value, options) {
    options = options || {};

    typeof (options.path) == 'undefined' && (options.path = '/');//将默认cookie路径设置为域名根目录,否则默认是当前页面目录。cookie不能全站共享

    if (value === null || value === undefined) {
        options.expires = -1;
    }

    if (typeof options.expires === 'number') {
        var time = options.expires, t = options.expires = new Date();
        t.setTime(t.getTime() + time*1000);
    }
    value = String(value);

    //ie11 does not accepts domain
    return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.secure ? '; secure' : ''].join(''));
}
function getCookie(key, options) {
    if ( options === void 0 ) options = {};

    //  options = value || {};

    var decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent; 


    var pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
        if (decode(pair[0]) === key)
            { return decode(pair[1] || ''); }
    }
    return null;
}
function removeCookie(key) {
    // console.log('删除cookie')
    setCookie(key, '', {
        expires: -1
    });
}

var getProto = Object.getPrototypeOf,
    class2type = {},
    hasOwn = class2type.hasOwnProperty,
    fnToString = hasOwn.toString,
    ObjectFunctionString = fnToString.call(Object);
function isFunction(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}
function isPlainObject(obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
        return false;
    }

    proto = getProto(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

function mergeOptions() {
    var arguments$1 = arguments;

    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !isFunction(target)) {
        target = {};
    }


    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if ((options = arguments$1[i]) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) ||
                    (copyIsArray = Array.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = mergeOptions(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}

//@ts-check
 var minFetch = function (config) {
    config = mergeOptions({
        method: 'get',
        success: function () { },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        error: function () { }
    }, config);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var status = xhr.status;
        if (xhr.readyState == 4) {
            if (status >= 200&&status<300) {
                var text = xhr.response;
                try {
                    text = JSON.parse(text);
                } catch (error) {
       
                }
                config.success(text);
            }else{
                config.error('error');
            }
        }
    };
    
    if (config.params) {
        if (config.url.indexOf('?') > -1) {
            config.url = (config.url) + "&" + (serialize$1(config.params));
        } else {
            config.url = (config.url) + "?" + (serialize$1(config.params));
        }

    }

    xhr.open(config.method, config.url);
    for(var v in config.headers){
        xhr.setRequestHeader(v,config.headers[v]);
        if(v.toLocaleLowerCase()=='content-type'){
            if((config.headers[v]||'').indexOf( "application/json")>- 0){
                config.data = JSON.stringify(config.data);
            }else {
                config.data = serialize$1(config.data);
            }
        
        }
    }
    
  
    xhr.send(config.data);
    
};
function serialize$1(data) {
    var arr = [];
    for (var name in data) {
        if(data[name]!==null&&data[name]!==undefined){
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
       
    }
    return arr.join("&");
}

/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-23 11:44:29
 * @LastEditTime: 2019-07-24 10:42:12
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 会员模块实现
 */
var ref = getUrlValue();
var appCode = ref.appCode;
var salesCode = ref.salesCode;
var productId = ref.productId;
var ARWX = ref.ARWX;
!appCode && (appCode = 'wsc');
var prefix = appCode + "_";
var FAIL_TEXT = '抱歉，网络可能有点堵车，请稍后重试！';
/**
 * 隐式授权
 */
var SNSAPI_BASE = 'snsapi_base';
/**
 * 显式授权
 */
var SNSAPI_USERINFO = 'snsapi_userinfo';
/**
 * 会员模块
 */
var MemberModule = function MemberModule() {
    this.url = "/eb-web/vue/member/index.html";
    this.authorizeUrl = '/eb-web/vue/oAuth/index.html';
};
/**
 *  * 检查登陆状态
 * @param success 还在登陆回调函数
 * @param fail 没有登陆回调函数
 * @param error 服务器错误回调函数
 */
MemberModule.prototype.checkLogin = function checkLogin (success, fail, error) {
    if (!this.isLogin()) {
        fail && fail({
            errCode: '-1',
            errMsg: '没登录'
        });
        return;
    }
    minFetch({
        method: 'post',
        url: "/pup/usercenter/sso/getUserByToken",
        success: function (res) {
            if (res.errCode === 0) {
                success(res.data);
            }
            else {
                fail && fail(res);
            }
        },
        error: function (res) {
            error ? error(res) : alert(FAIL_TEXT);
        },
        params: {
            token: this.getToken()
        }
    });
};
/**
 * * 获取微信token登陆注册系统用
 */
MemberModule.prototype.getWxToken = function getWxToken () {
    return getCookie((prefix + "wx_token"));
};
/**
 * 获取token
 */
MemberModule.prototype.getToken = function getToken () {
    return getCookie((prefix + "token"));
};
/**
 * *  设置微信信息（昵称，头像，openid）
 * @param token
 */
MemberModule.prototype.setWxToken = function setWxToken (token) {
    setCookie((prefix + "wx_token"), token, {
        expires: 60 * 60 * 1.5
    });
};
/**
 * *  设置微信信息（昵称，头像，openid）
 * @param weiXinInfo
 */
MemberModule.prototype.setWeiXinInfo = function setWeiXinInfo (weiXinInfo) {
    setCookie("openid", weiXinInfo.openid);
    setCookie((prefix + "openid"), weiXinInfo.openid);
    if (weiXinInfo.headimgurl) {
        setCookie((prefix + "headimgurl"), weiXinInfo.headimgurl);
    }
    if (weiXinInfo.nickname) {
        setCookie((prefix + "nickname"), weiXinInfo.nickname);
    }
};
/**
 * *  获取微信信息（昵称，头像，openid）
 */
MemberModule.prototype.getWeiXinInfo = function getWeiXinInfo () {
    return {
        openid: this.getOpenID(),
        nickname: getCookie((prefix + "nickname")),
        headimgurl: getCookie((prefix + "headimgurl"))
    };
};
/**
 *  * 获取微信openid
 */
MemberModule.prototype.getOpenID = function getOpenID () {
    return getCookie((prefix + "openid"));
};
/**
 * 判断是否登陆
 */
MemberModule.prototype.isLogin = function isLogin () {
    return !!this.getToken();
};
/**
 *  * 设置登陆
 * @param token 登陆成功返回的token
 */
MemberModule.prototype.setLogin = function setLogin (token) {
    this.setToken(token);
};
/**
 *  * 跳转微信授权
 * @param authInfo  授权方式对象或boolean 默认false
 * @param replace 跳转是否replace 默认true
 * @param backUrl 回调地址 默认location.href
 */
MemberModule.prototype.toWxAuthorize = function toWxAuthorize (authInfo, replace, backUrl) {
        if ( authInfo === void 0 ) authInfo = false;
        if ( replace === void 0 ) replace = true;
        if ( backUrl === void 0 ) backUrl = location.href;

    var config = {
        scope: SNSAPI_BASE,
        backUrl: backUrl,
        replace: replace
    };
    if (typeof authInfo == 'boolean' && authInfo == true) {
        config.scope = SNSAPI_USERINFO;
    }
    else if (typeof authInfo == 'object') {
        config = mergeOptions(config, authInfo);
    }
    var data = {
        oAuthBackUrl: encodeURIComponent(config.backUrl),
        appCode: appCode,
        scope: config.scope
    };
    $location(("" + (this.authorizeUrl)), data, config.replace);
};
/**
 *  * 跳转登陆
 * @param opt
 */
MemberModule.prototype.toLogin = function toLogin (opt) {
    var config = {
        backUrl: location.href,
        scope: SNSAPI_BASE
    };
    if (typeof opt == 'string') {
        config.backUrl = opt;
    }
    else if (typeof opt == 'object') {
        config = mergeOptions(config, opt);
    }
    var p = '', userToken = getCookie("user_token");
    if (appCode && appCode != 'wsc') {
        p += (("appCode=" + appCode + "&"));
    }
    var loginUrl = location.origin + "/eb-web/vue/member/login.html?" + p + "loginBackUrl=" + (encodeURIComponent(config.backUrl));
    // 是微信或掌上宝直接跳授权页userToken>40 应该是掌上宝没有会员userid
    if (isWeiXin() || (userToken && userToken.length > 40)) {
        p += (("scope=" + (config.scope) + "&"));
        $location(((this.authorizeUrl) + "?" + p + "source=login&oAuthBackUrl=" + (encodeURIComponent(loginUrl))));
    }
    else {
        $location(loginUrl);
    }
};
/**
 * 退出登陆
 * @param callback 退出登陆后回调
 */
MemberModule.prototype.logout = function logout (callback, err) {
    if (isWeiXin()) {
        minFetch({
            method: 'post',
            url: '/pup/usercenter/sso/wxUnbound',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'wx-unbind-id': this.getToken()
            },
            data: {
                appCode: appCode,
                openId: this.getOpenID()
            },
            success: function (res) {
                if (res.errCode == 0) {
                    callback && callback();
                }
                else {
                    err ? err() : alert(FAIL_TEXT);
                }
            },
            error: function () {
                return err ? err() : alert(FAIL_TEXT);
            }
        });
    }
    else {
        this.removeToken();
        callback && callback();
    }
};
/**
 *  * 设置token
 * @param token 登陆成功返回token
 */
MemberModule.prototype.setToken = function setToken (token) {
    setCookie((prefix + "token"), token, {
        expires: 60 * 60 * 2
    });
};
/**
 * 移除token
 */
MemberModule.prototype.removeToken = function removeToken () {
    removeCookie((prefix + "token"));
};
/**
 * 当前页面授权
 * @param callBack
 */
MemberModule.prototype.toNativeWxAuthorize = function toNativeWxAuthorize (authInfo) {
    var lParam = [];
    var redirect_uri = encodeURIComponent(authInfo.redirect_uri || location.href), state = 'auth';
    lParam.push(("appid=" + (authInfo.appid)));
    lParam.push(("redirect_uri=" + redirect_uri));
    lParam.push("response_type=code");
    lParam.push("connect_redirect=1");
    lParam.push(("scope=" + (authInfo.scope)));
    lParam.push(("state=" + state));
    lParam.push(("appCode=" + appCode));
    $location(("https://open.weixin.qq.com/connect/oauth2/authorize?" + (lParam.join('&')) + "#wechat_redirect"), null, true);
};
/**
 * 记录微信客户访问
 * @param data -> {comeFrom: '模块来源', issueChannel: '渠道来源', productId: '产品代码', productName: '产品名称', salesCode: '业务员代码'}
 * */
MemberModule.prototype.accessRecordWeiXin = function accessRecordWeiXin (data) {
    if (!isWeiXin()) {
        return Promise.resolve({ errCode: 1, errMsg: '不是微信环境' });
    }
    var wxInfo = this.getWeiXinInfo();
    if (!wxInfo.nickname) {
        ARWX === '1' && this.toWxAuthorize(false, true, location.href.replace('&ARWX=1', '&ARWX=2'));
        return Promise.resolve({ errCode: 2, errMsg: ARWX === '1' ? '跳转微信授权' : '没用进行微信授权' });
    }
    var fData = Object.assign({ comeFrom: '1', issueChannel: '2', salesCode: salesCode, productId: productId, nickName: wxInfo.nickname, headImgUrl: wxInfo.headimgurl }, data);
    return new Promise(function (re, ro) {
        minFetch({
            method: 'post',
            url: "/pup/usercenter/statistic/accessRecord",
            data: fData,
            success: function (res) {
                re(res);
            },
            error: function () {
                ro({ errCode: 1, errMsg: '请求接口失败' });
            }
        });
    });
};

/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-23 11:44:29
 * @LastEditTime: 2019-07-23 18:02:33
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 模块导出
 */
/**
 * 会员模块对象
 */
var memberModule = new MemberModule();

export default memberModule;
