import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    // career session id
    const { id: careerSessionId } = await params
    console.log("career session id", careerSessionId)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Mengambil detail career session",
        },
        { status: 400 }
      )
    }

    // will return a list of skills according to the career ID found
    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil ambil detail career session",
        data: {
          id: "uuid-session",
          user_id: "uuid-user",
          career_id: "uuid-career",
          status: "on_assessment",
          started_at: "2026-03-26T16:00:00Z"
        }
      }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}