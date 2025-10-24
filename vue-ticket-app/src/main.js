// vue-ticket-app/src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the shared CSS file (THIS IS REQUIRED)
import '../../shared-assets/styles.css'

// Import Toastify CSS
import "vue-toastification/dist/index.css";
// Import the Toast plugin
import Toast from "vue-toastification";

const app = createApp(App)

app.use(router)

// Tell Vue to use the Toast plugin
app.use(Toast, {
    position: "top-right",
    timeout: 3000,
    hideProgressBar: true,
});

app.mount('#app')
