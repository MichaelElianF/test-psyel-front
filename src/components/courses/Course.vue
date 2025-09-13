<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Cours } from '@/models/Cours'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'
import type { Inscription } from '@/models/Inscription'

const props = defineProps({
  id: String,
})

const api = useAPI()
const course = ref<Cours>()
const inscriptions = ref<Inscription[]>()

const inscriptionsByCourse = computed(() =>
  inscriptions?.value?.filter((el) => props.id && !!el.cours_json.match(props.id)),
)

const inscriptionsYear1 = computed(() =>
  inscriptionsByCourse?.value?.filter((el) => el.annee_etude == 1),
)

const inscriptionsYear2 = computed(() =>
  inscriptionsByCourse?.value?.filter((el) => el.annee_etude == 2),
)

const inscriptionsYear3 = computed(() =>
  inscriptionsByCourse?.value?.filter((el) => el.annee_etude == 3),
)

onMounted(async () => {
  const courses_response = await api.get<Cours[]>('/cours', {
    params: { mnemonique: props.id },
  })
  course.value = courses_response.data[0]
  const inscriptions_response = await api.get<Array<Inscription>>('/inscriptions')
  inscriptions.value = inscriptions_response.data
})
</script>

<template>
  <v-card v-if="course">
    {{ course.intitule }}

    <p v-for="student in inscriptionsYear1">
      {{ student }}
    </p>

    <p v-for="student in inscriptionsYear2">
      {{ student }}
    </p>

    <p v-for="student in inscriptionsYear3">
      {{ student }}
    </p>
  </v-card>
  <div v-else>Loading...</div>
</template>
