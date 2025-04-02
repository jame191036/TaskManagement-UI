// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'  // Import Bootstrap CSS
import 'bootstrap'  // Import Bootstrap JS (optional, if you need JS components like modals)

const app = createApp(App);
app.use(router);
app.mount('#app');
