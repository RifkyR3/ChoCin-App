<template>
    <div class="card">
        <form @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2 mb-3">
                <label for="name1">Name</label>
                <InputText v-model="dataInput.name" id="name1" type="text" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="username1">Username</label>
                <InputText v-model="dataInput.userName" id="username1" type="text" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="password1">Password</label>
                <InputText v-model="dataInput.password" id="password1" type="password" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="module">Groups</label>
                <MultiSelect v-model="dataInput.groupIds" display="chip" :options="groupSelect" optionLabel="name"
                    optionValue="value" filter placeholder="Select Groups" class="w-full" :disabled="progress" />
            </div>

            <Button type="submit" label="Submit" :fluid="false" icon="pi pi-check"></Button>
            &nbsp;
            <Button label="Cancel" :fluid="false" severity="danger" icon="pi pi-times" v-on:click="btnBack"></Button>
        </form>
    </div>
</template>
<route lang="json">{
    "name": "User Input"
}</route>
<script lang="ts">
import { ToastLife } from '@/commons/Const';
import type { UserInput, UserModel, DropDownModel } from '@/services/WebApi';
import { GroupService, UserService } from '@/services/WebApi';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

const groupApi: GroupService = new GroupService();
const userApi: UserService = new UserService();

interface Data {
    moduleName: string,
    moduleUrl: string,
    data: UserModel | null,
    dataId: string | null,
    dataInput: UserInput,
    inputResult: boolean,
    progress: boolean,
    groupSelect: DropDownModel[]
}

export default defineComponent({
    data(): Data {
        return {
            moduleName: '',
            moduleUrl: '/users',
            data: null,
            dataId: null,
            dataInput: {
                name: '',
                userName: '',
                password: '',
                groupIds: []
            },
            inputResult: false,
            progress: false,
            groupSelect: []
        }
    },
    components: {
    },
    async mounted() {
        const route = useRoute("User Input");
        if (route.name) {
            this.moduleName = route.name.toString();
        }

        await this.getGroupDropDown();

        const userId = route.params.userId;
        if (userId) {
            this.dataId = userId.toString();
            await this.getUserById(this.dataId);
        }
    },
    methods: {
        btnBack() {
            this.$router.push(this.moduleUrl);
        },
        async onSubmit() {
            if (this.dataId) {
                await this.doUpdate(this.dataId)
            } else {
                await this.doAdd();
            }

            if (this.inputResult) {
                this.$router.push(this.moduleUrl);
            }
        },
        async doAdd() {
            try {
                await userApi.addUser(this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to add User",
                    life: ToastLife
                });
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to add User",
                    life: ToastLife
                });
                this.inputResult = false;
            }
        },
        async doUpdate(dataId: string) {
            try {
                await userApi.updateUser(dataId, this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to update User",
                    life: ToastLife
                });
                this.inputResult = true;
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to update User",
                    life: ToastLife
                });
                this.inputResult = false;
            }
        },
        async getUserById(id: string) {
            try {
                this.data = await userApi.getUserById(id);

                this.dataInput = {
                    name: this.data.userFullName || '',
                    userName: this.data.userName,
                    password: '',
                    groupIds: this.data.groups?.map(e => e.groupId)
                }

            } catch (e) {
                // console.log(e)
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to get Group data"
                });
            }
        },
        async getGroupDropDown() {
            this.groupSelect = await groupApi.getComboGroup();
        }
    },
})
</script>