<script lang="ts">
import { defineComponent } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useUiStore } from '@/stores/ui.store';
import type { MenuItem } from 'primevue/menuitem';
import { useAuthStore } from '@/stores/auth.store';

interface Data {
    model: MenuItem[]
}

export default defineComponent({
    data(): Data {
        return {
            model: []
        }
    },
    components: {
        'app-menu-item': AppMenuItem
    },
    async mounted() {
        await this.loadMenu();
    },
    methods: {
        async loadMenu() {
            if (useUiStore().menuItems.length <= 0) {
                const groupLogin = useAuthStore().getUserGroupLogin();
                if(groupLogin) {
                    await useUiStore().setMenuModule(groupLogin.groupId);
                }
            }

            this.model = useUiStore().menuItems;
        }
    }
})
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
