import { getCareerById, getCareers } from "@/services/career.services"
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

export const useCareerById = (careerId: string) => {
  return useQuery<Career>({
    queryKey: ["career", careerId],
    queryFn: async () => getCareerById(careerId),
    staleTime: 60 * 60 * 1000
  })
}