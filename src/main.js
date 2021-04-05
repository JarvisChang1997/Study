import { createApp } from 'vue';
import App from './App.vue';

import L from 'leaflet';

import  axios  from 'axios';
import  VueAxios  from 'vue-axios'

const app = createApp(App)
app.config.productionTip = false;

app.use(L);
app.use(VueAxios,axios);

app.mount('#app');
