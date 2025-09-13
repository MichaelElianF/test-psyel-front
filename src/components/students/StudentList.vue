<script setup lang="ts">
import { computed } from 'vue'
import type { Inscription } from '@/models/Inscription'
import useAPI from '@/composables/useAPI'
import StudentCard from './StudentCard.vue'

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
      <StudentCard :student="student" :avatar-size="80"></StudentCard>
    </v-col>
  </v-row>
</template>
