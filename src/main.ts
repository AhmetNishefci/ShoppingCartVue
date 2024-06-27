import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './assets/tailwind.css';
import { useCartStore } from './stores';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ToastPlugin);

app.mount('#app');

// Fetch products after the app is mounted
const cartStore = useCartStore();
cartStore.fetchProducts();
