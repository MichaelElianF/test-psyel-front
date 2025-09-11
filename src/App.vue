<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheTopbar from './components/TheTopbar.vue'
import TheSidemenu from './components/TheSidemenu.vue'
</script>

<template>
  <v-responsive>
    <VApp>
      <TheTopbar></TheTopbar>
      <TheSidemenu></TheSidemenu>
      <VMain>
        <v-container style="max-width: 1200px">
          <RouterView />
        </v-container>
      </VMain>
    </VApp>
  </v-responsive>
</template>

<style scoped></style>
