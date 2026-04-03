"use client";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { getSafeCallback } from "@/helper/safeCallback";
import { useResendVerifyEmail, useVerifyEmail } from "@/hooks/auth.hooks";
import {
  ResendVerifyCredentials,
  VerifyCredentials,
} from "@/schemas/auth.schema";
import { AlertTriangle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyEmailClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const callbackUrl = getSafeCallback(searchParams);
  const [isVerified, setIsVerified] = useState(false);
  const {
    mutateAsync: mutateAsyncVerify,
    isPending: isPendingVerify,
    error,
    data,
  } = useVerifyEmail();
  const { mutateAsync: mutateAsyncResend, isPending: isPendingResend } =
    useResendVerifyEmail();
  const [countResend, setCountResend] = useState(0);

  // for handle resend verify
  const handleResendEmail = async () => {
    if (countResend !== 0 || isPendingResend) return;

    const email = sessionStorage.getItem("pending-verification-email") || "";

    if (!email) {
      toast.error("Sesi verifikasi tidak ditemukan, silakan login kembali");
      router.push("/login");
      return;
    }

    const credentials: ResendVerifyCredentials & { callbackUrl: string } = {
      email,
      callbackUrl,
    };

    try {
      await mutateAsyncResend(credentials);
      toast.success("Email verifikasi baru telah dikirim!");

      setCountResend(60);
    } catch {} // error handling is provided in hooks
  };

  /**
   * At the first mount, token from search params will use
   * for automatic verifying the email
   */
  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      setIsVerified(false);

      const credentials: VerifyCredentials = { token: token || "" };

      try {
        await mutateAsyncVerify(credentials);
        setIsVerified(true);

        /**
         * When user account has verified, its will be redirected to login with
         * the callback url from the previous login if there is a callback url
         */
        await new Promise(() =>
          setTimeout(() => {
            router.replace(`/login?callbackUrl=${callbackUrl}`);
            toast.dismiss();
          }, 2000),
        );
      } catch {} // error handling is provided in hooks
    };

    setCountResend(60);
    verifyEmail();
  }, [token]);

  useEffect(() => {
    if (countResend === 0) return;

    const interval = setInterval(() => {
      setCountResend((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [countResend]);

  return (
    <div className="w-full max-w-xs flex flex-col items-center mx-auto">
      <div className="w-1/2 mx-auto flex justify-center items-center">
        {isPendingVerify && (
          <Loader2
            className="animate-spin text-muted-foreground"
            size={80}
            strokeWidth={1.5}
          />
        )}
        {!isPendingVerify && !error && !isVerified && (
          <XCircle
            className="text-destructive animate-pulse"
            size={80}
            strokeWidth={1.5}
          />
        )}
        {error && (
          <AlertTriangle
            className="text-warning"
            size={80}
            strokeWidth={1.5}
          />
        )}
        {data && isVerified && (
          <CheckCircle
            className="text-success"
            size={80}
            strokeWidth={1.5}
          />
        )}
      </div>

      <p>
        {isPendingVerify && "Memverifikasi akun Anda.."}
        {isVerified && "Akun berhasil diverifikasi!"}
        {error && <FieldError>{error.message}</FieldError>}
      </p>

      <footer className="w-full text-center mt-10 flex flex-col items-center gap-3">
        <p className="text-muted-foreground">Belum menerima email?</p>
        <div className="w-full flex gap-2 justify-center items-center">
          <Button
            onClick={handleResendEmail}
            disabled={countResend !== 0 || isPendingResend}
          >
            {isPendingResend ? "Mengirim..." : "Kirim Ulang"}
          </Button>
          {countResend !== 0 && <span>{countResend}s</span>}
        </div>
      </footer>
    </div>
  );
};

export default VerifyEmailClient;
