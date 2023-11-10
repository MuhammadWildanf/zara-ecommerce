
import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '187029775366-khoijvur1ft7gc3uqausri6hi5q9famk.apps.googleusercontent.com'
})

app.mount('#app')