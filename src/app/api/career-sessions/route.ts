import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    console.log("career id", body)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "(Mock) Gagal Membuat sesi karier",
            status: 400
          }
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil membuat sesi karier",
        data: {
          id: "asdfa67663dwesdyguq2e3bssj"
        }
      })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}