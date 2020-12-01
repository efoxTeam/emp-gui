import axios from 'axios'
import {serverHost, serverPort} from 'src/configs/server'

const isDev = process.env.NODE_ENV == 'development'

const http = axios.create({
  baseURL: isDev ? `http://${serverHost}:${serverPort}` : location.origin,
  // withCredentials: true,
})

export default http
