import './shared/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './app.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Vue3Toastify, {
  autoClose: 3000,
  newestOntop: true,
  position: 'top-right',
})

app.mount('#app')
