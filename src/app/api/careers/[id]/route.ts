import { SkillRaw } from "@/types/entities.type";
import { NextRequest, NextResponse } from "next/server";

export const skillsRaw: SkillRaw[] = [
  { id: "1", name: "HTML", desc: "Lorem ipsum", priority: 1, requiredLevel: "beginner" },
  { id: "2", name: "CSS", desc: "Lorem ipsum", priority: 2, requiredLevel: "beginner" },
  { id: "3", name: "JavaScript Programming", desc: "Lorem ipsum", priority: 3, requiredLevel: "intermediate" },
  { id: "4", name: "React.js", desc: "Lorem ipsum", priority: 4, requiredLevel: "intermediate" },
  { id: "5", name: "Next.js", desc: "Lorem ipsum", priority: 5, requiredLevel: "intermediate" },
  { id: "6", name: "Responsive Design", desc: "Lorem ipsum", priority: 6, requiredLevel: "beginner" },
  { id: "7", name: "Git Version Control", desc: "Lorem ipsum", priority: 7, requiredLevel: "beginner" },
  { id: "8", name: "REST API", desc: "Lorem ipsum", priority: 8, requiredLevel: "intermediate" },
  { id: "9", name: "Debugging", desc: "Lorem ipsum", priority: 9, requiredLevel: "intermediate" },
  { id: "10", name: "Typescript Programming", desc: "Lorem ipsum", priority: 10, requiredLevel: "expert" },
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // mock bandwith
    await new Promise(res => setTimeout(res, 2000))

    // career id
    const { id } = await params
    console.log("career id", id)

    const isSuccess = true

    if (!isSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "(Mock) Gagal Mengambil data skills",
        },
        { status: 400 }
      )
    }

    // will return a list of skills according to the career ID found
    return NextResponse.json(
      {
        success: true,
        message: "(Mock) Berhasil ambil data skills",
        data: {
          id: "uuid-career",
          name: "Frontend Developer",
          desc: "Apa aja",
          skills: skillsRaw
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