<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Cours } from '@/models/Cours'
import useAPI from '@/composables/useAPI'
import { onMounted } from 'vue'
import type { Inscription } from '@/models/Inscription'
import StudentCard from '@/components/students/StudentCard.vue'

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
  <v-row v-if="course">
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
        <div class="text-center d-flex flex-column ga-4">
          <h3 class="text-h5 font-weight-medium">{{ course.intitule }}</h3>
          <h3 class="font-weight-regular">{{ course.titulaire }}</h3>
          <div class="text-center">
            <v-chip
              class="text-body-2 font-weight-medium"
              color="primary"
              prepend-icon="mdi-star"
              size="large"
              >crédits: {{ course.credit }}</v-chip
            >
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12" v-if="inscriptionsYear3?.length">
          <v-card flat border="sm" width="100%">
            <v-card-title class="d-flex align-center bg-grey-lighten-5 text-primary ga-2">
              Année 3
            </v-card-title>
            <v-card-item class="pa-6">
              <v-row>
                <v-col v-for="student in inscriptionsYear3" cols="12" sm="2" md="6">
                  <StudentCard v-if="student" :student="student" :avatar-size="60"></StudentCard>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="inscriptionsYear2?.length">
          <v-card flat border="sm" width="100%">
            <v-card-title class="d-flex align-center bg-grey-lighten-5 text-primary ga-2">
              Année 2
            </v-card-title>
            <v-card-item class="pa-6">
              <v-row>
                <v-col v-for="student in inscriptionsYear2" cols="12" sm="2" md="6">
                  <StudentCard v-if="student" :student="student" :avatar-size="60"></StudentCard>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="inscriptionsYear1?.length">
          <v-card flat border="sm" width="100%">
            <v-card-title class="d-flex align-center bg-grey-lighten-5 text-primary ga-2">
              Année 1
            </v-card-title>
            <v-card-item class="pa-6">
              <v-row>
                <v-col v-for="student in inscriptionsYear1" cols="12" sm="2" md="6">
                  <StudentCard v-if="student" :student="student" :avatar-size="60"></StudentCard>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <div v-else>Loading...</div>
</template>
