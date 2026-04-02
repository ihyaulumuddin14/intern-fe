import { apiConfig } from "@/config/env"
import { cookies } from "next/headers"

export async function POST() {
  const res = await fetch(
    `${apiConfig.BASE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    }
  )

  const data = await res.json()
  const response = Response.json(data)

  const setCookie = res.headers.getSetCookie?.() ?? []
  setCookie.forEach(cookie => response.headers.append("set-cookie", cookie))

  if (data?.data?.access_token) {
    response.headers.append(
      "set-cookie",
      `access_token=${data.data.access_token}; Path=/; HttpOnly; SameSite=Lax`
    )
  }

  return response
}