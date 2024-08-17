import { defineStore } from "pinia";
import router from "@/router";

import type UserGroup from "@/commons/IUserGroup";
import { AuthService, type JwtAuthResponse } from "@/services/WebApi";
import { useUiStore } from "./ui.store";
import { LoginExpireDay } from "@/commons/Const";

export const useAuthStore = defineStore("auth", {
  actions: {
    async login(username: string, password: string, remember: boolean) {
      let result = false;

      const authApi: AuthService = new AuthService();

      const response: JwtAuthResponse = await authApi.authenticate({
        userName: username,
        password: password,
      });

      if (response.token && response.id) {
        result = true;

        let store;
        if (remember) {
          store = useAuthLocalStore();

          const date = new Date();
          date.setDate(date.getDate() + LoginExpireDay);
          store.expire = date.toString();
        } else {
          store = useAuthSessionStore();
        }

        store.authenticate = true;
        store.isRemember = remember;
        store.token = response.token;
        store.credential = {
          userId: response.id,
          userName: response.username,
          fullName: response.fullName ? response.fullName : "",
        };

        const group: UserGroup[] = [];

        response.groups?.forEach((element) => {
          group.push({
            groupId: element.groupId,
            groupName: element.groupName,
          });
        });
        store.userGroup = group;

        await useUiStore().setMenuModule(this.getUserGroupLogin().groupId);
      }

      return result;
    },
    logout(redirect: boolean) {
      useAuthLocalStore().$reset();
      useAuthSessionStore().$reset();
      useUiStore().$reset();

      if (redirect) {
        router.push("/login");
      }
    },
    getToken() {
      let token = "";

      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        token = storeSession.token;
      } else {
        token = storeLocal.token;
      }

      return token;
    },
    getUserLogin() {
      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        return storeSession.authenticate;
      } else {
        return storeLocal.authenticate;
      }
    },
    getUserGroupsLogin(): UserGroup[] {
      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        return storeSession.userGroup;
      } else {
        return storeLocal.userGroup;
      }
    },
    getUserGroupLogin(): UserGroup {
      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        return storeSession.userGroup[storeSession.userGroupSelected];
      } else {
        return storeLocal.userGroup[storeLocal.userGroupSelected];
      }
    },
    setUserGroupLogin(key: number) {
      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        storeSession.userGroupSelected = key;
        return storeSession.userGroup[storeSession.userGroupSelected];
      } else {
        storeLocal.userGroupSelected = key;
        return storeLocal.userGroup[storeLocal.userGroupSelected];
      }
    },
    getAuthenticate() {
      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        return storeSession.authenticate;
      } else {
        return storeLocal.authenticate;
      }
    },
    getRemeber() {
      const storeSession = useAuthSessionStore();
      const storeLocal = useAuthLocalStore();
      if (storeSession.authenticate && storeSession.token != "") {
        return storeSession.isRemember;
      } else {
        return storeLocal.isRemember;
      }
    },
    getExpire() {
      const storeLocal = useAuthLocalStore();
      return storeLocal.expire;
    },
  },
});

const useAuthLocalStore = defineStore("authLocal", {
  state: () => {
    return {
      authenticate: false,
      isRemember: false,
      expire: "",
      token: "",
      credential: {
        userId: "",
        userName: "",
        fullName: "",
      },
      userGroup: [] as UserGroup[] | [],
      userGroupSelected: 0,
      returnUrl: "",
    };
  },
  persist: {
    storage: localStorage,
  },
});

const useAuthSessionStore = defineStore("authSession", {
  state: () => {
    return {
      authenticate: false,
      isRemember: false,
      token: "",
      credential: {
        userId: "",
        userName: "",
        fullName: "",
      },
      userGroup: [] as UserGroup[] | [],
      userGroupSelected: 0,
      returnUrl: "",
    };
  },
  persist: {
    storage: sessionStorage,
  },
});
