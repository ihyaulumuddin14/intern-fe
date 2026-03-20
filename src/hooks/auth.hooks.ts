import { getSafeCallback } from "@/helper/safeCallback"
import { forgotPassword, loginUser, logoutUser, registerUser, resendVerify, resetPassword, verifyEmail } from "@/services/auth.services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      toast.success(response.message || "Register berhasil")
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      );
    }
  })
}

export const useLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const callbackUrl = getSafeCallback(searchParams)

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      toast.success(response.message || "Login berhasil")
      queryClient.setQueryData(["users"], response.data)
      router.replace(callbackUrl)
      router.refresh()
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      );
    }
  })
}

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      toast.success(response.message || "Logout berhasil")
      queryClient.clear()
      router.push("/")
      router.refresh()
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      );
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (_response) => {
      toast.loading("Mengalihkan ke halaman login")
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      );
    }
  })
}

export const useResendVerifyEmail = () => {
  return useMutation({
    mutationFn: resendVerify,
    onSuccess: (response) => {
      toast.success(response.message || "Berhasil kirim email verifikasi")
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      );
    }
  })
}

export const useForgotPassword = () => {  
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Tautan reset berhasil dikirim")
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      )
    }
  })
}

export const useResetPassword = () => {  
  const router = useRouter()

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Password berhasil direset!")
      router.replace("/login")
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.error?.message || "Terjadi kesalahan sistem"
          : (error as Error).message
      )
    }
  })
}