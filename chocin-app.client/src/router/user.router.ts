import { type RouteRecordRaw } from 'vue-router';
import * as views from '@/views';
import IndexRouteView from '@components/IndexRouteView.vue';

const mainUrl = '/users';

export const userRoutes: Array<RouteRecordRaw> = [
    {
        path: mainUrl,
        name: 'Users',
        component: IndexRouteView,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'User List',
                component: views.UserView,
            },
            {
                path: 'input/:userId?',
                name: 'User Input',
                component: views.UserInput,
            },
        ]
    },
]