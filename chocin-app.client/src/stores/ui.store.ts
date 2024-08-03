import { defineStore } from 'pinia';
import { ModuleService, type ModuleModel } from '@/services/WebApi';

interface MenuItem {
    label: string,
    icon?: string,
    to?: string,
    items?: MenuItem[]
}

const moduleApi: ModuleService = new ModuleService();

export const useUiStore = defineStore('ui', {
    state: () => {
        return {
            menuItems: [] as MenuItem[]
        }
    },
    persist: {
        storage: sessionStorage
    },
    actions: {
        async setMenuModule(groupId:string) {
            const resModule = await moduleApi.getModuleByGroup(groupId);

            if(resModule) {
                this.menuItems = this.parseModule(resModule);
            }
        },
        parseModule(modules:ModuleModel[]) {
            const result:MenuItem[] = [];

            modules.forEach(module => {
                const item : MenuItem = {
                    label: module.name,
                    icon: module.icon,
                    to: module.path
                };

                if (module.children && module.children.length > 0) {
                    const child = this.parseModule(module.children);
                    item.items = child;
                }

                result.push(item);
            });

            return result;
        }
    }
});