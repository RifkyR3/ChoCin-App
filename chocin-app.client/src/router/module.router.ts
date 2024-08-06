import { type RouteRecordRaw } from 'vue-router';
import * as views from '@/views';
import IndexRouteView from '@components/IndexRouteView.vue';

const mainUrl = '/modules';

export const moduleRoutes: Array<RouteRecordRaw> = [
    {
        path: mainUrl,
        name: 'Modules',
        component: IndexRouteView,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Module List',
                component: views.ModuleView,
            },
            {
                path: 'input/:moduleId?',
                name: 'Module Input',
                component: views.ModuleInput,
            },
        ]
    }
]