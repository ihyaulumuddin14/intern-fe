import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // career session id
    const { id } = await params

    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    console.log("career session id", id)

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
          status: "on_process",
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