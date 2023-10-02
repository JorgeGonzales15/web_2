<template>
    <pv-sidebar v-bind:visible="visible" v-on:update:visible="val => visible = val">
        <div v-for="source in sources" class="m-4">
            <div @click="onSourceSelected(source)"
                 class="flex align-content-start flex-wrap">
        <span class="flex align-items-center justify-content-center mr-2">
            <pv-avatar :image="source.urlToLogo"
                       :aria-label="source.name" shape="circle"/>
        </span>
                <span class="flex align-items-center justify-content-center">
            {{ source.name }}
              </span>
            </div>
        </div>
    </pv-sidebar>
</template>

<script>
import {NewsApiService} from "../services/news-api.service.js";

export default {
    name: "side-menu",
    props: {
        visible: Boolean
    },
    data() {
        return {
            sources: [],
            errors: [],
            newsApi: new NewsApiService()

        }
    },
    created() {
        this.newsApi.getSources()
            .then(response => {
                this.sources = response.data.sources;
                this.sources.map(source => source.urlToLogo = this.newsApi.getUrlToLogo(source));
                console.log('data: ');
                console.log(response.data.sources);
            })
            .catch(e => this.errors.push(e));
    },
    methods: {
        onSourceSelected(source) {
            this.$emit('source-selected', source)
        },

        isVisible() {
            return this.visible;
        }
    }
}
</script>

<style scoped>

</style>