import { type RouteRecordRaw } from 'vue-router';
import * as views from '@/views';
import IndexRouteView from '@components/IndexRouteView.vue';

const mainUrl = '/groups';

export const groupRoutes: Array<RouteRecordRaw> = [
    {
        path: mainUrl,
        name: 'Groups',
        component: IndexRouteView,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Groups',
                children:[
                    {
                        path: '',
                        component: views.GroupView
                    },
                    {
                        path: 'input/:groupId?',
                        name: 'Group Input',
                        component: views.GroupInput
                    }
                ]
            }
        ]
    }
]