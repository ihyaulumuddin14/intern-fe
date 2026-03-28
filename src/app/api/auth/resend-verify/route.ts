import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    const body = await req.json();
    console.log("email resend verify", body)

    const isSuccess = true;

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal kirim ulang verifikasi",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil kirim ulang verifikasi",
        data: null
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}