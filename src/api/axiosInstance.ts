import { refreshAccessToken } from "@/helper/authRefresh"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authApi = axios.create({
  // baseURL: API_URL
})

export const privateApi = axios.create({
  // baseURL: API_URL,
  withCredentials: true
})

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await refreshAccessToken()
        return privateApi(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export default privateApi