// import { type RouteRecordRaw } from 'vue-router';
// import * as views from '@/views';
// import IndexRouteView from '@components/IndexRouteView.vue';

// const mainUrl = '/modules';

// export const moduleRoutes: Array<RouteRecordRaw> = [
//     {
//         path: mainUrl,
//         name: 'Index Modules',
//         component: IndexRouteView,
//         meta: {
//             requiresAuth: true
//         },
//         children: [
//             {
//                 path: '',
//                 name: 'Modules',
//                 component: views.ModuleView,
//                 meta: {
//                     requiresAuth: true
//                 }
//             },
//             {
//                 path: 'input/:moduleId?',
//                 name: 'Module Input',
//                 component: views.ModuleInput,
//                 meta: {
//                     requiresAuth: true
//                 }
//             },
//         ]
//     }
// ]