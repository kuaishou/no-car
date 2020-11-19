import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from './plugins/vant'

import 'amfe-flexible/index.js'//rem适配

createApp(App).use(vant).use(store).use(router).mount('#app')

// const app = createApp
// //vue3.0不再可以像之前一样可以将公共方法属性等挂载到vue的原型对象上
// //这里可以将公共方法属性写在第二个参数中，参数是一个对象
// //组件的注册通过.use链式调用
// app(App, { http }).use(Button).use(store).use(router).mount('#app')