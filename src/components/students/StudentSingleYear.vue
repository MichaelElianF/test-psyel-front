<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue'
import useAPI from '@/composables/useAPI'
import type { Note } from '@/models/Note'
import type { Cours } from '@/models/Cours'

const props = defineProps<{
  mnemoniqueList: string[]
  year: number
  notesList: Note[]
}>()

const api = useAPI()
const { mnemoniqueList, notesList } = toRefs(props)
const courses = ref<Cours[]>()

function getCourse(mnemonique: string): Cours | undefined {
  return courses?.value?.find((cours) => cours.mnemonique == mnemonique)
}

type CoursNote = Cours & Pick<Note, 'note'>

const subscribed_courses = computed(() => {
  let subscribed_courses: CoursNote[] = []
  mnemoniqueList.value.forEach((mnemonique) => {
    const course = getCourse(mnemonique)
    if (course) {
      const note =
        notesList.value.find((result) => result.mnemonique == course.mnemonique)?.note || 0
      subscribed_courses.push({ ...course, note })
    }
  })
  return subscribed_courses
})

const etcs_total = computed<number>(() =>
  subscribed_courses.value.reduce((total, obj) => obj.credit + total, 0),
)

const notes_total = computed<number>(() =>
  subscribed_courses.value.reduce((total, cours) => cours.note + total, 0),
)

const etcs_total_validated = computed<number>(() => {
  return subscribed_courses.value.reduce((total, cours) => {
    const credit = cours.note >= 10 ? cours.credit : 0
    return credit + total
  }, 0)
})

const moyenne = computed(() => (notes_total.value * etcs_total.value) / etcs_total_validated.value)

const successfull = computed(() => etcs_total_validated.value >= 60 || moyenne.value >= 10)

onMounted(async () => {
  const courses_response = await api<Cours[]>('cours')
  courses.value = courses_response.data
})
</script>

<template>
  <v-card flat border="sm" v-if="notesList && courses" width="100%">
    <v-card-title class="d-flex align-center bg-grey-lighten-5 text-primary ga-2">
      Année: {{ year
      }}<v-chip
        class="text-body-2 font-weight-medium"
        color="success"
        size="small"
        v-if="successfull"
        >réussie</v-chip
      >
      <div class="d-flex ml-auto ga-1 text-grey-darken-1">
        ECTS: <span class="text-primary">{{ etcs_total_validated }}</span
        >/<span>{{ etcs_total }}</span>
      </div>
    </v-card-title>
    <v-card-item>
      <v-table>
        <thead>
          <tr>
            <th class="text-left w-50">Intitulé</th>
            <th class="text-left w-25">Titulaire</th>
            <th class="text-left">Note</th>
            <th class="text-left">Crédit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in subscribed_courses" :key="index">
            <td>
              <v-btn
                variant="text"
                class="text-lowercase pa-0"
                density="compact"
                color="primary"
                @click="$router.push({ name: 'courseSingle', params: { id: course.mnemonique } })"
                >{{ course.intitule }}</v-btn
              >
            </td>
            <td>{{ course.titulaire }}</td>
            <td>{{ course.note }}</td>
            <td>{{ course.note >= 10 ? course.credit : 0 }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>
