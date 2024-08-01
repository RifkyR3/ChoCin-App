import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import * as views from '@/views';
import { useAuthStore } from '@/stores';

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

    {
        path: '/denied',
        name: 'Denied',
        component: views.AccessView,
        meta: {
            requiresAuth: true,
            layout: 'empty'
        }
    },
    {
        path: '/error',
        name: 'Error',
        component: views.ErrorView,
        meta: {
            requiresAuth: true,
            layout: 'empty'
        }
    },
    // otherwise redirect to error
    {
        path: '/:pathMatch(.*)*',
        component: views.ErrorView,
        meta: {
            requiresAuth: true,
            layout: 'empty'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    const logedin = auth.getAuthenticate();

    if (to.meta.requiresAuth && !logedin) {
        return next('/login');
    }

    if (logedin) {
        if (auth.getRemeber()) {
            const date = new Date();
            const dateExpire = new Date(auth.getExpire());

            if (date > dateExpire) {
                auth.logout(false);
                return next('/login')
            }
        }

        if(to.meta.requiresUnauth) {
            return next('/');
        }
    }
    
    return next();

});

export default router;