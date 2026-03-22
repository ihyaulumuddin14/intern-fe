"use client";

import RegisterForm from "@/features/auth/register/RegisterForm";
import AuthCard from "@/features/auth/components/AuthCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RegisterPageInterceptor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname.startsWith("/register");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

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
          title="Register"
          description="Lorem ipsum dolor sit amet"
          footerText="Sudah punya akun?"
          footerLink="Login"
          footerLinkTarget={`/login${callbackUrl ? `?callbackUrl${callbackUrl}` : ``}`}
        >
          <RegisterForm />
        </AuthCard>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPageInterceptor;
