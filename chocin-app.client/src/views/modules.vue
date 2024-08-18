<template>
    <IndexRouteView></IndexRouteView>
</template>
<route lang="json">{
    "name": "Modules",
    "meta": {
        "requiresAuth": true
    }
}</route>
<script setup lang="ts">
import IndexRouteView from '@/components/IndexRouteView.vue';
</script>