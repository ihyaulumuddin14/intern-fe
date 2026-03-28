import privateApi from "@/api/axiosInstance"
import { toCamel } from "@/lib/case"

export async function getTransactionStatus (orderId: string) {
  const response = await privateApi.get(`/payment/status?order_id=${orderId}`)

  if (!response.data.success) throw new Error("Gagal mengambil status transaksi")

  return toCamel(response.data.data)
}