import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'signup',
        component: () => import('../components/SignUp.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/info',
        name: 'info',
        component: () => import('../components/BrokersList.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../components/BrokerAccount.vue')
    },
]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router;