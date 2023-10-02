import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from "primevue/config";

// PrimeVue Material Design Theme
import "primevue/resources/themes/md-light-deeppurple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, { ripple: true });

app.component("pv-data-table", DataTable)
app.component("pv-input-text", InputText);
app.component("pv-column", Column);
app.component("pv-toolbar", Toolbar);
app.component("pv-button", Button);
app.component("pv-card", Card);

app.mount('#app')