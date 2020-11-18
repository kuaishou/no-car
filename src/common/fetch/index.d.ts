// export const get:(url:string,data:Object,config?:any)=>Promise<any>
// export const post:(url:string,data:Object,config?:any)=>Promise<any>
// export default:{
//     get,
//     post,
// }
// import axios, { AxiosPromise } from 'axios'
export const get: (url:string,data?:Object,config?:Object) => Promise<any>
export const post: (url:string,data?:Object,config?:Object) => Promise<any>
// export default axios;