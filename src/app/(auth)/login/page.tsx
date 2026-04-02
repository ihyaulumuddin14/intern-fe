"use client";

import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "../../../features/auth/login/LoginForm";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = encodeURIComponent(searchParams.get("callbackUrl") || "");

  return (
    <AuthCard
      title="Selamat Datang Kembali"
      description="Masukkan detail akun kamu untuk melanjutkan sesi."
      footerText="Belum punya akun?"
      footerLink="Daftar"
      footerLinkTarget={`/register${callbackUrl ? `?callbackUrl=${callbackUrl}` : ``}`}
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
