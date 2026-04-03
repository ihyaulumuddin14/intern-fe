'use client'

import privateApi from "@/api/axiosInstance";
import { useUser } from "@/hooks/users.hooks";
import { toCamel } from "@/lib/case";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import CurrentPlan from "./CurrentPlan";
import PricingCard from "./PricingCard";

const freeFeatures = [
  { label: "Akses ke Basic skills dashboard", active: true },
  { label: "Terbatas hingga 3 skill test per bulan", active: true },
  { label: "Iklan di platform", active: false },
  { label: "Career coaching sessions", active: false },
  { label: "Sertifikat terverifikasi", active: false },
]

const premiumFeatures = [
  { label: "Akses ke SEMUA skills (Advanced included)", active: true },
  { label: "Skill tests TANPA BATAS", active: true },
  { label: "Pengalaman belajar TANPA IKLAN", active: true },
  { label: "Sesi Career Coaching Mingguan", active: true },
  { label: "Sertifikat resmi setiap penyelesaian jalur", active: true },
]

const DashboardPaymentPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const handlePayment = async () => {
    try {
      const response = await privateApi.post("/payment/create");
      const data = toCamel(response.data);

      window.snap.pay(data.data.snapToken, {
        onSuccess: (result) => {
          toast.dismiss()
          toast.success("Pembayaran berhasil!");
          router.push("/dashboard");
        },

        onPending: (result) => {
          if (result.transaction_status === "pending") {
            if (
              result.payment_type === "qris" ||
              result.payment_type === "bank_transfer"
            ) {
              toast.info("Selesaikan pembayaran kamu!");
              router.push(`/payment/pending?order_id=${result.order_id}`);
            }
          }
        },

        onError: () => {
          toast.error("Pembayaran gagal, coba lagi");
        },

        onClose: () => {
          toast.warning("Pembayaran dibatalkan");
        },
      });
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    }
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_MIDTRANS_KEY || "";

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <header className="flex flex-col gap-2 my-5">
        <h2 className="font-semibold text-3xl md:text-4xl">Pembelian</h2>
        <p>Atur rencana pembelian kamu</p>
      </header>

      <div className="flex flex-col gap-6">
        <CurrentPlan
          isPremium={user?.isPremium}
          onUpgrade={handlePayment}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PricingCard
            title="Free Plan"
            price="Rp 0"
            period="/forever"
            features={freeFeatures}
            isCurrent={!user?.isPremium}
          />

          <PricingCard
            title="Premium Plan"
            price="Rp 99.000"
            period="/month"
            features={premiumFeatures}
            isPremium
            isCurrent={user?.isPremium}
            onClick={handlePayment}
          />
        </div>
      </div>

      <footer></footer>
    </div>
  )
}

export default DashboardPaymentPage