import { defineStore } from 'pinia';
import { useAuthLocalStore } from './auth.local.store';
import { useAuthSessionStore } from './auth.session.store';

import router from '@/routers';

import { AuthService, type JwtAuthResponse } from '@/services/WebApi';

const authApi: AuthService = new AuthService();
interface UserGroup {
    groupId: string;
    groupName: string;
}

export const useAuthStore = defineStore('auth', {
    actions: {
        async login(username: string, password: string, remember: boolean) {
            let result = false;

            const response: JwtAuthResponse = await authApi.authenticate({
                userName: username,
                password: password
            });

            if (response.token && response.id) {
                result = true;

                if (remember) {
                    const store = useAuthLocalStore();

                    store.authenticate = true;
                    store.isRemember = true;
                    store.token = response.token;
                    store.credential = {
                        userId: response.id,
                        userName: response.username,
                        fullName: response.fullName ? response.fullName : ''
                    };

                    const group:UserGroup[] = [];
                    
                    response.groups?.forEach(element => {
                        group.push({
                            groupId: element.groupId,
                            groupName: element.groupName
                        })
                    });
                    store.userGroup = group;

                    const date = new Date();
                    date.setDate(date.getDate() + 1);
                    store.expire = date;
                } else {
                    const store = useAuthSessionStore();

                    store.authenticate = true;
                    store.isRemember = false;
                    store.token = response.token;
                    store.credential = {
                        userId: response.id,
                        userName: response.username,
                        fullName: response.fullName ? response.fullName : ''
                    };
                    
                    const group:UserGroup[] = [];
                    
                    response.groups?.forEach(element => {
                        group.push({
                            groupId: element.groupId,
                            groupName: element.groupName
                        })
                    });
                    store.userGroup = group;
                }
            }

            return result;
        },
        logout(redirect: boolean) {
            useAuthLocalStore().$reset();
            useAuthSessionStore().$reset();

            if (redirect) {
                router.push('/login');
            }
        },
        getToken() {
            let token = '';

            const storeSession = useAuthSessionStore();
            const storeLocal = useAuthLocalStore();
            if (storeSession.authenticate && storeSession.token != '') {
                token = storeSession.token;
            } else {
                token = storeLocal.token;
            }

            return token;
        },
        getUserLogin() {
            const storeSession = useAuthSessionStore();
            const storeLocal = useAuthLocalStore();
            if (storeSession.authenticate && storeSession.token != '') {
                return storeSession.authenticate;
            } else {
                return storeLocal.authenticate;
            }
        },
        getUserGroupLogin() {
            const storeSession = useAuthSessionStore();
            const storeLocal = useAuthLocalStore();
            if (storeSession.authenticate && storeSession.token != '') {
                return storeSession.userGroup;
            } else {
                return storeLocal.userGroup;
            }
        },
        getAuthenticate() {
            const storeSession = useAuthSessionStore();
            const storeLocal = useAuthLocalStore();
            if (storeSession.authenticate && storeSession.token != '') {
                return storeSession.authenticate;
            } else {
                return storeLocal.authenticate;
            }
        },
        getRemeber() {
            const storeSession = useAuthSessionStore();
            const storeLocal = useAuthLocalStore();
            if (storeSession.authenticate && storeSession.token != '') {
                return storeSession.isRemember;
            } else {
                return storeLocal.isRemember;
            }
        },
        getExpire() {
            const storeLocal = useAuthLocalStore();
            return storeLocal.expire;
        }
    }
});