import privateApi from "@/api/axiosInstance";
import { toCamel } from "@/lib/case";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await privateApi.get("/api/users/profile")
      console.log("dari hooks", toCamel(response.data.data))
      return toCamel(response.data.data)
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  return {
    user: data,
    isPending,
    isFetching,
    error
  }
}
