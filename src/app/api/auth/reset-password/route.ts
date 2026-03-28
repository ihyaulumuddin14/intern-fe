import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    console.log("reset-password", body)

    const isSuccess = true;

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Reset password gagal",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Password berhasil direset",
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