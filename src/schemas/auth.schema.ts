import { z } from "zod";

export const RegisterSchema = z.object({
  fullname: z
    .string()
    .min(1, "Nama lengkap harus diisi")
    .min(3, "Nama lengkap minimal 3 karakter"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Email tidak valid"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(8, "Password minimal 8 karakter")
  })
  
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Email tidak valid"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(8, "Password minimal 8 karakter"),
  rememberMe: z
    .boolean()
  })
  
export const VerifySchema = z.object({
  token: z
    .string()
  })

export const ResendVerifySchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Email tidak valid"),
})

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Email tidak valid")
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Kata sandi harus diisi")
    .min(8, "Kata sandi minimal 8 karakter"),
  token: z
    .string()
    .min(1, "Tidak ada token disertakan")
})



export type LoginCredentials = z.infer<typeof LoginSchema>
export type RegisterCredentials = z.infer<typeof RegisterSchema>
export type VerifyCredentials = z.infer<typeof VerifySchema>
export type ResendVerifyCredentials = z.infer<typeof ResendVerifySchema>
export type ForgotPasswordCredentials = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordCredentials = z.infer<typeof ResetPasswordSchema>