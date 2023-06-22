import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from "./store";
import setupInterceptors from './service/setupInterceptors';

setupInterceptors(store);

const app = createApp(App)
app.use(router).use(store).mount('#app')
app.config.globalProperties.$axios = axios;