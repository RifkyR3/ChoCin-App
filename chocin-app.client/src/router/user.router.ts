import { type RouteRecordRaw } from "vue-router";
import IndexRouteView from "@components/IndexRouteView.vue";
import UserView from "@/views/user/UserView.vue";
import UserInput from "@/views/user/UserInput.vue";

const mainUrl = "/users";

export const userRoutes: Array<RouteRecordRaw> = [
  {
    path: mainUrl,
    name: "Users",
    component: IndexRouteView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "User List",
        component: UserView,
      },
      {
        path: "input/:userId?",
        name: "User Input",
        component: UserInput,
      },
    ],
  },
];
