import axios, {AxiosRequestConfig} from 'axios'
import qs from 'qs'
import {serverHost, serverPort} from 'src/configs/server'

const isDev = process.env.NODE_ENV == 'development'

const http = axios.create({
  baseURL: isDev ? `http://${serverHost}:${serverPort}` : location.origin,
  // withCredentials: true,
})

http.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
})

http.interceptors.response.use((response: any) => {
  // if (response?.status?.code !== 0) {
  //   console.log('===response===', response)
  //   throw response
  // }
  return response.data
})

export default http
