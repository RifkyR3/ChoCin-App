import { defineStore } from "pinia";

interface UserGroup {
    groupId: string;
    groupName: string;
}

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