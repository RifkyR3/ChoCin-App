import { type RouteRecordRaw } from "vue-router";
import IndexRouteView from "@components/IndexRouteView.vue";
import GroupView from "@/views/group/GroupView.vue";
import GroupInput from "@/views/group/GroupInput.vue";

const mainUrl = "/groups";

export const groupRoutes: Array<RouteRecordRaw> = [
  {
    path: mainUrl,
    name: "Groups",
    component: IndexRouteView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Group List",
        component: GroupView,
      },
      {
        path: "input/:groupId?",
        name: "Group Input",
        component: GroupInput,
      },
    ],
  },
];
