type ToastOpt = {
    text:string,
    classPrefix?:string,
    time?:number
}
export interface ToastUtils{
    show:(opt?:string|ToastOpt)=>0
    hide:()=>0
}
declare const Loading:ToastUtils
export default Loading;