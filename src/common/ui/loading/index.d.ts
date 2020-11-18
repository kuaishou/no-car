type LoadingOpt = {
    text:string,
    time:number
}
type hideOpt = {
    noDelay:boolean
}
export interface LoadingUtils{
    show:(opt?:string|LoadingOpt)=>0
    hide:(opt?:hideOpt)=>0
}
declare const Loading:LoadingUtils
export default Loading;