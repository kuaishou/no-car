
export = Geetest;
type geetestCallback = {
    (captchaObj: any): void;
}
declare namespace Geetest {
    export const initGeetest: (userConfig: object, callback: geetestCallback) => void;
}
/* type geetestCallback = {
    (captchaObj: any): void;
}
export interface Geetest {
    initGeetest: (userConfig: object, callback: geetestCallback) => void;
} */

declare global {
    interface Window {
        initGeetest: (userConfig: object, callback: geetestCallback) => void;
    }
}
