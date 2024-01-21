/* eslint-disable prettier/prettier */
import store from '@renderer/app/store'
import axios from 'axios'

// Configure axios Instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add interceptor (aka Middleware) to the instance to always add the autorization header with any request
axiosInstance.interceptors.request.use(
  async (config) => {
    const loggedInUserToken = await store.getState().login.loggedInUserToken
    if (loggedInUserToken) {
      config.headers.Authorization = 'Bearer ' + loggedInUserToken
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
