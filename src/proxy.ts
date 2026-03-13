import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken") ?? "mocktoken"
  // const token = request.cookies.get("accessToken")

  if (!token) {
    return NextResponse.redirect(new URL("/onboarding", request.url))
  }

  NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*"
  ]
}