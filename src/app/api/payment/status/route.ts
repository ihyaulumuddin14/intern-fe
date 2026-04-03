import snap from "@/lib/midtrans"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "order_id tidak ditemukan" },
        { status: 400 }
      )
    }

    const status = await snap.transaction.status(orderId)

    return NextResponse.json(
      { success: true, data: status },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}