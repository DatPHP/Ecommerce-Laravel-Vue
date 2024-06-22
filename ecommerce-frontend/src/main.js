// Importing required modules and components
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Vuex store
import router from './router.js'; // Vue router

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './index.css'
import '../node_modules/flowbite-vue/dist/index.css'
// Creating a Vue application instance
const app = createApp(App)

// Registering Vuex store and Vue Router with the application
app.use(store)
app.use(router)

app.use(VueSweetalert2)

// Mounting the application to an HTML element with id 'app'
app.mount('#app')
