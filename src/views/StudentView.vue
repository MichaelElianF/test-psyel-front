<script setup lang="ts">
import StudentList from '../components/students/StudentList.vue'
</script>

<template>
  <Suspense>
    <StudentList></StudentList>
  </Suspense>
</template>
