/* eslint-disable */
import Verify from './src/index'
import {
    identityValid
} from './src/lib/idcard'
// 扩展必选
Verify.hook('errMsg', function () {

})

function isNull(v) {
    return v === null;
}

function isUndefined(v) {
    return v === undefined;
}

function equals(v, a) {
    return v === a;
}

function isTrue(value) {
    return !isFalse(value);
}

function isFalse(value) {
    return value === false;
}

function isEmpty(value) {
    return isUndefined(value) || isNull(value) || equals(value, '') || isFalse(value);
}
Verify
    .install('name', function (value, msg) {
        this.$$errMsg = msg || '请填写准确的姓名';

        return /^[\u4E00-\u9FA5]{2,25}$/.test(value);
    })
    .install('required', function (value, msg) {
        this.$$errMsg = msg;
        return !isEmpty(value);
    })
    .install('isChinese', function (value, msg) {
        this.$$errMsg = msg;
        return /[\u4e00-\u9fa5]/.test(value);
    })
    .install('equals', function (value, text, msg) {
        // console.log('equals', value, text)
        this.$$errMsg = msg;
        return equals(value,text);
    })
    .install('length', function (value, min, max,msg) {
        this.$$errMsg = msg||'' ;
        return !(value.length < min || value.length > max)
    })
    .install('phone', function (value, msg) {
        this.$$errMsg = msg || '请填写正确的手机号';
        var phoneReg = /^1\d{10}$/;
        return phoneReg.test(value);
    })
    .install('gt', function (value, a) {
        console.log('gt', a);
        return value > a;

    })
    .install('isFalse', function (value, msg) {
        this.$$errMsg = msg
        // console.log('value', value)
        return isFalse(value);

    })
    .install('isTrue', function (value, msg) {
        this.$$errMsg = msg
        return isTrue(value);

    })
    .install('smsCode', function (value, msg) {
        this.$$errMsg = msg || '请填写正确的验证码'
        return value && value.length == 6;
    })
    // 身份证
    .install('idCard', function (value, msg) {

        this.$$errMsg = msg || '请填写准确的身份证号'
        return identityValid(value)

    })
    .install('email', function (value, msg) {

        this.$$errMsg = msg || '请填写准确电子邮箱'

        return /^([a-zA-Z0-9]+[_|\_|\.]?){0,3}[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?){0,2}[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
    })
    // 护照
    .install('passport', function (value, msg) {


        // console.log('value',/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value))
        //    alert('sss',!!/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value))
        this.$$errMsg = msg || '请填写准确的护照号'
        return value && value.length >= 8;

    })
    .install('passport0', function (value, msg) {
        this.$$errMsg = msg || '请填写准确的护照号'
        return /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value);

    })
    .install('contain', function (value, a, msg) {
        this.$$errMsg = msg;
        return value.indexOf(a) > -1;
    })
    .install('isNumber', function (value, msg) {
        this.$$errMsg = msg;
        return !isNaN(Number(value));
    })
    .install('isNull', function (value) {
        this.$$errMsg = msg;
        return isNull(value);
    })
    .install('isEmpty', function (value) {
        this.$$errMsg = msg;

        return isEmpty(value);
    })
    .install('isUndefined', function (value) {
        this.$$errMsg = msg;
        return isUndefined(value);
    })
    .install('isLooseFalse', function (value) {
        this.$$errMsg = msg;
        return isEmpty(value) ||
            equals(value, 'undefined') ||
            equals(value, 'null');
    })
    .install('startWith', function (value, a) {
        this.$$errMsg = msg;
        let reg = new RegExp("^" + a);
        return reg.test(value);
    })
    .install('endWith', function (value, a) {
        this.$$errMsg = msg;
        let reg = new RegExp(a + "$");
        return reg.test(value);
    })

export default Verify;