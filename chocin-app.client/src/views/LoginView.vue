<template>
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <!-- <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-4" /> -->
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome</div>
                        <span class="text-surface-600 dark:text-surface-200 font-medium">Sign in to continue</span>
                    </div>

                    <form @submit.prevent="onSubmit">
                        <div>
                            <label for="user_name"
                                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                            <InputText id="user_name" type="text" placeholder="Username"
                                class="w-full md:w-[30rem] mb-8" style="padding: 1rem" v-model="username" required
                                :disabled="isSubmit" />

                            <label for="password1"
                                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                                class="w-full mb-4" inputClass="w-full" :inputStyle="{ padding: '1rem' }" required
                                :disabled="isSubmit">
                            </Password>

                            <div class="flex items-center justify-between mb-8 gap-8">
                                <div class="flex items-center">
                                    <Checkbox v-model="isRemember" id="rememberme1" binary class="mr-2"
                                        :disabled="isSubmit"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                            <Button type="submit" label="Sign In" class="w-full p-4 text-xl"
                                :disabled="isSubmit"></Button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

interface Data {
    username: string,
    password: string,
    isRemember: boolean,
    isSubmit: boolean
}

const router = useRouter()

export default defineComponent({
    data(): Data {
        return {
            username: '',
            password: '',
            isRemember: false,
            isSubmit: false
        }
    },
    methods: {
        async onSubmit() {
            this.isSubmit = true;
            const useAuth = useAuthStore();

            try {
                const res = await useAuth.login(
                    this.username,
                    this.password,
                    this.isRemember
                )

                if (res) {
                    router.push('/');

                } else {
                    this.$toast.add({
                        severity: 'warn',
                        summary: 'Login Failed',
                        detail: 'Please try again.'
                    })
                }

            } catch (e) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: 'Unexpected.'
                })
            }

            this.isSubmit = false;
        }
    }
})
</script>
<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
