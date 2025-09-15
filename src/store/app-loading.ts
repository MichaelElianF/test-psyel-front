import { defineStore } from 'pinia'
import { debounce } from 'lodash'
import { ref } from 'vue'

export const useAppLoading = defineStore('appLoading', () => {
  const appLoading = ref(true)

  // actions

  const showAppLoading = debounce(() => {
    appLoading.value = true
  }, 20)

  const hideAppLoading = debounce(() => {
    appLoading.value = false
  }, 200)

  return {
    appLoading,
    showAppLoading,
    hideAppLoading,
  }
})
