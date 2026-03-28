import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    const body = await req.json();
    console.log("login", body)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Login",
        },
        { status: 400 }
      )
    }

    const cookieStore = await cookies();
 
    cookieStore.set("refresh_token", "refreshtoken", {
      httpOnly: true,
      path: "/",
      maxAge: body.rememberMe ? 24 * 60 * 60 : 15 * 60
    })
    
    cookieStore.set("role", "user", {
      httpOnly: true,
      path: "/",
      maxAge: body.rememberMe ? 24 * 60 * 60 : 15 * 60
    })

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Login berhasil",
        data: {
          access_token: "access_token",
          user: {
            fullname: "Somebody Pleasure",
            username: "somebody2345",
            email: "user@gmail.com",
            role: "user",
            education_level: "SMA",
            major: "IPA",
            institution: "SMA Taruna Bakti",
            graduation_year: null,
            is_premium: false
          }
        }
      },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}