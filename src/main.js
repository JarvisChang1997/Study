import { createApp } from 'vue';
import App from './App.vue';

import { axios } from 'axios';
import { VueAxios } from 'vue-axios'
createApp(App).use(VueAxios, axios);
createApp(App).config.productionTip = false;





createApp(App).mount('#app');
