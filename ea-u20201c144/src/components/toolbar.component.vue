<template>
    <header>
      <pv-toolbar class="bg-primary">
        <template #start>
          <span><b>TechnoGym TechnoRun Analytics</b></span>
        </template>
        <template #end>
          <div class="flex-column">
            <router-link v-for="item in items" :to="item.to" custom v-slot="{ navigate, href }" :key="item.label">
              <pv-button class="p-button-text text-white" :href="href" @click="navigate">{{ item.label }}</pv-button>
            </router-link>
          </div>
        </template>
      </pv-toolbar>
    </header>
  </template>
  
  <script>
  import { RouterLink} from 'vue-router';
  export default {
    name: 'ToolbarComponent',
    data() {
      return {
        items: [
          { label: "Home", to: "/home" },
          { label: "Health Checks", to: "/analytics/health-checks" }
        ],
      };
    },
  }
  </script>
  
  <style scoped>
  </style>