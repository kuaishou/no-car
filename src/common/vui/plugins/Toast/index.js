
// import toast from '../../utils/Toast'
import Toast from '../../../ui/toast'
// Toast.show
// console.log('Toast111', Toast)
let plugin = {
    install: (vue) => {
        // console.log('Toast222', Toast)
        vue.prototype.$toast = Toast;
        vue.$toast = Toast
      
    }
}
export default plugin
export const install = plugin.install