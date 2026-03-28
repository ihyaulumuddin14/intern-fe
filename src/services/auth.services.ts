import { authApi } from "@/api/axiosInstance"
import { toCamel, toSnake } from "@/lib/case"
import { ForgotPasswordCredentials, LoginCredentials, RegisterCredentials, ResendVerifyCredentials, ResetPasswordCredentials, VerifyCredentials } from "@/schemas/auth.schema"

export async function registerUser(data: RegisterCredentials & { callbackUrl: string }) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/auth/register",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data?.message || "Register gagal")

  return toCamel(response.data)
}

export async function loginUser(data: LoginCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/auth/login",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data?.message || "Login gagal")

  return toCamel(response.data)
}

export async function logoutUser() {
  const response = await authApi.post(
    "/auth/logout"
  )

  if (!response.data.success) throw new Error(response.data?.message || "Logout gagal")

  return toCamel(response.data)
}

export async function verifyEmail(data: VerifyCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/auth/verify",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data?.message || "Verifikasi gagal")

  return toCamel(response.data)
}

export async function resendVerify(data: ResendVerifyCredentials & { callbackUrl: string }) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/auth/resend-verify",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data?.message || "Gagal kirim ulang verifikasi")

  return toCamel(response.data)
}

export async function forgotPassword(data: ForgotPasswordCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/auth/forgot-password",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data?.message || "Permintaan reset password gagal")

  return toCamel(response.data)
}

export async function resetPassword(data: ResetPasswordCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/auth/reset-password",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data?.message || "Reset password gagal")

  return toCamel(response.data)
}