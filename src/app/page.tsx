import LandingPage from "@/features/LandingPage/LandingPage"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const getUser = async () => {
  /**
   * Fail Fast
   * Refresh token or intercepting only occurs
   * when the user is already logged into the app
   * 
   * Because interceptor must get a stable lifecycle (client)
  */
 
  // const cookieStore = cookies()
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
  //   headers: {
  //     Cookie: cookieStore.toString()
  //   },
  //   cache: "no-store",
  // })


  // mocking user data
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth_me`)
  const result = await response.json()
  // return response.ok ? result.user : null
  return null
}

export default async function EntryPage() {
  const user = await getUser()

  return <LandingPage user={user}/>
}
