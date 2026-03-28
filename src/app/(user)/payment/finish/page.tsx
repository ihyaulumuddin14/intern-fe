'use client'

import Loader from "@/components/shared/Loader"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function PaymentFinishPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const transactionStatus = searchParams.get('transaction_status')

  useEffect(() => {
    if (!transactionStatus) return
    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      router.replace(`/payment/success?order_id=${orderId}`)
    } else if (transactionStatus === 'pending') {
      router.replace(`/payment/pending?order_id=${orderId}`)
    } else {
      router.replace(`/payment/error?order_id=${orderId}`)
    }
  }, [transactionStatus])

  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <Loader size="lg" />
      Mengalihkan halaman..
    </div>
  )
}