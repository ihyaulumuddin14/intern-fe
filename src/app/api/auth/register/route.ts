import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body)

    // if (!result.success) {
    //   return NextResponse.json(
    //     { message: result.error },
    //     { status: 400 }
    //   )
    // }

    return NextResponse.json(
      { data: null },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}