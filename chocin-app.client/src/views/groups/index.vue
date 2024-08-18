<template>
    <div class="card">
        <Toolbar class="mb-6">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" as="router-link"
                    to="/groups/input/" />
            </template>

        </Toolbar>

        <DataTable :value="datas" stripedRows tableStyle="min-width: 50rem">
            <Column field="groupName" header="Name"></Column>
            <Column header="Module">
                <template #body="slotProps">
                    {{ slotProps.data.groupModuleIds?.length }}
                </template>
            </Column>
            <Column :exportable="false" style="width: 20%">
                <template #body="slotProps">
                    <Button v-tooltip="'Edit'" icon="pi pi-pencil" outlined rounded class="mr-2"
                        @click="btnEdit(slotProps.data.groupId)" />
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
    "name": "Group List"
}</route>
<script lang="ts">
import { ToastLife } from '@/commons/Const';
import { GroupService, type GroupModel } from '@/services/WebApi';
import { defineComponent } from 'vue';

const api: GroupService = new GroupService();

interface Data {
    datas: GroupModel[],
    data: GroupModel | null,
    deleteDialog: boolean,
    moduleName: string
}
export default defineComponent({
    data(): Data {
        return {
            datas: [],
            data: null,
            deleteDialog: false,
            moduleName: 'Group List'
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
            this.datas = await api.getListGroup();
        },
        btnEdit(groupId: string) {
            this.$router.push('/groups/input/' + groupId);
        },
        btnDelete(data: GroupModel) {
            this.data = data;
            this.deleteDialog = true;
        },
        async btnDeleteConfirm() {
            try {
                if (this.data) {
                    await api.deleteGroup(this.data.groupId);
                }

                await this.fetch();

                this.$toast.add({
                    severity: 'success',
                    summary: this.moduleName,
                    detail: 'Group Deleted',
                    life: ToastLife
                });
            } catch(e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to Delete Group. This Group Already Used.",
                    life: ToastLife
                });
            }

            this.deleteDialog = false;
            
        }
    },
})
</script>