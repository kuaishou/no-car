import {
    Tab,
    Tabs,
    Button,
    Cell,
    Popup,
    // CellGroup,
    // NavBar,
    Tabbar,
    TabbarItem,
    Field,
    // Swipe,
    // SwipeItem,
    // Grid,
    // GridItem,
    ActionSheet,
    List,
    Toast,
    DatetimePicker,
    Icon,
    Checkbox,
    Form,
    Switch,
    Stepper  
  } from 'vant'
  
  const components: Array<any> = [
    Tab,
    Tabs,
    Button,
    Cell,
    Popup,
    // CellGroup,
    // NavBar,
    Tabbar,
    TabbarItem,
    Field,
    // Swipe,
    // SwipeItem,
    // Grid,
    // GridItem,
    ActionSheet,
    List,
    Toast,
    DatetimePicker,
    Icon,
    Checkbox,
    Form,
    Switch,
    Stepper  
  ]
  
  const install: any = (Vue: any) => {
    if (install.installed) return
    install.installed = true
    components.map(item => {
      Vue.use(item)
    })
  }
  
  export default {
    install
  }
  