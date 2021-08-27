import { createRouter, createWebHashHistory } from 'vue-router'

import profile from '../views/ProfileHome.vue'
import About from '../views/About.vue'

import Social from '../views/PSocial.vue'
import Garden from '../views/Pgarden.vue'


const routes = [{
        path: '/profile',
        component: profile,
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
        redirect: '/profile/social'
    },
    { path: '/about', component: About },
    { path: '/', redirect: '/profile/social' },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router