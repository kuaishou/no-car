
import loading from '../../../ui/loading'
// console.log('loading', loading)
let plugin = {
    install: (vue) => {
        // loading
        vue.prototype.$loading = loading;
    }
}
export default plugin
export const install = plugin.install