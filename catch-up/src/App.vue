<template>
  <div class="w-full">
      <div>
          <pv-menubar class="sticky bg-primary">
              <template #start>
                  <pv-button label="CatchUp" icon="pi pi-bars"
                             @click="toggleSidebar"></pv-button>
                  <side-menu v-model:visible="sidebarVisible"
                             v-on:source-selected="setSource"></side-menu>
              </template>
              <template #end>
                <language-switcher></language-switcher>
              </template>
          </pv-menubar>
      </div>
      <div>

          <main-content v-if="errors" :articles="articles"></main-content>
          <unavailable-content v-else :errors="errors"></unavailable-content>
      </div>
      <footer-content></footer-content>
  </div>
</template>

<script>
import {NewsApiService} from "./news/services/news-api.service.js";
import SideMenu from "./news/components/side-menu.component.vue";
import MainContent from "./news/components/main-content.component.vue";
import UnavailableContent from "./news/components/unavailable-content.component.vue";
import FooterContent from "./news/components/footer-content.component.vue";
import LanguageSwitcher from "./news/components/language-switcher.component.vue";

export default {
    name: 'App',
    components: {LanguageSwitcher, FooterContent, UnavailableContent, MainContent, SideMenu},
    data() {
        return {
            sidebarVisible: false,
            articles: [],
            errors: [],
            newsApi: new NewsApiService()
        }
    },
    created() {
        this.getArticlesForSource('bbc-news');
    },
    methods: {
        // Fetch articles for selected Source
        getArticlesForSource(sourceId) {
            this.newsApi.getArticlesForSource(sourceId)
                .then(response => {
                    this.articles = response.data.articles;
                    console.log(response.data.articles);
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
        // Fetch articles for selected Source with Logo URL
        getArticlesForSourceWithUrl(source) {
            this.newsApi.getArticlesForSource(source.id)
                .then(response => {
                    this.articles = response.data.articles;
                    this.articles.map(article => article.source.urlToLogo = source.urlToLogo);
                    console.log(response.data.articles);
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
        // On Source selected

        setSource(source) {
            this.getArticlesForSourceWithUrl(source);
            this.toggleSidebar();
        },
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
        }
    }
}
</script>

<style scoped>

</style>
