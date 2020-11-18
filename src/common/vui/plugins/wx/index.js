
import wechat from '../../../wechat'

let plugin = {
    install: (vue, opts) => {
        wechat.init(opts);
        vue.prototype.$wx = wechat;
        vue.$wx = wechat;
       
    }
}
export default plugin