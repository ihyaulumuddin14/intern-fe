import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("access_token")?.value
  const role = request.cookies.get("role")?.value
  
  const { pathname, search } = request.nextUrl
  
  if (!session && !pathname.startsWith("/onboarding")) {
    const fullCallbackUrl = `${pathname}${search}`
    const encodedCallback = encodeURIComponent(fullCallbackUrl)
    
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallback}`, request.url)
    )
  } 
  
  if (session && pathname.startsWith("/onboarding")) {
    const targetPath = role === "admin" ? "/admin" : "/dashboard"
    return NextResponse.redirect(new URL(targetPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/assessment/:path*",
    "/onboarding/:path*"
  ]
}