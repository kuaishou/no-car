

// import MDialog from './plugins/MDialog'
// import Loading from './plugins/Loading'
// import Toast from './plugins/Toast'
// import bus from './plugins/bus'

import VScroll from './components/v-scroll'
import VNav from './components/v-nav'
import VContent from './components/v-content'
import VView from './components/v-view'
import VLoading from './components/v-loading'
import VList from './components/v-list'

import VButton from './components/v-button'
import VSwitch from './components/v-switch'
import VCheckbox from './components/v-checkbox'
import VCheckboxGroup from './components/v-checkbox-group'
import VRadio from './components/v-radio'
import VRadioGroup from './components/v-radio-group'
import VSelect from './components/v-select'
import VInput from './components/v-input'
import VDialog from './components/v-dialog'
import VTextarea from './components/v-textarea'
import VKeyboard from './components/v-keyboard/index/index'
import VTelKeyboard from './components/v-keyboard/v-tel-keyboard'
import VIDKeyboard from './components/v-keyboard/v-id-keyboard'
import VVehicleKeyboard from './components/v-keyboard/v-vehicle-keyboard'
import VPicker from './components/v-picker'
import Keyboard from './components/Keyboard'

const components = [
    VScroll,
    VNav,
    VView,
    VContent,
    VLoading,
    VList,
    VButton,
    VSwitch,
    VCheckbox,
    VCheckboxGroup,
    VRadio,
    VRadioGroup,
    VSelect,
    VInput,
    VDialog,
    VTextarea,
    VKeyboard,
    VTelKeyboard,
    VIDKeyboard,
    VVehicleKeyboard,
    VPicker,
    Keyboard
]

// console.log(Object.values(components))
// export {
//     VScroll,
//     VList,
//     VLoading,
//     VNav,
//     VButton
// }
// export Object.assign(Object.values(components))
// Object.values(components)
export default {
    install: (vue) => {

        components.forEach(v=>{
           
          try {
            vue.use(v)
          } catch (error) {
              console.log(v)
          }
        })
      
        
    }
}