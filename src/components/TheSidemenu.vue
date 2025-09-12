<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
type MenuItem = {
  slug: string
  label: string
  name: string
}
const menuItems: Ref<MenuItem[]> = ref([
  {
    slug: '/',
    label: 'Etudiants',
    name: 'home',
  },
  {
    slug: '/courses',
    label: 'Cours',
    name: 'courses',
  },
  {
    slug: '/reports',
    label: 'Rapports',
    name: 'reports',
  },
])
</script>
<template>
  <v-navigation-drawer location="left" mobile-breakpoint="md">
    <v-list max-width="360">
      <v-list-item
        v-for="item in menuItems"
        color="primary"
        :active="$route.name == item.name"
        link
        :title="item.label"
        @click="$router.push(item.slug)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
