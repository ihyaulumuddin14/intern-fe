import AuthCard from "@/features/auth/components/AuthCard";
import ResetPasswordForm from "../../../features/auth/reset-password/ResetPasswordForm";

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
  );
};

export default ResetPasswordPage;
