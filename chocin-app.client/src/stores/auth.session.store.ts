import type UserGroup from "@/commons/IUserGroup";
import { defineStore } from "pinia";

export const useAuthSessionStore = defineStore('authSession', {
    state: () => {
        return {
            authenticate: false,
            isRemember: false,
            token: '',
            credential: {
                userId: '',
                userName: '',
                fullName: ''
            },
            userGroup: [] as UserGroup[] | [],
            userGroupSelected: 0,
            returnUrl: ''
        }
    },
    persist: {
        storage: sessionStorage
    },
})