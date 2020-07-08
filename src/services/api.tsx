import axios from 'axios'

const Api = () => {
  const api = axios.create()
  api.defaults.headers.common['Content-Type'] = 'application/json'
  return api
}

export default Api
