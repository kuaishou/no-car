export = MyFunction;
declare namespace MyFunction {
    export const imagesCompress: (file:any,config?:Object) => Promise<string>
    /**
     * 
     * url 地址 
     * fun 加载完成后回调
     */                       
    export const preload: (url:string,fun?:Function) =>0
}