import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import '@assets/main.css';
import router from '@router/index';
import { createPinia } from 'pinia';
import '@assets/style.css';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

DataTable.use(DataTablesCore);
const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$axios = axios; // Make Axios globally available
app.use(pinia);
app.use(router);
app.mount('#app');
