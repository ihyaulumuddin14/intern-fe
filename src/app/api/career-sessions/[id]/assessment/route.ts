import { NextRequest, NextResponse } from "next/server"

export async function POST(
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
          error: {
            message: "(Mock) Gagal Menyimpan hasil assessment",
            status: 400
          }
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
          user_career_session_id: "idorgil"
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