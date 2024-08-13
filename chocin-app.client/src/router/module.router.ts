import { type RouteRecordRaw } from "vue-router";
import IndexRouteView from "@components/IndexRouteView.vue";
import ModuleView from "@/views/module/ModuleView.vue";
import ModuleInput from "@/views/module/ModuleInput.vue";

const mainUrl = "/modules";

export const moduleRoutes: Array<RouteRecordRaw> = [
  {
    path: mainUrl,
    name: "Modules",
    component: IndexRouteView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Module List",
        component: ModuleView,
      },
      {
        path: "input/:moduleId?",
        name: "Module Input",
        component: ModuleInput,
      },
    ],
  },
];
