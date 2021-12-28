import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueKonva from 'vue-konva';
import App from './main.vue';

const app = createApp(App);
app.use(VueKonva);
app.use(createPinia());
app.mount('#app');
