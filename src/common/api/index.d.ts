export = MyApi
declare const MyApi:{
    sendSms:(data:any,config?:object)=>Promise<any>;
    queryCity:() => Promise<any>;
    geetestSign:(params: { code: string }) => Promise<any>;
    accessRecord:(data: any, config?: object) => Promise<any>;
}