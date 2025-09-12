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
  <v-row>
    <v-col
      v-for="(student, index) in studentsList"
      :key="student.matricule"
      cols="12"
      sm="6"
      md="4"
    >
      <v-card
        variant="tonal"
        color="primary"
        rounded="lg"
        class="d-flex align-center pa-4 ga-2"
        @click="$router.push({ name: 'student', params: { id: student.matricule } })"
      >
        <v-avatar size="80">
          <v-img :src="`https://api.samplefaces.com/face?width=150&n=${index}`"></v-img>
        </v-avatar>
        <h2 class="text-body-1 d-inline-flex text-grey-darken-3">
          {{ student.prenom }} {{ student.nom }}
        </h2>
      </v-card>
    </v-col>
  </v-row>
</template>
