import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))
    
    const body = await req.json();
    console.log("token verify", body)

    const isSuccess = true;

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Verifikasi gagal",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Verifikasi berhasil",
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