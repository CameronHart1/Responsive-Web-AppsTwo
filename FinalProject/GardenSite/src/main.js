import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'


const app = createApp(App).use(Vuex);

// router stuff
app.use(router).mount('#app');
// router stuff end