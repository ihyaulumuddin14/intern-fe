import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    console.log("login", body)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "(Mock) Gagal Login",
            status: 400
          }
        },
        { status: 400 }
      )
    }

    const cookieStore = await cookies();

    cookieStore.set("access_token", "accesstokengila", {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60 * 1000
    })

    cookieStore.set("refresh_token", "refreshtokengila", {
      httpOnly: true,
      path: "/api/auth/refresh",
      maxAge: body.rememberMe ? 24 * 60 * 60 : 60 * 60
    })

    cookieStore.set("role", "user", {
      httpOnly: true,
      path: "/api",
      maxAge: body.rememberMe ? 24 * 60 * 60 : 60 * 60
    })

    return NextResponse.json(
      { 
        success: true,
        message: "(Mock) Berhasil Login",
        data: null
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