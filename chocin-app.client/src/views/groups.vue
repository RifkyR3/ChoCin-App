<template>
    <IndexRouteView></IndexRouteView>
</template>
<route lang="json">{
    "name": "Groups",
    "meta": {
        "requiresAuth": true
    }
}</route>
<script setup lang="ts">
import IndexRouteView from '@/components/IndexRouteView.vue';
</script>