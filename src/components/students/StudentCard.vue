<script setup lang="ts">
import type { Inscription } from '@/models/Inscription'

const props = defineProps<{
  student: Inscription
  avatarSize: number
}>()
</script>

<template>
  <v-card
    variant="tonal"
    color="primary"
    rounded="lg"
    class="d-flex align-center pa-4 ga-2"
    @click="$router.push({ name: 'studentSingle', params: { id: student.matricule } })"
  >
    <v-avatar :size="avatarSize">
      <v-img :src="`https://api.samplefaces.com/face?width=150&n=${index}`"></v-img>
    </v-avatar>
    <h2 class="text-body-1 d-inline-flex text-grey-darken-3">
      {{ student.prenom }} {{ student.nom }}
    </h2>
  </v-card>
</template>
