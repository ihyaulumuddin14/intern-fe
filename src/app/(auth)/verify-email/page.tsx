import AuthCard from "@/features/auth/components/AuthCard";
import VerifyEmailClient from "../../../features/auth/verify-email/VerifyEmailClient";

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
  );
};

export default VerifyEmailPage;
