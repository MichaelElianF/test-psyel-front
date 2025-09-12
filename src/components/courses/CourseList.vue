<script setup lang="ts">
import { computed } from 'vue'
import type { Cours } from '@/models/Cours'
import useAPI from '@/composables/useAPI'

const api = useAPI()
const response = await api.get<Array<Cours>>('/cours')

const coursesList = computed(() => {
  return response.data
})
</script>

<template>
  <v-card
    v-for="course in coursesList"
    :key="course.mnemonique"
    @click="$router.push({ name: 'course', params: { id: course.mnemonique } })"
  >
    {{ course.intitule }}</v-card
  >
</template>
