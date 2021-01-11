import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import "./common/css/reset.scss"
import "./common/css/index.scss"
//import store from './store'
import "./global.js"
import About from "./views/About.vue"

createApp(App)
  .component("tlabout", About)
  .use(router)
  .use(ElementPlus)
  .mount("#app")
//createApp(App).use(store).use(router).mount('#app')
