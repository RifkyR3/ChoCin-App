import { defineStore } from "pinia";
import { useAuthStore } from "./auth.store";

export const useTokenStore = defineStore("token", {
  actions: {
    getToken(): string {
      return useAuthStore().getToken();
    },
  },
});
