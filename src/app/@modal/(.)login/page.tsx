"use client";

import LoginForm from "@/features/auth/login/LoginForm";
import AuthCard from "@/features/auth/components/AuthCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LoginPageInterceptor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname.startsWith("/login");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    router.back();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <AuthCard
          title="Selamat Datang Kembali"
          description="Masukkan detail akun kamu untuk melanjutkan sesi."
          footerText="Belum punya akun?"
          footerLink="Daftar"
          footerLinkTarget={`/register${callbackUrl ? `?callbackUrl=${callbackUrl}` : ``}`}
        >
          <LoginForm />
        </AuthCard>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPageInterceptor;
