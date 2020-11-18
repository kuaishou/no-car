import Vue from 'vue'
Vue.filter('imgWH', function (value, w,h) {
    //console.log('imgControl', value, p)
    return value.replace(/h_[0-9]+/g, `h_${h}`)
        .replace(/w_[0-9]+/g, `w_${w}`);
    // return value;
})
//https://yunuxian.oss-cn-shenzhen.aliyuncs.com/details/hxmhtDetails/hxmhtDetails1.png?
//x-oss-process=image/resize,m_fill,w_375,h_400,limit_0/auto-orient,1/quality,q_90 0