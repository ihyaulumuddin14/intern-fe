import { getCareers } from "@/services/career.services"
import { Career } from "@/types/entities.type"
import { useQuery } from "@tanstack/react-query"

export const useCareers = () => {
  return useQuery<Career[]>({
    queryKey: ["careers"],
    queryFn: getCareers,
    retry: false,
    refetchOnWindowFocus: false,
  })
}