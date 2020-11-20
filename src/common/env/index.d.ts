/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-10 13:34:17
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
// declare const env: {
//     baseUrl:string
//     apiUrl:string
//     cdnUrl:string
//     appid:string 
//     isProduction:boolean
// }
// export default env;
export = MyFunction;
declare namespace MyFunction {

    export const baseUrl: string
    export const apiUrl: string
    export const service_appid:string
    export const service_appSecret:string
    /**
     * 生产环境
     */
    export const isProduction: boolean
}