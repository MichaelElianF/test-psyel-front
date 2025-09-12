<script setup lang="ts">
import { computed } from 'vue'
import type { Inscription } from '@/models/Inscription'
import useAPI from '@/composables/useAPI'

const api = useAPI()
const response = await api.get<Array<Inscription>>('/inscriptions')

const studentsList = computed(() => {
  // Reduce method to get unique objects
  let output = response.data.reduce((acc: Inscription[], obj) => {
    if (!acc.some((o) => o.matricule == obj.matricule)) {
      acc.push(obj)
    }
    return acc
  }, [])
  return output
})
</script>

<template>
  <v-card
    v-for="student in studentsList"
    :key="student.matricule"
    @click="$router.push({ name: 'student', params: { id: student.matricule } })"
  >
    {{ student.nom }} {{ student.prenom }}
  </v-card>
</template>
