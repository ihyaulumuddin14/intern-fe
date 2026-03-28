import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

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