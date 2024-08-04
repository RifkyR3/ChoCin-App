import type UserGroup from "@/commons/IUserGroup";
import { defineStore } from "pinia";

export const useAuthLocalStore = defineStore('authLocal', {
    state: () => {
        return {
            authenticate: false,
            isRemember: false,
            expire: new Date(),
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
        storage: localStorage
    },
})