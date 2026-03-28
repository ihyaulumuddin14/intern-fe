import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))
    
    console.log("email forgot password", body)

    const isSuccess = true;

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal request reset password",
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
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}