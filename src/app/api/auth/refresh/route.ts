import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Refresh token tidak valid atau habis",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Access token berhasil diperbarui",
        data: {
          access_token: "newaccesstokengila"
        }
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