// import { type RouteRecordRaw } from 'vue-router';
// import * as views from '@/views';
// import IndexRouteView from '@components/IndexRouteView.vue';

// const mainUrl = '/groups';

// export const groupRoutes: Array<RouteRecordRaw> = [
//     {
//         path: mainUrl,
//         name: 'Index Groups',
//         component: IndexRouteView,
//         meta: {
//             requiresAuth: true
//         },
//         children: [
//             {
//                 path: '',
//                 name: 'Groups',
//                 component: views.GroupView,
//                 meta: {
//                     requiresAuth: true
//                 }
//             },
//             {
//                 path: 'input/:groupId?',
//                 name: 'Group Input',
//                 component: views.GroupInput,
//                 meta: {
//                     requiresAuth: true
//                 }
//             },
//         ]
//     }
// ]