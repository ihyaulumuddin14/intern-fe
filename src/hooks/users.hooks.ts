import { deleteMe, getUser, updateMe } from "@/services/user.services";
import { User } from "@/types/entities.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUser = () =>  {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  return {
    user: data as User,
    isPending,
    isFetching,
    error
  }
}

export const useDeleteMe = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.setQueryData(["user"], null)

      router.replace("/")
      window.location.reload()
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : (error as Error).message,
      );
    }
  })
}

export const useUpdateMe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["users"] })
      toast.dismiss()
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : (error as Error).message,
      );
    }
  })
}