import OnboardingClient from "./Containers/OnboardingClient"

async function getCareers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/careers`, {
    next: { tags: ["careers"] }
  })

  if (!response.ok) throw new Error("Gagal mengambil data karir")

  return response.json()
}

const OnboardingPage = async () => {
  const careers = await getCareers()

  return <OnboardingClient careers={careers}/>
}

export default OnboardingPage