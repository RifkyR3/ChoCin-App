import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import * as views from '@/views';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Dashboard',
        component: views.DashboardView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: views.LoginView,
        meta: {
            requiresUnauth: true,
            layout: 'empty'
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: views.LogoutView,
        meta: {
            requiresAuth: true,
            layout: 'empty'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    
    return next();
});

export default router;