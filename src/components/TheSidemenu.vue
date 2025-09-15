<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
type MenuItem = {
  slug: string
  label: string
  name: string
  icon?: string
}
const menuItems: Ref<MenuItem[]> = ref([
  {
    slug: '/',
    label: 'Etudiants',
    name: 'home',
    icon: 'mdi-account-school-outline',
  },
  {
    slug: '/courses',
    label: 'Cours',
    name: 'courses',
    icon: 'mdi-google-classroom',
  },
  {
    slug: '/reports',
    label: 'Rapports',
    name: 'reports',
    icon: 'mdi-file-table-outline',
  },
])
</script>
<template>
  <v-navigation-drawer
    location="left"
    mobile-breakpoint="md"
    class="bg-grey-lighten-4"
    theme="dark"
  >
    <v-list max-width="360" class="mt-6">
      <router-link :to="item.slug" custom v-slot="{ isActive }" v-for="item in menuItems">
        <v-list-item
          color="primary"
          class="px-6"
          :active="isActive"
          link
          :title="item.label"
          @click="$router.push(item.slug)"
        >
          <template v-slot:prepend>
            <v-icon size="30">{{ item.icon }}</v-icon>
          </template>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>
