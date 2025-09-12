<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheTopbar from './components/TheTopbar.vue'
import TheSidemenu from './components/TheSidemenu.vue'
import { ref } from 'vue'
const drawer = ref(true)
</script>

<template>
  <v-responsive>
    <VApp>
      <TheTopbar
        @drawer="
          () => {
            drawer = !drawer
          }
        "
      ></TheTopbar>
      <TheSidemenu v-model="drawer"></TheSidemenu>
      <VMain>
        <v-container style="max-width: 1200px" class="mt-6">
          <RouterView />
        </v-container>
      </VMain>
    </VApp>
  </v-responsive>
</template>

<style scoped></style>
