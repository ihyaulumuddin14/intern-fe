"use client";

import AuthCard from "@/features/auth/components/AuthCard";
import RegisterForm from "../../../features/auth/register/RegisterForm";
import { useSearchParams } from "next/navigation";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <AuthCard
      title="Register"
      description="Lorem ipsum dolor sit amet"
      footerText="Sudah punya akun?"
      footerLink="Login"
      footerLinkTarget={`/login${callbackUrl ? `?callbackUrl${callbackUrl}` : ``}`}
    >
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
