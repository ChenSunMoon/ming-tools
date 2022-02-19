import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MingUI from '@/components/install'
import installElement from './plugins/element'
import installFfmpeg from './plugins/ffmpeg'
import '@/assets/style/common.scss'
const app = createApp(App)

installElement(app)
installFfmpeg()
MingUI.install(app)
app.use(store).use(router).mount('#app')