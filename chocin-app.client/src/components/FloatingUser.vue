<template>
    <div class="relative">
        <Button v-on:click="logout()">
            Logout
        </Button>
    </div>
</template>
<script lang="ts">
import { useAuthStore } from '@/stores';
import { defineComponent } from 'vue';

export default defineComponent({
    methods:{
        async logout() {
            const useAuth = useAuthStore();
            await useAuth.logout(true);
        }
    }
})
</script>