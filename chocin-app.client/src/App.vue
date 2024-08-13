<template>
    <Toast/>
    <component :is='layout'>
        <router-view />
    </component>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const defaultLayout = 'default'
const { currentRoute } = useRouter()

const layout = computed(
    () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
)

import { useUiStore } from '@/stores/ui.store';
import { useLayout } from '@/layouts/composables/layout';

const { toggleDarkMode, isDarkTheme } = useLayout();
const uiStore = useUiStore();

if (isDarkTheme.value != uiStore.isDarkMode) {
    toggleDarkMode()
}
</script>