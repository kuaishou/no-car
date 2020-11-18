import Vue from 'vue';
console.log('**********stringMask')
Vue.filter('stringMask', function (value, satrt = 0, end, char = '*') {
    console.log('stringMask**********stringMask')
    end = value.length;
    value = value.replace(/./g, '*')
    return start + "" + value.slice(1, -1) + "" + end
})