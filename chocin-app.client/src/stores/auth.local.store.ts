import { defineStore } from "pinia";

interface UserGroup {
    groupId: string;
    groupName: string;
}

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