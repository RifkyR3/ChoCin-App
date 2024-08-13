import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import AccessView from "@/views/AccessView.vue";
import ErrorView from "@/views/ErrorView.vue";

import { userRoutes } from "./user.router";
import { groupRoutes } from "./group.router";
import { moduleRoutes } from "./module.router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      requiresUnauth: true,
      layout: "empty",
    },
  },

  ...userRoutes,
  ...groupRoutes,
  ...moduleRoutes,

  {
    path: "/denied",
    name: "Denied",
    component: AccessView,
    meta: {
      requiresAuth: true,
      layout: "empty",
    },
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorView,
    meta: {
      requiresAuth: true,
      layout: "empty",
    },
  },
  // otherwise redirect to error
  {
    path: "/:pathMatch(.*)*",
    component: ErrorView,
    meta: {
      requiresAuth: true,
      layout: "empty",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  const logedin = auth.getAuthenticate();

  if (to.meta.requiresAuth && !logedin) {
    return next("/login");
  }

  if (logedin) {
    if (auth.getRemeber()) {
      const date = new Date();
      const dateExpire = new Date(auth.getExpire());

      if (date > dateExpire) {
        auth.logout(false);
        return next("/login");
      }
    }

    if (to.meta.requiresUnauth) {
      return next("/");
    }
  }

  return next();
});

export default router;
