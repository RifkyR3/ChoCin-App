<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">{{ title }}</div>
        <Breadcrumb :home="breadHome" :model="breadItem">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'p-breadcrumb-item-icon']" />
                        <span class="p-breadcrumb-item-label">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="p-breadcrumb-item-label">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
        <router-view />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { MenuItem } from 'primevue/menuitem';

interface Data {
    title: string,
    breadHome: MenuItem,
    breadItem: MenuItem[]
}

export default defineComponent({
    data(): Data {
        return {
            title: '',
            breadHome: {
                icon: 'pi pi-home', route: '/'
            },
            breadItem: []
        }
    },
    components: {
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.checkRouter();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'checkRouter'
    },
    methods: {
        checkRouter() {
            const nameRoute = this.$route.name;
            this.title = nameRoute ? nameRoute.toString() : 'Index';

            const curRoute = this.$route.matched;
            this.breadItem = [];

            for (const [key, value] of Object.entries(curRoute)) {
                if (parseInt(key) != 0) {
                let currUrl = '#';

                if ((curRoute.length - 1) > parseInt(key)) {
                    currUrl = value.path
                }

                const _item: MenuItem = {
                    label: value.name?.toString(),
                    route: currUrl
                };
                this.breadItem.push(_item);
                }
            }
        }
    }
})
</script>