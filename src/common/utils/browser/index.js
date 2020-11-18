let device = navigator.platform + '---' + navigator.userAgent;
var lDev = device.toLowerCase();
export function isLink(url) {
    return /^(http|ftp|https):\/\/([\w.]+\/?)\S*/.test(url);
}
export function getUrlValue(url) {
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
export function setStorage(key, value) {
    localStorage.setItem(key, value);
}
export function getStorage(key) {
    
 return   localStorage.getItem(key);
}
export function removeStorage(key){
   localStorage.removeItem(key);
}
export function setSessionStorage(key, value){
    sessionStorage.setItem(key,value)
}
export function getSessionStorage(key){
    return  sessionStorage.getItem(key)
}
export function removeSessionStorage(key, value){
    sessionStorage.removeItem(key,value)
}
export function isMobile() {
    return lDev.match(/(iphone|ipod|ipad|android|ios|windows phone)/i);
}
export function isIOS() {
    return lDev.match(/cpu (?:iphone )?os (\d+_\d+)/);
}
export function isAndroid() {
    return lDev.match(/(android);?[\s\/]+([\d.]+)?/);
}
export function isWeiXin() {
    return lDev.match(/micromessenger\/([\d\.]+)/i);
}
export function $location(url, data, replaceFlag) {
    let p = getUrlValue();
    if (p.isLog == 'true') {
        data ? data = data.isLog = true : data = { isLog: true }
    }
    if (data) {
        if (url.indexOf('?') > -1) {
            url = `${url}&${serialize(data)}`
        } else {
            url = `${url}?${serialize(data)}`
        }
        // return false;
    }
    if (replaceFlag) {
        window.location.replace(url)
    } else {
        window.location.href = url
    }

}
export function serialize(data) {
    var arr = [];
    for (var name in data) {
        arr.push(name + "=" + data[name]);
    }
    return arr.join("&");
}
export function setCookie(key, value, options) {
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
export function getCookie(key, options = {}) {
    //  options = value || {};

    var decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent; 


    var pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
        if (decode(pair[0]) === key)
            return decode(pair[1] || '');
    }
    return null;
}
export function removeCookie(key) {
    // console.log('删除cookie')
    setCookie(key, '', {
        expires: -1
    })
}
export function getStyle(ele) {
        var style = null;
        if(window.getComputedStyle) {
            style = window.getComputedStyle(ele, null);
        }else{
            style = ele.currentStyle;
        }
        return style;
   
}