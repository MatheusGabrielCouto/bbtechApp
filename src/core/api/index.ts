import axios from 'axios'

const api = axios.create({
  baseURL: 'https://biblioteca.villasis.com.br/api/v1',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;'
  }
})

export default api
