<template>
    <Menu :model="items" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores';
import type { MenuItem } from 'primevue/menuitem';

interface Data {
    items: MenuItem[],
}
export default defineComponent({
    data(): Data {
        return {
            items: []
        }
    },
    created() {
        this.parseItemUser();
    },
    methods: {
        async logout() {
            const useAuth = useAuthStore();
            await useAuth.logout(true);
        },
        parseItemUser() {
            this.items = [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                    }
                },
                {
                    label: 'Sign Out',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logout();
                    }
                }
            ]
        }
    }
})
</script>