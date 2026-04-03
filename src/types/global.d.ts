declare module "*.css"

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: MidtransResult) => void
          onPending?: (result: MidtransResult) => void
          onError?: (result: MidtransResult) => void
          onClose?: () => void
        }
      ) => void
    }
  }
}

interface MidtransResult {
  order_id: string
  transaction_status: string
  fraud_status: string
  payment_type: string
  transaction_id: string
  gross_amount: string
  status_code: string
  status_message: string
}

export {}