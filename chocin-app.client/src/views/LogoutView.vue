<template>
    Logout
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores';

const useAuth = useAuthStore();
useAuth.logout(true)
</script>