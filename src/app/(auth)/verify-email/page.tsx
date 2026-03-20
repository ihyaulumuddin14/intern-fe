import AuthCard from "@/components/shared/AuthCard"
import VerifyEmailClient from "./Containers/VerifyEmailClient"

const VerifyEmailPage = () => {
  return (
    <AuthCard
      title="Verifikasi Email"
      description="Lorem ipsum dolor sit amet"
      footerText=""
      footerLink=""
      footerLinkTarget=""
    >
      <VerifyEmailClient />
    </AuthCard>
  )
}

export default VerifyEmailPage