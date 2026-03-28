import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    // hapus cookie access_token dan refresh_token
    cookieStore.delete("refresh_token");
    cookieStore.delete("role");

    const isSuccess = true; // toggle debug

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Logout gagal",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Logout berhasil",
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