import AuthCard from "@/components/shared/AuthCard"
import ForgotPasswordForm from "./Containers/ForgotPasswordForm"

const ForgotPasswordPage = () => {
  return (
    <AuthCard
      title="Lupa password"
      description="Lorem ipsum dolor sit amet"
      footerText=""
      footerLink="Syarat dan ketentuan • Kebijakan Privasi"
      footerLinkTarget={`#`}
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}

export default ForgotPasswordPage