import { createApp } from 'vue';
import App from './App.vue';
import { FastClick } from 'fastclick-hvue';
// @ts-ignore
import { Tab, Tabs } from 'vant';

// import vConsole from 'vconsole';
// new vConsole();

FastClick.attach(document.body);

createApp(App).use(Tab).use(Tabs).mount('#app');
