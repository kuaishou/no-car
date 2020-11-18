type CookieOptions = {
    expires?:number,
    path?:string
    raw?:any
    secure?:boolean
}
export = MyFunction;
declare namespace MyFunction {

    export const isLink: (url: string | undefined) => boolean

    export const getUrlValue: (url?: string) => any
    export const getStyle: (dom?: Element) =>  any

    export const removeCookie: (key: string) => any
    /**
     * 设置Cookie
     * @param  Cookie键 key
     * 
     */
    export const setCookie: (key: string, value: string, options?: CookieOptions) => any
    export const getCookie: (key: string, options?: Object) => any

    export const setStorage: (key: string, value: any) => any
    export const getStorage: (key: string) => any
    export const removeStorage: (key: string) => any
    
    export const setSessionStorage: (key: string, value: any) => any
    export const getSessionStorage: (key: string) => any
    export const removeSessionStorage: (key: string) => any
    export const serialize: (data: Object) => any

    export const isWeiXin: () => boolean
    export const isAndroid: () => boolean
    export const isIOS: () => boolean
    export const isMobile: () => boolean

    export const $location: (url: string, data?: any, replaceFlag?: boolean) => any

}