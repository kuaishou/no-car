

import { isProduction } from './config/env'
const FastClick = require('fastclick');
const win = window, doc = document;
FastClick.attach(doc.body);

//修复IOS input聚焦延迟
FastClick.prototype.focus = function (targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
      length = targetElement.value.length;
      targetElement.focus();
      targetElement.setSelectionRange(length, length);
    } else {
      targetElement.focus();
    }
  }
  

//百度统计
function initBaidu() {
    win._hmt = win._hmt || [];
    let hm = doc.createElement("script"),host = window.location.hostname,
    id=/10|127|localhost/.test(host)||/stg|test/.test(host)?'e13bf09a00c071cbd9632b25571b84f0':'d6471f45d65f7b64ba334e3c4a25d830';
    hm.src = "//hm.baidu.com/hm.js?"+id;
    let s = doc.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}
//百度监听
function initBaiduEvent() {
    doc.addEventListener('click', function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target && target.getAttribute('_bdEvent')) {

            var _bdArr = [
                e.target.getAttribute('_bdEvent'),
                e.target.getAttribute('_bdCategory'),
                e.target.getAttribute('_bdAction'),
                e.target.getAttribute('_bdLabel'),
                e.target.getAttribute('_bdValue')
            ];
            if (!isProduction) {
                //事件名称不加前缀
                for (var i = 1; i < _bdArr.length; i++) {
                    _bdArr[i] = "测试环境-" + _bdArr[i];
                }
            }
            bdTrigger(_bdArr);
        }
    })
}
function bdTrigger(array) {
    win._hmt = win._hmt || [];
    win._hmt.push(array);
}

//友盟统计
function initUMeng(autoPageview) {
    autoPageview =  autoPageview || false;
    win._czc = win._czc || []
    _czc.push(['_setAutoPageview', autoPageview]);
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.charset = 'utf-8';
    var ref = document.getElementsByTagName('script')[0];
    ref.parentNode.insertBefore(el, ref);
    let host = window.location.hostname
    let id=/10|127|localhost/.test(host)||/stg|test/.test(host)?'1279344066':'1279344006';
    el.src = `https://v1.cnzz.com/z_stat.php?id=${id}&web_id=${id}`;
}
//友盟监听
function initUMengEvent() {
    doc.addEventListener('click', function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target && target.getAttribute('_UMEvent')) {

            var _UM = [
                e.target.getAttribute('_UMEvent'),
                e.target.getAttribute('_UMCategory'),
                e.target.getAttribute('_UMAction'),
                e.target.getAttribute('_UMLabel'),
                e.target.getAttribute('_UMValue')
            ];
            if (!isProduction) { //事件名称不加前缀
                for (var i = 1; i < _UM.length; i++) {
                    _UM[i] = "测试环境-" + _UM[i];
                }
            }
            win._czc = win._czc || [];
            win._czc.push(_UM);
        }
    })
}

let common = {

    init: function () {
        initBaidu();
        initBaiduEvent();
    },
    initUM: function (autoPageview) { //初始化友盟统计, 原百度统计免费已到上限
        initUMeng(autoPageview);
        initUMengEvent();
    }
}
export default common;