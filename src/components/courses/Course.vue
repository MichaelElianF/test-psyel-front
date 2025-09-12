<script setup lang="ts">
import { ref } from 'vue'
import type { Cours } from '@/models/Cours'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'

const props = defineProps({
  id: String,
})

const api = useAPI()
const course = ref<Cours>()

async function fetchData() {
  return await api.get<Cours[]>('/cours', {
    params: { mnemonique: props.id },
  })
}
onMounted(async () => {
  const response = await fetchData()
  course.value = response.data[0]
})
</script>

<template>
  <v-card v-if="course">
    {{ course.intitule }}
  </v-card>
  <div v-else>Loading...</div>
</template>
