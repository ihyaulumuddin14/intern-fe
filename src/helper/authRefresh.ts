'use client'

import axios from "axios"

const refreshApi = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

let refreshPromise: Promise<{ success: boolean }> | null = null

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshApi.post('/auth/refresh')
      .then(response => {
        console.log(response.data)
        return response.data
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