import AuthCard from "@/components/shared/AuthCard"
import ResetPasswordForm from "./Containers/ResetPasswordForm"

const ResetPasswordPage = () => {
  return (
    <AuthCard
      title="Reset password"
      description="Lorem ipsum dolor sit amet"
      footerText=""
      footerLink="Syarat dan ketentuan • Kebijakan Privasi"
      footerLinkTarget={`#`}
    >
      <ResetPasswordForm />
    </AuthCard>
  )
}

export default ResetPasswordPage