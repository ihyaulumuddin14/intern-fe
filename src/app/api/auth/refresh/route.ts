import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const isSuccess = !!refreshToken; // debug: sukses kalau ada cookie refresh_token

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "(Mock) Refresh token tidak valid atau habis",
            status: 401
          }
        },
        { status: 401 }
      );
    }

    // generate new access token
    cookieStore.set("access_token", "newaccesstokengila", {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60 // 15 menit
    });

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
        error: {
          message: "Internal server error",
          status: 500
        }
      },
      { status: 500 }
    );
  }
}