import { NextRequest, NextResponse } from "next/server"

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ careerSessionId: string }> }
) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    const { careerSessionId } = await params
    console.log("career session id", careerSessionId)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Memulai kuis",
        },
        { status: 400 }
      )
    }

    // return the career session id back to start the quiz
    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil Memulai kuis baru",
        data: {
          quiz_session_id: `uuid-quiz-session`,
          questions: [
            {
              quiz_answer_id: "uuid-quiz-answer-1",
              question_id: "uuid-question-1",
              skill_id: "uuid-skill-1",
              skill_name: "JavaScript",
              question_content: "Apa itu JavaScript?",
              option_a: "Bahasa pemrograman untuk membuat website",
              option_b: "Bahasa pemrograman untuk membuat aplikasi mobile",
              option_c: "Bahasa pemrograman untuk membuat game",
              option_d: "Bahasa pemrograman untuk membuat desktop application",
            }
          ]
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