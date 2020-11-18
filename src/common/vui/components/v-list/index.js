
import Component1 from './v-list.vue'
import Component2 from './v-list-header.vue'
import Component3 from './v-list-group.vue'
import Component4 from './v-list-item.vue'

let plugin = {
    install: (vue) => {
       vue.component(Component1.name,Component1)
       vue.component(Component2.name,Component2)
       vue.component(Component3.name,Component3)
       vue.component(Component4.name,Component4)
    }
}
export default plugin