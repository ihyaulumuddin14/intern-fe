import Midtrans from 'midtrans-client'

export interface TransactionStatus {
  order_id: string
  transaction_status: string
  fraud_status: string
  payment_type: string
  transaction_id: string
  gross_amount: string
  status_code: string
  status_message: string
  expiry_time: string // format: "2026-03-27 15:13:57"
  transaction_time: string
  currency: string
  merchant_id: string
  signature_key: string
  va_numbers?: { bank: string; va_number: string }[]
}

interface SnapWithTransaction extends Midtrans.Snap {
  transaction: {
    status: (orderId: string) => Promise<TransactionStatus>
    notification: (body: Record<string, string>) => Promise<TransactionStatus>
  }
}

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_MIDTRANS_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_CLIENT_MIDTRANS_KEY || ""
}) as SnapWithTransaction

export default snap