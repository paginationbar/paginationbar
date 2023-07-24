import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import 'prismjs/themes/prism.min.css'

const app = createApp(App)
const piniaStore = createPinia()
piniaStore.use(piniaPluginPersistedstate)

app.use(piniaStore)
app.use(router)

app.mount('#app')
