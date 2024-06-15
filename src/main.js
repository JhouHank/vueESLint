import './assets/main.css';

import {createApp} from 'vue';
import {createPinia} from 'pinia';
import SvgIcon from '@/components/SvgIcon.vue';
import 'virtual:svg-icons-register';
import App from './App.vue';
import router from './router';
const app = createApp(App);
app.component('Icon', SvgIcon);
app.use(createPinia());
app.use(router);
app.mount('#app');
