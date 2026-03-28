import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    const body = await req.json();
    console.log("career id", body)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Membuat sesi karier",
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil membuat sesi karier",
        data: {
          id: "uuid-career-sessions",
          user_id: "uuid-user",
          career_id: "uuid-career",
          status: "on_process",
          started_at: "2026-03-26T16:00:00Z"
        }
      })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}