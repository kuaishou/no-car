export function format(value, format) { //yyyy*MM*dd*hh*mm*ss

    if (typeof value == 'string') {
        value = value.replace(/-/ig, '/')
    }

    let d = new Date(value);

    format = format || 'yyyy-MM-dd';
    var o = {
        "M+": d.getMonth() + 1, //月
        "d+": d.getDate(), //日
        "h+": d.getHours(), //时
        "m+": d.getMinutes(), //秒
        "s+": d.getSeconds(), //分
        "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
        "S": d.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }

    return format;
}
export function UDdate(value) {
    if (typeof value == 'string') {
        value = value.replace(/-/g, "/");
    }
    return new Date(value);
}
export function getTime(s){//将s转为日时分秒
    var hour=Math.floor(s/3600%24),minute=Math.floor(s%3600/60),second=s%60;
    var time=Math.floor(hour/10)+''+hour%10+':'+Math.floor(minute/10)+''+minute%10+':'+Math.floor(second/10)+''+Math.floor(second%10);
    return time;
}