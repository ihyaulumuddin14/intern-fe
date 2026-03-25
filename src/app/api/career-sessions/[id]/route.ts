import { Skill } from "@/types/entities.type";
import { NextRequest, NextResponse } from "next/server";

const skills: Skill[] = [
  { id: "1", name: "HTML", description: "Lorem ipsum" },
  { id: "2", name: "CSS", description: "Lorem ipsum" },
  { id: "3", name: "JavaScript Programming", description: "Lorem ipsum" },
  { id: "4", name: "React.js", description: "Lorem ipsum" },
  { id: "5", name: "Next.js", description: "Lorem ipsum" },
  { id: "6", name: "Responsive Design", description: "Lorem ipsum" },
  { id: "7", name: "Git Version Control", description: "Lorem ipsum" },
  { id: "8", name: "REST API", description: "Lorem ipsum" },
  { id: "9", name: "Debugging", description: "Lorem ipsum" },
  { id: "10", name: "Typescript Programming", description: "Lorem ipsum" },
]

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
          error: {
            message: "(Mock) Gagal Mengambil data skills",
            status: 400
          }
        },
        { status: 400 }
      )
    }

    // will return a list of skills according to the career ID found
    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil ambil data skills",
        data: skills
      }
    )
  } catch (error) {
    
  }
}