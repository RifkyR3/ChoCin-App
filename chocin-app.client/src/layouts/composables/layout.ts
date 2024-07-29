import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: true,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'aura-light-green',
    scale: 14,
    primary: 'emerald',
    surface: null,
    preset: 'Aura',
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const setScale = (scale:number) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item:any) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    const toggleDarkMode = () => {
        layoutConfig.darkTheme = !layoutConfig.darkTheme;
        document.documentElement.classList.toggle('app-dark');
    };

    const setPrimary = (value:string) => {
        layoutConfig.primary = value;
    };

    const setSurface = (value:any) => {
        layoutConfig.surface = value;
    };

    const setPreset = (value:string) => {
        layoutConfig.preset = value;
    };

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem, toggleDarkMode, setPrimary, setSurface, setPreset };
}
