import store from '@renderer/app/store'
import axios from 'axios'

// Configure axios Instance
const axiosInstance = axios.create({
  // baseURL: 'https://critch-api.onrender.com',
  //baseURL: 'http://localhost:8080',
  baseURL: 'https://critch-api.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add interceptor (aka Middleware) to the instance to always add the autorization header with any request
axiosInstance.interceptors.request.use(
  async (config) => {
    const usetToken = await store.getState().login.userToken
    if (usetToken) {
      config.headers.Authorization = 'Bearer ' + usetToken
    } else {
      config.headers.Authorization = 'Bearer ' + 'none'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
