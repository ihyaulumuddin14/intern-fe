import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("refresh_token")?.value
  const role = request.cookies.get("role")?.value
  
  const { pathname, search } = request.nextUrl
  
  /**
   * User has no session and accessing protected route (dashboard/admin/assessment)
   * will be redirected to login with callback url to the previous route
   * to keep the flow stable
   */
  if (!session && !pathname.startsWith("/onboarding")) {
    const fullCallbackUrl = `${pathname}${search}`
    const encodedCallback = encodeURIComponent(fullCallbackUrl)
    
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallback}`, request.url)
    )
  }
  
  /**
   * User don't access onboarding when they have a login session
   * onboarding is intended for guest only
   */
  if (session && pathname.startsWith("/onboarding")) {
    const targetPath = role === "admin" ? "/admin" : "/dashboard"
    return NextResponse.redirect(new URL(targetPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/assessment/:path*",
    "/onboarding/:path*"
  ]
}