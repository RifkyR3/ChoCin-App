import { defineStore } from 'pinia';
import { ModuleService } from '@/services/WebApi';

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
                const uiModule: MenuItem[] = [];

                resModule.forEach(res => {
                    const module: MenuItem = {
                        label: res.name,
                        icon: res.icon,
                        to: res.path
                    };

                    if(res.children) {
                        const uiSubModule:MenuItem[] = [];

                        res.children.forEach(resChild => {
                            uiSubModule.push({
                                label: resChild.name,
                                icon: resChild.icon,
                                to: resChild.path
                            });
                        });

                        module.items = uiSubModule;
                    }
                    
                    uiModule.push(module);
                });

                this.menuItems = uiModule;
            }
        }
    }
});