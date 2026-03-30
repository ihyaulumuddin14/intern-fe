import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    const body = await req.json()
    console.log("register", body)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Register",
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: "(Mock) Berhasil Register, cek email verifikasi",
        data: null
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}