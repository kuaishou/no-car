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
    export const cdnUrl: string
    export const appid: string
    export const isProduction: boolean
}