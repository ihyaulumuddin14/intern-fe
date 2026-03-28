import AuthCard from "@/features/auth/components/AuthCard";
import ForgotPasswordForm from "../../../features/auth/forgot-password/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthCard
      title="Atur Ulang Kata Sandi"
      description="Jangan khawatir, kami akan memberikan instruksi untuk membuat kata sandi baru."
      footerText=""
      footerLink=""
      footerLinkTarget={`#`}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPasswordPage;
