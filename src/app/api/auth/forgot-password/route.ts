import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))
    
    console.log("email forgot password", body)
    console.log("link reset: http://localhost:3000/reset-password?token=FDSefqo87c43yrUGYU8968")

    const isSuccess = true;

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "(Mock) Gagal request reset password",
            status: 400
          }
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Email reset password berhasil dikirim",
        data: null
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Internal server error",
          status: 500
        }
      },
      { status: 500 }
    );
  }
}