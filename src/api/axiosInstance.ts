import { apiConfig } from "@/config/env"
import { refreshAccessToken } from "@/helper/authRefresh"
import axios from "axios"

export const authApi = axios.create({
  // comment for using Nextjs route handler, without api url domain
  baseURL: apiConfig.BASE_URL,
  withCredentials: true
})

export const privateApi = axios.create({
  // comment for using Nextjs route handler, without api url domain
  baseURL: apiConfig.BASE_URL,
  withCredentials: true
})

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`

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