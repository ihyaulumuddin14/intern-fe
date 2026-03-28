'use client'

import { Button } from "@/components/ui/button"
import { useTransactionStatus } from "@/hooks/transaction.hooks"
import { PAYMENT_TYPE_LABEL } from "@/types/common.type"
import { XCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaymentErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  const { data, isPending } = useTransactionStatus(orderId)

  const handleRetry = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-red-100 p-4">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Pembayaran Gagal</h1>
          <p className="text-muted-foreground text-sm">
            Terjadi kesalahan saat memproses pembayaran kamu. Silakan coba lagi.
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
              <span className="font-medium">
                Rp {Number(data.grossMount).toLocaleString('id-ID')}
              </span>
            </div>
            {data.statusMessage && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Keterangan</span>
                <span className="font-medium text-red-500">{data.statusMessage}</span>
              </div>
            )}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 w-full">
          <Button size="lg" className="w-full" onClick={handleRetry}>
            Coba Lagi
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={() => router.push('/dashboard')}>
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}