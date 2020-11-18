
import Component from './index.vue'

let plugin = {
    install: (vue) => {
       vue.component(Component.name,Component)
    }
}
export default plugin