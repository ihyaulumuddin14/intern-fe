import OnboardingSync from '../components/OnboardingSync'

const UserDashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OnboardingSync />
      { children }
    </>
  )
}

export default UserDashboardContainer