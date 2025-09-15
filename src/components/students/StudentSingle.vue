<script setup lang="ts">
import { ref } from 'vue'
import type { Inscription } from '@/models/Inscription'
import type { Note } from '@/models/Note'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'
import StudentSingleYear from './StudentSingleYear.vue'
import BackBtn from '@/components/BackBtn.vue'
import sumDigit from '@/helpers/sum-digits'

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
    <v-row no-gutters>
      <back-btn></back-btn>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          width="100%"
          color="primary"
          variant="tonal"
          min-height="240px"
          :class="[
            'd-flex',
            'flex-column',
            'align-center',
            'justify-space-evenly',
            'pa-5',
            'user-profile',
          ]"
        >
          <v-avatar size="120">
            <v-img
              :src="`https://mockmind-api.uifaces.co/content/human/2${sumDigit(student.matricule)}.jpg`"
            ></v-img>
          </v-avatar>
          <div class="text-center">
            <h3 class="text-h5 font-weight-medium">{{ student.prenom }} {{ student.nom }}</h3>
            <h4 class="font-weight-regular">{{ student.matricule }}</h4>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col
            v-for="(inscription, index) in inscriptions"
            :key="inscription.matricule"
            cols="12"
          >
            <StudentSingleYear
              v-if="props.id && notesList"
              :year="inscription.annee_etude"
              :notes-list="notesList"
              :mnemonique-list="JSON.parse(inscription.cours_json)"
            ></StudentSingleYear>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'vuetify/settings';

$breakpoint: map.get(settings.$display-breakpoints, 'md-and-up');
.user-profile {
  position: sticky;
  top: calc((settings.$spacer * 4 + var(--v-layout-top)));
}
</style>
