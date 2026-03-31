import { NextRequest, NextResponse } from "next/server"

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    const { id: careerSessionId } = await params
    console.log("career session id", careerSessionId)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Menyimpan hasil assessment",
        },
        { status: 400 }
      )
    }

    // return the career session id back to start the quiz
    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil menyimpan data assessment",
        data: {
          career_session_id: "uuid-session"
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