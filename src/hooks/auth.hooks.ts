"use client";

import privateApi from "@/api/axiosInstance";
import { getSafeCallback } from "@/helper/safeCallback";
import { getQueryClient } from "@/lib/queryClient";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendVerify,
  resetPassword,
  verifyEmail,
} from "@/services/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data, credentials) => {
      // dummy
      console.log(
        `link verify: http://localhost:3000/verify-email?token=FDSefqo87c43yrUGYU8968&callbackUrl=dashboard`,
      );
      toast.success(data.message || "Register berhasil");
      sessionStorage.setItem("pending-verification-email", credentials.email);
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const callbackUrl = getSafeCallback(searchParams);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const accessToken = response.data.accessToken;
      privateApi.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;

      toast.success(response.message || "Login berhasil");
      queryClient.setQueryData(["users"], response.data);

      /**
       * Ensure cookies reach the client browser
       * as there is latency in production builds
       */
      setTimeout(() => {
        router.replace(callbackUrl);
      }, 500);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 403) {
          const unverifiedEmail = error.response?.data?.data?.email;

          sessionStorage.setItem("pending-verification-email", unverifiedEmail);
          router.push("/verify-email");
          return;
        }

        toast.error(message || "Terjadi kesalahan sistem");
      } else {
        toast.error((error as Error).message);
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      router.push("/");
      router.refresh();
      toast.success(response.message || "Logout berhasil");
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message
          : (error as Error).message,
      );
    },
    onSettled: () => {
      queryClient.clear();

      delete privateApi.defaults.headers.common["Authorization"];
      window.location.href = "/";
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (_response) => {
      toast.loading("Mengalihkan ke halaman login");
      sessionStorage.removeItem("pending-verification-email");
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};

export const useResendVerifyEmail = () => {
  return useMutation({
    mutationFn: resendVerify,
    onSuccess: (response) => {
      // dummy
      console.log(
        `link verify: http://localhost:3000/verify-email?token=FDSefqo87c43yrUGYU8968&callbackUrl=dashboard`,
      );
      toast.success(response.message || "Berhasil kirim email verifikasi");
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Tautan reset berhasil dikirim");
      // dummy
      console.log(
        `link reset: http://localhost:3000/reset-password?token=FDSefqo87c43yrUGYU8968`,
      );
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Password berhasil direset!");
      router.replace("/login");
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};
