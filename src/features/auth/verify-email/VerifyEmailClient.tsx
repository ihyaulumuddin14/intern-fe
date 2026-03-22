'use client'

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { getSafeCallback } from "@/helper/safeCallback";
import { useResendVerifyEmail, useVerifyEmail } from "@/hooks/auth.hooks";
import { ResendVerifyCredentials, VerifyCredentials } from "@/schemas/auth.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyEmailClient = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const callbackUrl = getSafeCallback(searchParams)
  const [isVerified, setIsVerified] = useState(false)
  const { mutateAsync: mutateAsyncVerify, isPending: isPendingVerify, error, data } = useVerifyEmail()
  const { mutateAsync: mutateAsyncResend, isPending: isPendingResend } = useResendVerifyEmail()
  const [countResend, setCountResend] = useState(60)

  const handleResendEmail = async () => {
    if (countResend !== 0) return

    const credentials: ResendVerifyCredentials = {
      token: token || ""
    }

    try {
      await mutateAsyncResend(credentials)
      setCountResend(60)
    } catch {}
  }

  useEffect(() => {
    setIsVerified(false)

    const verifyEmail = async () => {
      const credentials: VerifyCredentials = {
        token: token || ""
      }

      try {
        await mutateAsyncVerify(credentials)
        setIsVerified(true)

        await new Promise(res => setTimeout(() => {
          router.replace(`/login?callbackUrl=${callbackUrl}`)
          toast.dismiss()
          res(null)
        }, 2000))
      } catch {}
    }

    if (token) verifyEmail()
  }, [])

  useEffect(() => {
    if (isPendingResend) return
    setCountResend(60)

    const interval = setInterval(() => {
      setCountResend((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router, isPendingResend])

  return (
    <div className="w-full max-w-xs flex flex-col items-center mx-auto">
      <img
        className="w-1/2 mx-auto"
        src={(isPendingVerify && "/gif/face-scan.gif") || (error && "/gif/failed-verify.gif") || (data && "/gif/success-verify.gif")}
        alt="status.gif"
      />

      <p>
        {isPendingVerify && "Memverifikasi akun Anda.."}
        {isVerified && "Akun berhasil diverifikasi!"}
        {error && (
          <FieldError>{error.message}</FieldError>
        )}
      </p>

      <footer className="w-full text-center mt-10 flex flex-col items-center gap-3">
        <p className="text-muted-foreground">Belum menerima email?</p>
        <div className="w-full flex gap-2 justify-center items-center">
          <Button
            onClick={handleResendEmail}
            disabled={countResend !== 0}
          >
            {isPendingResend ? "Mengirim..." : "Kirim Ulang"}
          </Button>
          {countResend !== 0 && (
            <span>{countResend}s</span>
          )}
        </div>
      </footer>
    </div>
  )
};

export default VerifyEmailClient;
