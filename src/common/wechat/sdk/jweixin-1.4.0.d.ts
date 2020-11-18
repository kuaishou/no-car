// declare var wx: {
//     addCard: () => {}
//     checkJsApi: () => {}
//     [key:string]:()=>{}
// };

// export default wx;


import wx from "../jssdk";

interface sdk extends wx{
    config: () => {}
}
declare const wx:sdk
export default wx