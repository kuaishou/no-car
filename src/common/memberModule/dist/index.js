!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):e.memberModule=o()}(this,function(){"use strict";var e=(navigator.platform+"---"+navigator.userAgent).toLowerCase();function n(e){-1<(e=e||window.location.href).indexOf("#")&&(e=e.split("#")[0]);var o=e.split("?")[1];if(o){for(var t={},n=0,r=(o=o.split("&")).length;n<r;n++){var i=o[n].split("=")[1];void 0!==i&&("null"!=i&&"undefined"!=i||(i=""),i=decodeURIComponent(i).replace(/</g,"&lt;").replace(/>/g,"&gt;"),t[o[n].split("=")[0]]=i)}return t}return{}}function i(){return e.match(/micromessenger\/([\d\.]+)/i)}function c(e,o,t){"true"==n().isLog&&(o=o?o.isLog=!0:{isLog:!0}),o&&(e=-1<e.indexOf("?")?e+"&"+r(o):e+"?"+r(o)),t?window.location.replace(e):window.location.href=e}function r(e){var o=[];for(var t in e)o.push(t+"="+e[t]);return o.join("&")}function o(e,o,t){if(void 0===(t=t||{}).path&&(t.path="/"),null==o&&(t.expires=-1),"number"==typeof t.expires){var n=t.expires,r=t.expires=new Date;r.setTime(r.getTime()+1e3*n)}return o+="",document.cookie=encodeURIComponent(e)+"="+(t.raw?o:encodeURIComponent(o))+(t.expires?"; expires="+t.expires.toUTCString():"")+(t.path?"; path="+t.path:"")+(t.secure?"; secure":"")}function p(e,o){void 0===o&&(o={});for(var t,n=o.raw?function(e){return e}:decodeURIComponent,r=document.cookie.split("; "),i=0;t=r[i]&&r[i].split("=");i++)if(n(t[0])===e)return n(t[1]||"");return null}var a=Object.getPrototypeOf,s={}.hasOwnProperty,u=s.toString,d=u.call(Object);function l(e){var o,t;return!(!e||"[object Object]"!==Object.prototype.toString.call(e))&&(!(o=a(e))||"function"==typeof(t=s.call(o,"constructor")&&o.constructor)&&u.call(t)===d)}function f(){var e,o,t,n,r,i,c,p=arguments,a=arguments[0]||{},s=1,u=arguments.length,d=!1;for("boolean"==typeof a&&(d=a,a=arguments[s]||{},s++),"object"!=typeof a&&("function"!=typeof(c=a)||"number"==typeof c.nodeType)&&(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=p[s]))for(o in e)t=a[o],a!==(n=e[o])&&(d&&n&&(l(n)||(r=Array.isArray(n)))?(i=r?(r=!1,t&&Array.isArray(t)?t:[]):t&&l(t)?t:{},a[o]=f(d,i,n)):void 0!==n&&(a[o]=n));return a}var h=function(t){t=f({method:"get",success:function(){},headers:{"content-type":"application/x-www-form-urlencoded"},error:function(){}},t);var n=new XMLHttpRequest;for(var e in n.onreadystatechange=function(){var e=n.status;if(4==n.readyState)if(200<=e&&e<300){var o=n.response;try{o=JSON.parse(o)}catch(e){}t.success(o)}else t.error("error")},t.params&&(t.url=-1<t.url.indexOf("?")?t.url+"&"+m(t.params):t.url+"?"+m(t.params)),n.open(t.method,t.url),t.headers)n.setRequestHeader(e,t.headers[e]),"content-type"==e.toLocaleLowerCase()&&(t.data=-0<(t.headers[e]||"").indexOf("application/json")?JSON.stringify(t.data):m(t.data));n.send(t.data)};function m(e){var o=[];for(var t in e)null!=e[t]&&o.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return o.join("&")}var t=n(),g=t.appCode,y=t.salesCode,v=t.productId,k=t.ARWX;!g&&(g="wsc");var w=g+"_",b="抱歉，网络可能有点堵车，请稍后重试！",x="snsapi_base",C=function(){this.url="/eb-web/vue/member/index.html",this.authorizeUrl="/eb-web/vue/oAuth/index.html"};return C.prototype.checkLogin=function(o,t,n){this.isLogin()?h({method:"post",url:"/pup/usercenter/sso/getUserByToken",success:function(e){0===e.errCode?o(e.data):t&&t(e)},error:function(e){n?n(e):alert(b)},params:{token:this.getToken()}}):t&&t({errCode:"-1",errMsg:"没登录"})},C.prototype.getWxToken=function(){return p(w+"wx_token")},C.prototype.getToken=function(){return p(w+"token")},C.prototype.setWxToken=function(e){o(w+"wx_token",e,{expires:5400})},C.prototype.setWeiXinInfo=function(e){o("openid",e.openid),o(w+"openid",e.openid),e.headimgurl&&o(w+"headimgurl",e.headimgurl),e.nickname&&o(w+"nickname",e.nickname)},C.prototype.getWeiXinInfo=function(){return{openid:this.getOpenID(),nickname:p(w+"nickname"),headimgurl:p(w+"headimgurl")}},C.prototype.getOpenID=function(){return p(w+"openid")},C.prototype.isLogin=function(){return!!this.getToken()},C.prototype.setLogin=function(e){this.setToken(e)},C.prototype.toWxAuthorize=function(e,o,t){void 0===e&&(e=!1),void 0===o&&(o=!0),void 0===t&&(t=location.href);var n={scope:x,backUrl:t,replace:o};"boolean"==typeof e&&1==e?n.scope="snsapi_userinfo":"object"==typeof e&&(n=f(n,e)),c(""+this.authorizeUrl,{oAuthBackUrl:encodeURIComponent(n.backUrl),appCode:g,scope:n.scope},n.replace)},C.prototype.toLogin=function(e){var o={backUrl:location.href,scope:x};"string"==typeof e?o.backUrl=e:"object"==typeof e&&(o=f(o,e));var t="",n=p("user_token");g&&"wsc"!=g&&(t+="appCode="+g+"&");var r=location.origin+"/eb-web/vue/member/login.html?"+t+"loginBackUrl="+encodeURIComponent(o.backUrl);i()||n&&40<n.length?c(this.authorizeUrl+"?"+(t+="scope="+o.scope+"&")+"source=login&oAuthBackUrl="+encodeURIComponent(r)):c(r)},C.prototype.logout=function(o,t){i()?h({method:"post",url:"/pup/usercenter/sso/wxUnbound",headers:{"content-type":"application/x-www-form-urlencoded","wx-unbind-id":this.getToken()},data:{appCode:g,openId:this.getOpenID()},success:function(e){0==e.errCode?o&&o():t?t():alert(b)},error:function(){return t?t():alert(b)}}):(this.removeToken(),o&&o())},C.prototype.setToken=function(e){o(w+"token",e,{expires:7200})},C.prototype.removeToken=function(){o(w+"token","",{expires:-1})},C.prototype.toNativeWxAuthorize=function(e){var o=[],t=encodeURIComponent(e.redirect_uri||location.href);o.push("appid="+e.appid),o.push("redirect_uri="+t),o.push("response_type=code"),o.push("connect_redirect=1"),o.push("scope="+e.scope),o.push("state=auth"),o.push("appCode="+g),c("https://open.weixin.qq.com/connect/oauth2/authorize?"+o.join("&")+"#wechat_redirect",null,!0)},C.prototype.accessRecordWeiXin=function(e){if(!i())return Promise.resolve({errCode:1,errMsg:"不是微信环境"});var o=this.getWeiXinInfo();if(!o.nickname)return"1"===k&&this.toWxAuthorize(!1,!0,location.href.replace("&ARWX=1","&ARWX=2")),Promise.resolve({errCode:2,errMsg:"1"===k?"跳转微信授权":"没用进行微信授权"});var t=Object.assign({comeFrom:"1",issueChannel:"2",salesCode:y,productId:v,nickName:o.nickname,headImgUrl:o.headimgurl},e);return new Promise(function(o,e){h({method:"post",url:"/pup/usercenter/statistic/accessRecord",data:t,success:function(e){o(e)},error:function(){e({errCode:1,errMsg:"请求接口失败"})}})})},new C});
