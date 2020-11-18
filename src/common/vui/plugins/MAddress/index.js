import Component from '../../components/MAddress'
let $vm
let watcher

const plugin = {
    install(vue, pluginOptions = {}) {
        const component = vue.extend(Component)

        if (!$vm) {
            $vm = new component({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        //console.log('component')
        // const defaults = {}
        // for (let i in $vm.$options.props) {
        //     if (i !== 'value') {
        //         defaults[i] = $vm.$options.props[i].default
        //     }
        // }

        const c = {
            show(options = {}) {
                // destroy watcher

                $vm.show = true
            },

            hide() {
                $vm.show = false
            },
            isVisible() {
                return $vm.show
            }
        }

        vue.$address = c;
        vue.mixin({
            created: function () {
                this.$address = vue.$address
            }
        })
    }
}

export default plugin
export const install = plugin.install