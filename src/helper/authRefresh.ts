import privateApi from "@/api/axiosInstance"
import { toCamel } from "@/lib/case"
import axios, { AxiosError } from "axios"
import { handleLogout } from "./handleLogout"

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios.post(`${process.env.NEXT_PUBLIC_FE_URL}/auth/refresh`, {}, {
      withCredentials: true
    })
      .then(response => {
        if (!response.data.success) throw new Error(response.data?.message || "Gagal melakukan refresh")

        const camelData = toCamel(response)
        const newAccessToken = camelData.data?.data?.accessToken
        /**
         * Update global axios instance with new access token
         */
        privateApi.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
        return newAccessToken
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          /**
           * Automatic logout when refresh token has expired with 401 custom status code
           */
          if (error.response?.status === 401) {
            handleLogout()
            throw error
          }
        }
        throw error
      })
      .finally(() => {

        /**
         * Just like the first request can set null to the refreshPromise
         */

        refreshPromise = null
      })
  }

  /**
   * for the second and subsequent request,
   * it will wait for the first refresh to complete
   * and then return the same result of that first refresh
   */

  return refreshPromise
}