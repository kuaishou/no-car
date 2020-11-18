
import bus from './bus'

let plugin = {
    install: (vue) => {
        
        vue.prototype.$bus = bus;
    }
}
export default plugin