import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    
    const token = cookieStore.get("access_token")?.value

    if (token) {
      return NextResponse.json(
        {
          data: {
            full_name: "Somebody Pleasure",
            user_name: "somebody2345",
            email: "capek@gmail.com",
            role: "user",
            education_level: "SMA",
            major: "IPA",
            institution: "SMA Negeri 200 Malang",
            graduation_year: null,
            isPremium: false
          }
        },
        { status: 200 }
      )
    } else {
      throw new Error("no token")
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }
}