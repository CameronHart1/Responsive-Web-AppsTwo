import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import Home from './Views/MainPage.vue'
import About from './Views/About.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')