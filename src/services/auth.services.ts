import { authApi } from "@/api/axiosInstance"
import { toCamel, toSnake } from "@/lib/case"
import { ForgotPasswordCredentials, LoginCredentials, RegisterCredentials, ResendVerifyCredentials, ResetPasswordCredentials, VerifyCredentials } from "@/schemas/auth.schema"

export async function registerUser(data: RegisterCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/api/auth/register",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Register gagal")

  return toCamel(response.data)
}

export async function loginUser(data: LoginCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/api/auth/login",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Login gagal")

  return toCamel(response.data)
}

export async function logoutUser() {
  const response = await authApi.post(
    "/api/auth/logout"
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Logout gagal")

  return toCamel(response.data)
}

export async function verifyEmail(data: VerifyCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/api/auth/verify",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Verifikasi gagal")

  return toCamel(response.data)
}

export async function resendVerify(data: ResendVerifyCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/api/auth/resend-verify",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Gagal kirim ulang verifikasi")

  return toCamel(response.data)
}

export async function forgotPassword(data: ForgotPasswordCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/api/auth/forgot-password",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Permintaan reset password gagal")

  return toCamel(response.data)
}

export async function resetPassword(data: ResetPasswordCredentials) {
  const convertedPayload = toSnake(data)

  const response = await authApi.post(
    "/api/auth/reset-password",
    JSON.stringify(convertedPayload)
  )

  if (!response.data.success) throw new Error(response.data.error?.message || "Reset password gagal")

  return toCamel(response.data)
}