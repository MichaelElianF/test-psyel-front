<template>
  <div class="loading">
    <v-progress-circular :size="120" :width="6" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<style scoped>
.loading {
  position: absolute;
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
</style>
