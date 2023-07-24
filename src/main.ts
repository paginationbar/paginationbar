import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import 'prismjs/themes/prism.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
