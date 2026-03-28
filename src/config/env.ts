type Environment = "development" | "staging" | "production"
type ApiMode = "mock" | "real"

const ENV = (process.env.NEXT_PUBLIC_ENV ?? "development") as Environment
const API_MODE = (process.env.NEXT_PUBLIC_API_MODE ?? "real") as ApiMode
const REAL_API_URL = process.env.NEXT_PUBLIC_REAL_API_URL ?? ""

const isServer = typeof window === "undefined"

const MOCK_SERVER_URL: Record<Environment, string> = {
  development: "http://localhost:3000/api",
  staging: process.env.NEXT_PUBLIC_FE_URL || "",
  production: process.env.NEXT_PUBLIC_FE_URL || ""
}

function resolveApiUrl(): string {
  if (ENV === "production") return REAL_API_URL
  if (API_MODE === "real") return REAL_API_URL
  if (API_MODE === "mock") {
    if (isServer) return MOCK_SERVER_URL[ENV]
    return "/api"
  }

  return REAL_API_URL
}

export const apiConfig = {
  ENV,
  API_MODE,
  BASE_URL: resolveApiUrl(),

  isMock: ENV !== "production" && API_MODE === "mock",
  isProduction: ENV === "production",
  isServer,
} as const