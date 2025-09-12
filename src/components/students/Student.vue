<script setup lang="ts">
import { ref } from 'vue'
import type { Inscription } from '@/models/Inscription'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'

const props = defineProps({
  id: String,
})

const api = useAPI()
const student = ref<Inscription>()

async function fetchData() {
  return await api.get<Inscription[]>('/inscriptions', {
    params: { matricule: props.id },
  })
}
onMounted(async () => {
  const response = await fetchData()
  student.value = response.data[0]
})
</script>

<template>
  <v-card v-if="student">
    {{ student.matricule }}
  </v-card>
  <div v-else>Loading...</div>
</template>
