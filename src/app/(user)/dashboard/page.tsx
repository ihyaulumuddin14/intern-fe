"use client";

import privateApi from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth.hooks";
import useUser from "@/hooks/users.hooks";
import { toCamel } from "@/lib/case";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function UserDashboardPage() {
  const { mutate, isPending } = useLogout();
  const router = useRouter()
  const { user } = useUser()

  const handleLogout = () => mutate();

  const handlePayment = async () => {
    try {
      const response = await privateApi.post("/payment/create");
      const data = toCamel(response.data);

      window.snap.pay(data.data.token, {
        onSuccess: (result) => {
          toast.success("Pembayaran berhasil!")
          router.push("/dashboard")
        },

        onPending: (result) => {
          if (result.transaction_status === 'pending') {
            if (result.payment_type === 'qris' || result.payment_type === 'bank_transfer') {
              toast.info("Selesaikan pembayaran kamu!")
              router.push(`/payment/pending?order_id=${result.order_id}`)
            }
          }
        },

        onError: () => {
          toast.error("Pembayaran gagal, coba lagi")
        },

        onClose: () => {
          toast.warning("Pembayaran dibatalkan")
        }
      })
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    }
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_MIDTRANS_KEY || ""

    const script = document.createElement("script")
    script.src = snapScript
    script.setAttribute("data-client-key", clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section>
      User Dashboard Page
      <Button
        variant={"destructive"}
        disabled={isPending}
        onClick={handleLogout}
      >
        {isPending ? "..." : "Logout"}
      </Button>
      <Button
        onClick={handlePayment}
        variant={"outline"}
      >
        Upgrade Premium
      </Button>

      <div>{JSON.stringify(user)}</div>
    </section>
  );
}