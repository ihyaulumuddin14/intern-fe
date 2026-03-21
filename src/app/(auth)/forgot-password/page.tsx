import AuthCard from "@/features/auth/components/AuthCard";
import ForgotPasswordForm from "../../../features/auth/forgot-password/ForgotPasswordForm";

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
  );
};

export default ForgotPasswordPage;
