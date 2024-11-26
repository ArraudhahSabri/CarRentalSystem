import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const app = createApp(App);
app.config.globalProperties.$axios = axios; // Make Axios globally available
app.mount('#app');