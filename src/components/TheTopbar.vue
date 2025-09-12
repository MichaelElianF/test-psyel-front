<script setup lang="ts">
import desktopLogo from '@/assets/ulb-logo.jpg'
import mobileLogo from '@/assets/ulb-logo-mobile.jpg'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()
const drawer = ref(false)
const emit = defineEmits<{
  (e: 'drawer'): void
}>()
</script>

<template>
  <v-app-bar
    border="sm"
    flat
    elevation="0"
    height="100"
    class="d-flex flex-row justify-space-between border-t-0 border-e-0 border-s-0"
  >
    <v-app-bar-nav-icon
      v-if="!mdAndUp"
      variant="text"
      @click.stop="$emit('drawer')"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center ga-3" style="flex: 0 1 25%">
      <RouterLink to="/" class="d-flex h-100 ml-3 mr-1">
        <RouterLink to="/" class="d-flex ml-3 mr-1">
          <v-img
            contain
            :src="desktopLogo"
            min-width="340px"
            inline
            class="d-none d-sm-block"
            style="cursor: pointer"
          >
          </v-img>
          <v-img
            contain
            :src="mobileLogo"
            min-width="60px"
            inline
            class="d-sm-none"
            style="cursor: pointer"
          >
          </v-img>
        </RouterLink>
      </RouterLink>
    </div>
    <div class="d-flex justify-end mr-2" style="flex: 1 0 25%">
      <v-avatar color="info" size="x-large">
        <v-img alt="John" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
      </v-avatar>
    </div>
  </v-app-bar>
</template>
