'use client'

import axios from "axios"
import { apiConfig } from "@/config/env"
import privateApi from "@/api/axiosInstance"
import { toCamel } from "@/lib/case"

const refreshApi = axios.create({
  // comment for using Nextjs route handler, without api url domain
  baseURL: apiConfig.BASE_URL,
  withCredentials: true
})

let refreshPromise: Promise<{ success: boolean }> | null = null

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshApi.post('/auth/refresh')
      .then(response => {
        const camelData = toCamel(response)
        const newAccessToken = camelData.data.data.accessToken

        /**
         * Update global axios instance with new access token
         */
        privateApi.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
        return newAccessToken
      })
      .catch(error => {
        console.log(error)
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