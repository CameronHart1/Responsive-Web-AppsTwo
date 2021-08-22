import { createRouter, createWebHashHistory } from 'vue-router'

import Landing from '../views/Landing.vue'
import About from '../views/About.vue'

import Social from '../views/LandingSocial.vue'
import Garden from '../views/LandingGarden.vue'


const routes = [{
        path: '/home',
        component: Landing,
        children: [{
                path: 'social',
                name: 'social',
                component: Social
            },
            {
                path: 'garden',
                name: 'garden',
                component: Garden
            }
        ],
        redirect: '/home/social'
    },
    { path: '/about', component: About },
    { path: '/', redirect: '/home/social' },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router