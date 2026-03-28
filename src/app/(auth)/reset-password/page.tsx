import AuthCard from "@/features/auth/components/AuthCard";
import ResetPasswordForm from "../../../features/auth/reset-password/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <AuthCard
      title="Buat Kata Sandi Baru"
      description="Pilih kata sandi yang kuat dan mudah kamu ingat agar akunmu tetap aman."
      footerText=""
      footerLink=""
      footerLinkTarget={`#`}
    >
      <ResetPasswordForm />
    </AuthCard>
  );
};

export default ResetPasswordPage;
