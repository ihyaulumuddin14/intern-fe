'use client'

import { Button } from "@/components/ui/button"
import { useTransactionStatus } from "@/hooks/transaction.hooks"
import { CheckCircle2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const PAYMENT_TYPE_LABEL: Record<string, string> = {
  credit_card: "Kartu Kredit",
  bank_transfer: "Transfer Bank",
  qris: "QRIS",
  gopay: "GoPay",
  shopeepay: "ShopeePay",
  other_qris: "QRIS",
}

export default function PaymentFinishPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  const { data, isPending } = useTransactionStatus(orderId)

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Pembayaran Berhasil!</h1>
          <p className="text-muted-foreground text-sm">
            Akun kamu sekarang sudah aktif sebagai Premium.
          </p>
        </div>

        {isPending ? (
          <div className="w-full rounded-xl border p-4 flex flex-col gap-2 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-4 bg-muted rounded w-1/3 mx-auto" />
          </div>
        ) : data ? (
          <div className="w-full rounded-xl border p-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">{data.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Metode</span>
              <span className="font-medium">
                {PAYMENT_TYPE_LABEL[data.paymentType] ?? data.paymentType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium text-primary">
                Rp {Number(data.grossAmount).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ) : null}

        <Button size="lg" className="w-full" onClick={() => router.push('/dashboard')}>
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  )
}