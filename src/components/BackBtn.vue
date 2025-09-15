<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <v-btn
    color="primary"
    size="default"
    variant="text"
    min-width="35px"
    class="pa-0 pl-md-1 pr-md-2 text-primary font-weight-bold"
    @click="
      (event: MouseEvent) => {
        router.go(-1)
      }
    "
  >
    <v-icon size="large" icon="mdi-arrow-left pa-0" />
    <span class="hidden-sm-and-down pl-1">retour</span>
  </v-btn>
</template>
