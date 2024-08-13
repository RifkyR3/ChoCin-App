import { defineStore } from "pinia";
import { ModuleService, type ModuleModel } from "@/services/WebApi";
import type { MenuItem } from "primevue/menuitem";

export const useUiStore = defineStore("ui", {
  state: () => {
    return {
      menuItems: [] as MenuItem[],
      isDarkMode: false,
      onProgress: false,
    };
  },
  persist: {
    storage: sessionStorage,
  },
  actions: {
    async setMenuModule(groupId: string) {
      const moduleApi: ModuleService = new ModuleService();

      const resModule = await moduleApi.getModuleByGroup(groupId);

      if (resModule) {
        this.menuItems = this.parseModule(resModule);
      }
    },
    parseModule(modules: ModuleModel[]) {
      const result: MenuItem[] = [];

      modules.forEach((module) => {
        const item: MenuItem = {
          label: module.name,
          icon: module.icon,
          to: module.path,
        };

        if (module.children && module.children.length > 0) {
          const child = this.parseModule(module.children);
          item.items = child;
        }

        result.push(item);
      });

      return result;
    },
    setProgress(value?: boolean) {
      if (value) {
        this.onProgress = value;
      }

      this.onProgress != this.onProgress;
    },
  },
});
