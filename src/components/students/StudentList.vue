<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Inscription } from '@/models/Inscription'
import useAPI from '@/composables/useAPI'
import StudentCard from './StudentCard.vue'
import { onMounted } from 'vue'

const api = useAPI()

const inscriptions = ref<Inscription[]>()

const studentsList = computed(() => {
  // Reduce method to get unique objects
  let output = inscriptions?.value?.reduce((acc: Inscription[], obj) => {
    if (!acc.some((o) => o.matricule == obj.matricule)) {
      acc.push(obj)
    }
    return acc
  }, [])
  return output
})

onMounted(async () => {
  const response = await api.get<Array<Inscription>>('/inscriptions')
  inscriptions.value = response.data
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
