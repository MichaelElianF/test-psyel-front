import axios from 'axios'
const api_url = import.meta.env.VITE_APP_API_URL

export default (url = api_url) => {
  return axios.create({
    baseURL: url,
  })
}
