import axios from 'axios'
import { useAppLoading } from '@/store/app-loading'
import { debounce } from 'lodash'

const api_url = import.meta.env.VITE_APP_API_URL

const axiosInstance = axios.create({
  baseURL: api_url,
})

export default () => {
  // loading state
  const { showAppLoading, hideAppLoading } = useAppLoading()

  // Request interceptor
  axiosInstance.interceptors.request.use((config) => {
    // Modify the request config here
    console.log('loading start')
    showAppLoading()
    return config
  })

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle the response here
      console.log('loading success')
      hideAppLoading()
      return response
    },
    (error) => {
      // Handle errors here
      console.error(error)
      console.log('loading error')
      hideAppLoading()
      return Promise.reject(error)
    },
  )

  return axiosInstance
}
