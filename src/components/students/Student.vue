<script setup lang="ts">
import { ref } from 'vue'
import type { Inscription } from '@/models/Inscription'
import type { Note } from '@/models/Note'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'
import StudentYear from './StudentYear.vue'

const props = defineProps({
  id: String,
})

const api = useAPI()
const inscriptions = ref<Inscription[]>()
const notesList = ref<Note[]>()
const student = ref<Inscription>()

onMounted(async () => {
  const params = { matricule: props.id }
  const inscriptions_response = await api<Inscription[]>('inscriptions', { params })
  inscriptions.value = inscriptions_response.data
  student.value = inscriptions.value[0]
  const notes_response = await api<Note[]>('notes', { params })
  notesList.value = notes_response.data
})
</script>

<template>
  <template v-if="inscriptions && student">
    <v-card> {{ student.prenom }} {{ student.nom }} </v-card>
    <v-row>
      <v-col
        v-for="(inscription, index) in inscriptions"
        :key="inscription.matricule"
        cols="12"
        sm="6"
        md="4"
      >
        <StudentYear
          v-if="props.id && notesList"
          :year="inscription.annee_etude"
          :notes-list="notesList"
          :mnemonique-list="JSON.parse(inscription.cours_json)"
        ></StudentYear>
      </v-col>
    </v-row>
  </template>
  <div v-else>Loading...</div>
</template>
