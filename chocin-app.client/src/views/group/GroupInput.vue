<template>
    <div className="card">
        <form @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2 mb-3">
                <label for="name1">Name</label>
                <InputText id="name1" type="text" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="module">Modules</label>
                <TreeSelect v-model:modelValue="checkbox" :options="moduleTree" selectionMode="checkbox" placeholder="Select Item" class="md:w-80 w-full" />
            </div>

            <Button type="submit" label="Submit" :fluid="false" icon="pi pi-check"></Button>
            &nbsp;
            <Button label="Cancel" :fluid="false" severity="danger" icon="pi pi-times"></Button>
        </form>
    </div>
</template>
<script lang="ts">
import type { GroupInput, GroupModel, ModuleModel } from '@/services/WebApi';
import { GroupService, ModuleService } from '@/services/WebApi';
import { useUiStore } from '@/stores';
import type { TreeSelectionKeys } from 'primevue/tree';
import type { TreeNode } from 'primevue/treenode';
import { defineComponent } from 'vue';

const groupApi: GroupService = new GroupService();
const moduleApi: ModuleService = new ModuleService();

interface Data {
    data: GroupModel | null,
    dataId: string | null,
    dataInput: GroupInput,
    moduleTree: TreeNode[],
    inputResult: boolean,
    progress: boolean,
    moduleName: string,
    checkbox:TreeSelectionKeys
}

export default defineComponent({
    data(): Data {
        return {
            data: null,
            dataId: null,
            dataInput: {
                groupName: '',
                moduleIds: []
            },
            moduleTree: [],
            inputResult: false,
            progress: false,
            moduleName: '',
            checkbox:{}
        }
    },
    components: {
    },
    async mounted() {
        if (this.$route.name) {
            this.moduleName = this.$route.name.toString();
        }

        await this.getModuleTree();

        const groupId = this.$route.params.groupId;
        if (groupId) {
            this.dataId = groupId.toString();
            await this.getGroupById(this.dataId);
        }
    },
    methods: {
        async onSubmit() {
            const useUi = useUiStore();

            useUi.setProgress();

            // if (this.dataId) {
            //     await this.doUpdate(this.dataId)
            // } else {
            //     await this.doAdd();
            // }
            console.log(this.checkbox.values);


            // if (this.inputResult) {
            //     this.$router.push('/groups/');
            // }

            useUi.setProgress();
        },
        async doAdd() {
            try {
                await groupApi.addGroup(this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to add Group"
                });
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to add Group"
                });
                this.inputResult = false;
            }
        },
        async doUpdate(dataId: string) {
            try {
                await groupApi.updateGroup(dataId, this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to update Group"
                });
                this.inputResult = true;
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to update Group"
                });
                this.inputResult = false;
            }
        },
        async getGroupById(id: string) {
            const useUi = useUiStore();

            useUi.setProgress();

            try {
                this.data = await groupApi.getGroupById(id);

                this.dataInput = {
                    groupName: this.data.groupName,
                    moduleIds: this.data.groupModuleIds
                }

            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to get Group data"
                });
            }

            useUi.setProgress();
        },
        btnBack() {
            this.$router.push('/groups');
        },
        async getModuleTree() {
            const modules = await moduleApi.getModuleTree();


            modules.forEach(module => {
                let _child: TreeNode[] = [];

                if (module.children && module.children.length > 0) {

                    module.children.forEach(child => {
                        _child.push({
                            key: child.id,
                            label: child.name,
                            icon: module.icon
                        });
                    });
                }

                this.moduleTree.push({
                    key: module.id,
                    label: module.name,
                    icon: module.icon,
                    children: _child
                });
            });
        }
    },
})
</script>