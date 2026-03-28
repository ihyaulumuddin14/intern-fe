export type Role = "user" | "admin"

export type StepDirection = "forward" | "backward"

export const PAYMENT_TYPE_LABEL: Record<string, string> = {
  creditCard: "Kartu Kredit",
  bankTransfer: "Transfer Bank",
  qris: "QRIS",
  gopay: "GoPay",
  shopeepay: "ShopeePay",
  otherQris: "QRIS",
}