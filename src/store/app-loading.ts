import { defineStore } from 'pinia'
import { debounce, throttle } from 'lodash'
import { ref } from 'vue'

export const useAppLoading = defineStore('appLoading', () => {
  const appLoading = ref(true)

  // actions

  const showAppLoading = debounce(() => {
    appLoading.value = true
  }, 250)

  const hideAppLoading = debounce(() => {
    showAppLoading.cancel()
    showAppLoading.flush()
    appLoading.value = false
  }, 100)

  return {
    appLoading,
    showAppLoading,
    hideAppLoading,
  }
})
