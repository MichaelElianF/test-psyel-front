<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Cours } from '@/models/Cours'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'

const api = useAPI()
const coursesList = ref<Cours[]>()

onMounted(async () => {
  const response = await api.get<Array<Cours>>('/cours')
  coursesList.value = response.data
})
</script>

<template>
  <v-row>
    <v-col v-for="course in coursesList" :key="course.mnemonique" cols="12" sm="6" md="4">
      <v-card
        variant="tonal"
        color="primary"
        rounded="lg"
        class="d-flex align-center pa-6 ga-2"
        @click="$router.push({ name: 'courseSingle', params: { id: course.mnemonique } })"
      >
        <h2 class="text-body-1 font-weight-bold d-inline-flex">{{ course.intitule }}</h2>
      </v-card>
    </v-col>
  </v-row>
</template>
