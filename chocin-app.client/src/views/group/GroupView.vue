<template>
    <div className="card">
        <Toolbar class="mb-6">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" as="router-link"
                    to="/groups/input/" />
            </template>

        </Toolbar>

        <DataTable :value="datas" tableStyle="min-width: 50rem">
            <Column field="groupName" header="Name"></Column>
            <Column :exportable="false" style="width: 20%">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                        @click="btnEdit(slotProps.data.groupId)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="btnDelete(slotProps.data)" />
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
<script lang="ts">
import { GroupService, type GroupModel } from '@/services/WebApi';
import { defineComponent } from 'vue';

const api: GroupService = new GroupService();

interface Data {
    datas: GroupModel[],
    data: GroupModel | null,
    deleteDialog: boolean
}
export default defineComponent({
    data(): Data {
        return {
            datas: [],
            data: null,
            deleteDialog: false
        }
    },
    components: {
    },
    created() {
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
            if (this.data) {
                await api.deleteGroup(this.data.groupId);
            }

            await this.fetch();

            this.deleteDialog = false;
            this.$toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Products Deleted',
                life: 3000
            });
        }
    },
})
</script>