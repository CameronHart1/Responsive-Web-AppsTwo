import { createRouter, createWebHashHistory } from 'vue-router'


import profile from '../views/LayerOne/ProfileHome.vue'
import About from '../views/LayerOne/About.vue'
import Home from '../views/LayerOne/Home.vue'
import Login from '../views/LayerOne/Login.vue'
import store from '../store/Store.js'

import Social from '../views/LayerTwo/ProfileVer/PSocial.vue'
import Garden from '../views/LayerTwo/ProfileVer/Pgarden.vue'

// dedicated pages
import DedForum from '../views/LayerTwo/DedForum.vue'
import DedJourn from '../views/LayerTwo/DedGardenJourn.vue'
import DedPlan from '../views/LayerTwo/DedGardenPlan.vue'


// this lets me navigate between components, change the site path etc.
const routes = [
    { path: '/home', component: Home },
    { path: '/login', name: 'login', component: Login },
    {
        name: 'profile',
        path: '/profile/:username',
        meta: { requiresAuth: true },
        redirect: to => { return to.path + '/social' },
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
            },
            // adding  Forum will have two queries, Search and an array of tags
            {
                path: 'forum/',
                name: 'forum',
                component: DedForum
            },
            {
                path: 'gardenJournal',
                name: 'gardenJournal',
                component: DedJourn
            },
            {
                path: 'gardenPlan',
                name: 'gardenPlan',
                component: DedPlan
            }
        ],
    },
    { path: '/about', component: About }, { path: '/', redirect: '/home' },
]


const router = createRouter({
        history: createWebHashHistory(),
        routes,
    })
    // setting up authentication checking on pages where Auth = true
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!(to.params.username.split('').reverse().join('') == store.state.Auth.AuthKey)) next({ name: 'login', query: { redirect: to.name } })
            else next()
        } else next()
    } else next()
})
export default router