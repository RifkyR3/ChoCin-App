<template>
    <div class="card">
        <form @submit.prevent="onSubmit">

            <div class="flex flex-col gap-2 mb-3">
                <label for="name1">Name</label>
                <InputText v-model="dataInput.name" id="name1" type="text" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="path1">Path</label>
                <InputText v-model="dataInput.path" id="path1" type="text" :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="icon1">Icon</label>
                <InputText v-model="dataInput.icon" id="icon1" type="text" :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="order">Ordering</label>
                <InputNumber v-model="dataInput.order" id="order" type="number" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="module">Main Module</label>
                <Select v-model="dataInput.subModuleId" :options="moduleSelect" filter optionLabel="name" optionValue="value"
                    placeholder="Select a Main Module" class="w-full" :disabled="progress">
                </Select>
            </div>

            <Button type="submit" label="Submit" :fluid="false" icon="pi pi-check"></Button>
            &nbsp;
            <Button label="Cancel" :fluid="false" severity="danger" icon="pi pi-times" v-on:click="btnBack"></Button>
        </form>
    </div>
    <list-icon></list-icon>
</template>
<route lang="json">{
    "name": "Module Input"
}</route>
<script lang="ts">
import { ToastLife } from '@/commons/Const';
import type { ModuleInput, ModuleModel, DropDownModel } from '@/services/WebApi';
import { ModuleService } from '@/services/WebApi';
import { defineComponent } from 'vue';
import ListIcon from '@/components/ListIcon.vue';
import { useRoute } from 'vue-router';

const moduleApi: ModuleService = new ModuleService();

interface Data {
    moduleName: string,
    moduleUrl: string,
    data: ModuleModel | null,
    dataId: string | null,
    dataInput: ModuleInput,
    inputResult: boolean,
    progress: boolean,
    moduleSelect: DropDownModel[]
}

export default defineComponent({
    data(): Data {
        return {
            moduleName: '',
            moduleUrl: '/modules',
            data: null,
            dataId: null,
            dataInput: {
                name: '',
                icon: '',
                path: '',
                order: 0,
                subModuleId: undefined
            },
            inputResult: false,
            progress: false,
            moduleSelect: []
        }
    },
    components: {
        ListIcon,
    },
    async mounted() {
        const route = useRoute("Module Input");
        if (route.name) {
            this.moduleName = route.name.toString();
        }

        await this.getComboMainModule();

        const moduleId = route.params.moduleId;
        if (moduleId) {
            this.dataId = moduleId.toString();
            await this.fetch(this.dataId);
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
                await moduleApi.addModule(this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to add Module",
                    life: ToastLife
                });
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to add Module",
                    life: ToastLife
                });
                this.inputResult = false;
            }
        },
        async doUpdate(dataId: string) {
            try {
                await moduleApi.updateModule(dataId, this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to update Module",
                    life: ToastLife
                });
                this.inputResult = true;
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to update Module",
                    life: ToastLife
                });
                this.inputResult = false;
            }
        },
        async fetch(id:string) {
            try {
                this.data = await moduleApi.getModuleById(id);

                this.dataInput = {
                    name: this.data.name,
                    icon: this.data.icon,
                    path: this.data.path,
                    order: this.data.order,
                    subModuleId: this.data.subId,
                }

            } catch (e) {
                // console.log(e)
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to get Module data"
                });
            }
        },
        async getComboMainModule() {
            this.moduleSelect = await moduleApi.getComboMainModule();
        }
    },
})
</script>