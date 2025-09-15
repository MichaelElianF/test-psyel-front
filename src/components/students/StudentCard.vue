<script setup lang="ts">
import type { Inscription } from '@/models/Inscription'
import sumDigit from '@/helpers/sum-digits'

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
      <v-img
        :src="`https://mockmind-api.uifaces.co/content/human/2${sumDigit(student.matricule)}.jpg`"
      ></v-img>
    </v-avatar>
    <h2 class="text-body-1 d-inline-flex font-weight-bold">
      {{ student.prenom }} {{ student.nom }}
    </h2>
  </v-card>
</template>
