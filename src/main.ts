import { createApp } from 'vue';
import VueKonva from 'vue-konva';
import App from './App.vue';
import { key, store } from './store';

const app = createApp(App);
app.use(VueKonva);
app.use(store, key);
app.mount('#app');
