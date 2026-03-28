import snap from "@/lib/midtrans"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const notification = await snap.transaction.notification(body)

    const { order_id, transaction_id, fraud_status, transaction_status } = notification

    const isSuccess =
      (transaction_id === 'capture' && fraud_status === 'accept') ||
      transaction_status === 'settlement'

    if (isSuccess) {
      console.log("Akun berubah menjadi premium")
    } else {
      console.log("Akun usang")
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ success: true }, { status: 200 })
}