"use client";

import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "../../../features/auth/login/LoginForm";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <AuthCard
      title="Login"
      description="Lorem ipsum dolor sit amet"
      footerText="Belum punya akun?"
      footerLink="Daftar"
      footerLinkTarget={`/register${callbackUrl ? `?callbackUrl${callbackUrl}` : ``}`}
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
