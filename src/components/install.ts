import {App} from 'vue'
import Icon from  './Icon/Icon.vue'
export const install = (app:App):void => {
  app.component(Icon.name, Icon)
}
export default {
  install
}