import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'
import store from './store/Store.js'



const app = createApp(App).use(Vuex);

// router stuff
app.use(router);
app.use(store).mount('#app');
// router stuff end