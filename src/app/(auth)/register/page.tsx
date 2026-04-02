"use client";

import AuthCard from "@/features/auth/components/AuthCard";
import RegisterForm from "../../../features/auth/register/RegisterForm";
import { useSearchParams } from "next/navigation";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  return (
    <AuthCard
      title="Buat Akun Baru"
      description="Isi data di bawah ini untuk memulai perjalananmu bersama kami."
      footerText="Sudah punya akun?"
      footerLink="Login"
      footerLinkTarget={`/login${callbackUrl ? `?callbackUrl=${callbackUrl}` : ``}`}
    >
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
