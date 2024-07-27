import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routers'

import App from './App.vue'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Font
import { mdi } from 'vuetify/iconsets/mdi'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Component
import DefaultLayout from '@layouts/DefaultLayout.vue';
import EmptyLayout from '@layouts/EmptyLayout.vue';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
            mdi,
        },
    },
});

app.use(vuetify);

app.component('empty-layout', EmptyLayout);
app.component('default-layout', DefaultLayout);

app.mount('#app');
