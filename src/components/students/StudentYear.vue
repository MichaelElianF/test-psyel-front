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
  <template v-if="notesList && courses">
    <v-sheet> année: {{ year }} <v-chip size="sm" v-if="successfull">réussie</v-chip></v-sheet>
    <v-sheet>Etcs Total = {{ etcs_total }}</v-sheet>
    <v-sheet>Etcs Validées = {{ etcs_total_validated }}</v-sheet>
    <v-sheet v-for="(course, index) in subscribed_courses" :key="index">
      {{ course?.intitule }} {{ course.credit }} |
      {{ course.note }}
    </v-sheet>
  </template>
</template>
