'use client'

import PaymentCountdown from "@/components/shared/PaymentCountdown"
import { Button } from "@/components/ui/button"
import { useTransactionStatus } from "@/hooks/transaction.hooks"
import { PAYMENT_TYPE_LABEL } from "@/types/common.type"
import { Clock } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaymentPendingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const { data, isPending } = useTransactionStatus(orderId)

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-yellow-100 p-4">
          <Clock className="w-12 h-12 text-yellow-600" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Menunggu Pembayaran</h1>
          <p className="text-muted-foreground text-sm">
            Selesaikan pembayaran sebelum waktu habis. Akun premium akan aktif otomatis setelah dikonfirmasi.
          </p>
        </div>

        {/* countdown — isolated component, tidak trigger rerender parent */}
        {data?.expiryTime && (
          <PaymentCountdown expiryTime={data.expiryTime} />
        )}

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
            {data.vaNumbers && data.vaNumbers.length > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">No. Virtual Account</span>
                <span className="font-medium font-mono">{data.vaNumbers[0].vaNumber}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium text-primary">
                Rp {Number(data.grossAmount).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ) : null}

        <Button variant="outline" size="lg" className="w-full" onClick={() => router.push('/dashboard')}>
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  )
}