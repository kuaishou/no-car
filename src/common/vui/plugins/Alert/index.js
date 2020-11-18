
import dialog from '../utils/Dialog'

let plugin = {
    install: (vue) => {
        vue.$dialog = dialog;
        vue.mixin({
            created: function () {
                this.$dialog = vue.$dialog
            }
        })
    }
}
export default plugin