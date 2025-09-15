<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheTopbar from './components/TheTopbar.vue'
import TheSidemenu from './components/TheSidemenu.vue'
import AppLoading from './components/AppLoading.vue'
import { useAppLoading } from '@/store/app-loading'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const drawer = ref(true)
const loadingStore = useAppLoading()
const { appLoading } = storeToRefs(loadingStore)
</script>

<template>
  <v-responsive>
    <v-app>
      <TheTopbar
        @drawer="
          () => {
            drawer = !drawer
          }
        "
      ></TheTopbar>
      <TheSidemenu v-model="drawer"></TheSidemenu>
      <v-main>
        <!-- main view -->
        <v-container style="max-width: 1200px" class="position-relative mt-6 h-100">
          <AppLoading v-if="appLoading" />
          <RouterView v-hide="appLoading" />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
