<template>
    <div class="card">
        <form @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2 mb-3">
                <label for="name1">Name</label>
                <InputText v-model="dataInput.groupName" id="name1" type="text" required :disabled="progress" />
            </div>

            <div class="flex flex-col gap-2 mb-3">
                <label for="module">Modules</label>
                <TreeSelect id="module" v-model:modelValue="checkbox" :options="moduleTree" selectionMode="checkbox"
                    placeholder="Select Item" class="w-full" display="chip" :disabled="progress"/>
            </div>

            <Button type="submit" label="Submit" :fluid="false" icon="pi pi-check"></Button>
            &nbsp;
            <Button label="Cancel" :fluid="false" severity="danger" icon="pi pi-times" v-on:click="btnBack"></Button>
        </form>
    </div>
</template>
<script lang="ts">
import { ToastLife } from '@/commons/Const';
import type { GroupInput, GroupModel } from '@/services/WebApi';
import { GroupService, ModuleService } from '@/services/WebApi';
import type { TreeExpandedKeys } from 'primevue/tree';
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
    checkbox: TreeExpandedKeys
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
            checkbox: {}
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
            const checked = Object.keys(this.checkbox);
            this.dataInput.moduleIds = checked;

            if (this.dataId) {
                await this.doUpdate(this.dataId)
            } else {
                await this.doAdd();
            }

            if (this.inputResult) {
                this.$router.push('/groups/');
            }
        },
        async doAdd() {
            try {
                await groupApi.addGroup(this.dataInput);

                this.$toast.add({
                    severity: "success",
                    summary: this.moduleName,
                    detail: "Successfully to add Group",
                    life: ToastLife
                });
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to add Group",
                    life: ToastLife
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
                    detail: "Successfully to update Group",
                    life: ToastLife
                });
                this.inputResult = true;
                this.inputResult = true;
            } catch (e) {
                this.$toast.add({
                    severity: "warn",
                    summary: this.moduleName,
                    detail: "Failed to update Group",
                    life: ToastLife
                });
                this.inputResult = false;
            }
        },
        async getGroupById(id: string) {
            try {
                this.data = await groupApi.getGroupById(id);

                this.dataInput = {
                    groupName: this.data.groupName,
                    moduleIds: this.data.groupModuleIds
                }

                if (this.data.groupModuleIds && this.data.groupModuleIds.length > 0) {
                    this.moduleTree.forEach(mod => {
                        let partialChecked = false;
                        let partialCheckedNum = 0;
                        let childNum = 0;
                        const check = this.data?.groupModuleIds?.includes(mod.key);

                        if (mod.children && mod.children.length > 0) {
                            childNum = mod.children.length;

                            mod.children?.forEach(child => {
                                const childCheck = this.data?.groupModuleIds?.includes(child.key);

                                if (childCheck) {
                                    partialChecked = true;
                                    partialCheckedNum++;

                                    this.checkbox[child.key] = {
                                        checked: childCheck,
                                        partialChecked: false
                                    }
                                }
                            });
                        }

                        if (check || partialChecked) {
                            const checkedVal = childNum > 0 ? partialChecked : check;
                            const partialVal = childNum > 0 ? !(partialCheckedNum == childNum) && partialChecked : false;
                            this.checkbox[mod.key] = {
                                checked: checkedVal ,
                                partialChecked: partialVal
                            }
                        }
                    });
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