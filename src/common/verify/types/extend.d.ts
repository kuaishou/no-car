import { Verify } from './verify';
declare module "./verify" {
    interface Verify {
        /**
         * 
         * @param msg 设置错误信息数组
         */
        errMsg(...msg:string[]): Verify; 
        /**
         * 校验长度
         * @param min 最小长度
         * @param max 最大长度
         */
        length(min:number,max:number,msg?:string): Verify;
        /**
         * 校验必选
         * @param msg 校验不通过提示
         */
        required(msg?:string): Verify;
         /**
         * 校验中文
         * @param msg 校验不通过提示
         */
        isChinese(msg?:string): Verify;
        /**
         * 校验姓名
         * @param msg 校验不通过提示
         */
        name(msg?:string): Verify;
        /**
         * 校验手机号
         * @param msg 校验不通过提示
         */
        phone(msg?:string): Verify;
        /**
         * 校验邮件
         * @param msg 校验不通过提示
         */
        email(msg?:string): Verify;
        /**
         * 校验是否包含
         * @param value 包含的值
         * @param msg 校验不通过提示
         */
        contain(value:string,msg?:string): Verify;
        /**
         * 校验是否为数字类型
         * @param msg 校验不通过提示
         */
        isNumber(msg?:string): Verify;
        /**
         * 校验是否为空
         * @param msg 校验不通过提示
         */
        isNull(msg?:string): Verify;
         /**
         * 校验松散是否为False 正常false除外加字符串'undefined','null'
         * @param msg 校验不通过提示
         */
        isLooseFalse(msg?:string): Verify;
        /**
         * 是否为空 false,null,undefined,空字符串,
         * @param msg  校验不通过提示
         */
        isEmpty(msg?:string): Verify;
        /**
         * 是够为undefined
         * @param msg  校验不通过提示
         */
        isUndefined(msg?:string): Verify;
        /**
         * 校验大于
         * @param value 大于值 
         * @param msg  校验不通过提示
         */
        gt(value:any,msg?:any): Verify;
        /**
         * 校验是否等于
         * @param value 等于值
         * @param msg  校验不通过提示
         */
        equals(value:any,msg?:any): Verify;
        /**
         * 校验是否True(强校验)
         * @param msg  校验不通过提示
         */
        isTrue(msg?:any): Verify;
        /**
         * 校验是否False(强校验)
         * @param msg  校验不通过提示
         */
        isFalse(msg?:any): Verify;
        /**
         * 校验身份证
         * @param msg  校验不通过提示
         */
        idCard(msg?:any): Verify;
        /**
         * 校验护照
         * @param msg 校验不通过提示
         */
        passport(msg?:any):Verify
        passport0(msg?:any):Verify
        /**
         * 校验短信验证码
         * @param msg 校验不通过提示
         */
        smsCode(msg?:any):Verify
    }
}