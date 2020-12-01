import axios from 'axios'
import {serverHost, serverPort} from 'src/configs/server'

const http = axios.create({
  baseURL: `http://${serverHost}:${serverPort}`,
  // withCredentials: true,
})

export default http
