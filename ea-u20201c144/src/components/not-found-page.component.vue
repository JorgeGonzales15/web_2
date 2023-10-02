<template>
  <div class="not-found">
    <pv-card>
        <template #title>404 - Not found page :(</template>
        <template #content>
                <p>The page you are looking for does not exist.</p>
        </template>
        <template #footer>
            <router-link to="/home">
                <pv-button color="primary">Go to Home</pv-button>
            </router-link>
        </template>
    </pv-card>
  </div>
</template>

<script>
import { RouterLink} from 'vue-router';
export default{
    name: 'NotFoundPageComponent'
}
</script>
<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5vw;
}
.not-found pv-card {
  width: auto;
  max-width: 100%;
  margin: 0 auto;
}
</style>