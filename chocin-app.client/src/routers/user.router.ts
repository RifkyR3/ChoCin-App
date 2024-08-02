// import { type RouteRecordRaw } from 'vue-router';
// import * as views from '@/views';
// import IndexRouteView from '@components/IndexRouteView.vue';

// const mainUrl = '/users';

// export const userRoutes: Array<RouteRecordRaw> = [
//     {
//         path: mainUrl,
//         name: 'Index Users',
//         component: IndexRouteView,
//         meta: {
//             requiresAuth: true
//         },
//         children: [
//             {
//                 path: '',
//                 name: 'User List',
//                 component: views.UserView,
//                 meta: {
//                     requiresAuth: true
//                 }
//             },
//             {
//                 path: 'input/:userId?',
//                 name: 'User Input',
//                 component: views.UserInput,
//                 meta: {
//                     requiresAuth: true
//                 }
//             },
//         ]
//     },
// ]