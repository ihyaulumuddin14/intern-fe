import AuthCard from "@/features/auth/components/AuthCard";
import VerifyEmailClient from "../../../features/auth/verify-email/VerifyEmailClient";

const VerifyEmailPage = () => {
  return (
    <AuthCard
      title="Verifikasi Email"
      description="Silakan verifikasi akun kamu untuk dapat melanjutkan sesi"
      footerText=""
      footerLink=""
      footerLinkTarget=""
    >
      <VerifyEmailClient />
    </AuthCard>
  );
};

export default VerifyEmailPage;
