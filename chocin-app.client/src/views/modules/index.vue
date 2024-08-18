<template>
    <div class="card">
        <Toolbar class="mb-6">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" as="router-link"
                    to="/modules/input/" />
            </template>

        </Toolbar>

        <DataTable :value="datas" stripedRows tableStyle="min-width: 50rem">
            <Column field="name" header="Name"></Column>
            <Column header="Icon">
                <template #body="slotProps">
                    <i v-if="slotProps.data.icon && slotProps.data.icon != ''" :class="slotProps.data.icon" class="pi pi-fw">&nbsp;</i>
                    {{ slotProps.data.icon }}
                </template>
            </Column>
            <Column field="path" header="Path"></Column>
            <Column field="order" header="Order"></Column>
            <Column :exportable="false" style="width: 20%">
                <template #body="slotProps">
                    <Button v-tooltip="'Edit'" icon="pi pi-pencil" outlined rounded class="mr-2"
                        @click="btnEdit(slotProps.data.id)" />
                    <Button v-tooltip="'Delete'" icon="pi pi-trash" outlined rounded severity="danger" @click="btnDelete(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span v-if="data">Are you sure you want to delete the selected data?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="btnDeleteConfirm" />
        </template>
    </Dialog>
</template>
<route lang="json">{
    "name": "Module List"
}</route>
<script lang="ts">
import { ToastLife } from '@/commons/Const';
import { ModuleService, type ModuleModel } from '@/services/WebApi';
import { defineComponent } from 'vue';

const api: ModuleService = new ModuleService();

interface Data {
    datas: ModuleModel[],
    data: ModuleModel | null,
    deleteDialog: boolean,
    moduleName: string
}
export default defineComponent({
    data(): Data {
        return {
            datas: [],
            data: null,
            deleteDialog: false,
            moduleName: 'Module List'
        }
    },
    components: {
    },
    created() {
        if (this.$route.name) {
            this.moduleName = this.$route.name.toString();
        }

        // fetch the data when the view is created and the data is
        // already being observed
        this.fetch();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetch'
    },
    methods: {
        async fetch() {
            this.datas = await api.getListModule();
        },
        btnEdit(moduleId: string) {
            this.$router.push('/modules/input/' + moduleId);
        },
        btnDelete(data: ModuleModel) {
            this.data = data;
            this.deleteDialog = true;
        },
        async btnDeleteConfirm() {
            try {
                if (this.data) {
                    await api.deleteModule(this.data.id);
                }

                await this.fetch();

                this.$toast.add({
                    severity: 'success',
                    summary: this.moduleName,
                    detail: 'Module Deleted',
                    life: ToastLife
                });
            } catch(e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to Delete Module. This Module Already Used.",
                    life: ToastLife
                });
            }

            this.deleteDialog = false;
        }
    },
})
</script>