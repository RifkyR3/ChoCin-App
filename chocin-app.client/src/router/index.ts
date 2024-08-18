import {
  createRouter,
  // createWebHistory,
  createMemoryHistory,
  // type RouteRecordRaw,
} from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";
import { useAuthStore } from "@/stores/auth.store";

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

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
