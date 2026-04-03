import snap from "@/lib/midtrans"
import { SnapTransactionParameters } from "midtrans-client"
import { NextRequest, NextResponse } from "next/server"

interface SnapTransactionParametersExtended extends SnapTransactionParameters {
  customer_details?: {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
  }
  item_details?: {
    id?: string
    price: number
    quantity: number
    name: string
  }[]
  callbacks?: {
    finish?: string
    error?: string
    unfinish?: string
  }
}

const user = {
  fullname: "user",
  email: "user@gmail.com",
}

const BASE_URL = "http://localhost:3000"

export async function POST(req: NextRequest) {
  try {
    const header = req.headers.get("Authorization")
    const jwtToken = header?.split(" ")[1]
    const user_id = `${jwtToken}-useruuid`

    const { token, redirect_url } = await snap.createTransaction({
      transaction_details: {
        order_id: `PREMIUM-${user_id}-${Date.now()}`,
        gross_amount: 50000
      },
      customer_details: {
        first_name: user.fullname,
        email: user.email
      },
      item_details: [{
        id: "PREMIUM_PLAN",
        price: 50000,
        quantity: 1,
        name: "SkillGap Premium"
      }],
      callbacks: {
        finish: `${BASE_URL}/payment/finish`,
        error: `${BASE_URL}/payment/error`,
        unfinish: `${BASE_URL}/payment/pending`
      }
    } as SnapTransactionParametersExtended)

    return NextResponse.json(
      { success: true, message: "Berhasil membuat transaksi", data: { token, redirect_url } },
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