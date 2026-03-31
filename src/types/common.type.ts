export type Role = "user" | "admin"

export type StepDirection = "forward" | "backward"

export type CareerSessionStatus = "not_started" | "on_assessment" | "on_quiz" | "on_learning" | "complete"

export const PAYMENT_TYPE_LABEL: Record<string, string> = {
  creditCard: "Kartu Kredit",
  bankTransfer: "Transfer Bank",
  qris: "QRIS",
  gopay: "GoPay",
  shopeepay: "ShopeePay",
  otherQris: "QRIS",
}