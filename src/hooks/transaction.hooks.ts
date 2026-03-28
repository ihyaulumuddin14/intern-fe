import { getTransactionStatus } from "@/services/transaction.services"
import { useQuery } from "@tanstack/react-query"  

export const useTransactionStatus = (orderId: string | null) => {
  return useQuery({
    queryKey: ["payment-status", orderId],
    queryFn: () => getTransactionStatus(orderId!),
    enabled: !!orderId,
    retry: false,
    refetchOnWindowFocus: false,
  })
}