// import objectAssign from 'object-assign'
import ToastComponent from '../../components/MDialog'
import mergeOptions  from '../../../utils/mergeOptions'

let $vm
let watcher

const plugin = {
    install(vue, pluginOptions = {}) {
        const Toast = vue.extend(ToastComponent)

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const defaults = {}
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default
            }
        }

        const dialog = {
            show(options = {}) {
                // destroy watcher
                watcher && watcher()
                if (typeof options === 'string') {
                    mergeOptions($vm, Object.assign({}, pluginOptions, { text: options }))
                } else if (typeof options === 'object') {
                    mergeOptions($vm, Object.assign({}, pluginOptions, options))
                }
                if (typeof options === 'object' && options.onShow || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm)
                        val === false && options.onHide && options.onHide($vm)
                    })
                }
                $vm.show = true
            },
            text(text, position = 'default') {
                this.show({
                    type: 'text',
                    width: 'auto',
                    position,
                    text
                })
            },
            hide() {
                $vm.show = false
            },
            isVisible() {
                return $vm.show
            }
        }

        // all Vux's plugins are included in this.$vux
        // if (!vue.$vux) {
        //   vue.$vux = {
        //     toast
        //   }
        // } else {
        //   vue.$vux.toast = toast
        // }
        vue.$dialog = dialog;
        vue.mixin({
            created: function () {
                this.$dialog = vue.$dialog
            }
        })
    }
}

export default plugin
export const install = plugin.install
