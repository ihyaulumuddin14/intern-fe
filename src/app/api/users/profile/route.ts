import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")

    if (token) {
      return NextResponse.json(
        {
          data: {
            full_name: "User1",
            username: "user1",
            email: "user@gmail.com",
            role: "user",
            education_level: "SMA",
            major: "IPA",
            institution: "SMA Negeri 200 Malang",
            graduation_year: null,
            is_premium: false
          }
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }
}