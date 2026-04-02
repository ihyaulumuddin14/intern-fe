import { cookies } from "next/headers"
import axios from "axios"
import { apiConfig } from "@/config/env"

export async function serverApi() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value

  // prepare for auth required API call
  return axios.create({
    baseURL: apiConfig.BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}