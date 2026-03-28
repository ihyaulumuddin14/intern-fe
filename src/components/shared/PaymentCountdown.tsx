'use client'

import { useEffect, useState } from "react"

interface CountdownProps {
  expiryTime: string
}

const PaymentCountdown = ({ expiryTime }: CountdownProps) => {
  const getTimeLeft = () => {
    const expiry = new Date(expiryTime.replace(' ', 'T')).getTime()
    const now = Date.now()
    return Math.max(0, Math.floor((expiry - now) / 1000))
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [expiryTime])

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0')
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')
  const s = (timeLeft % 60).toString().padStart(2, '0')

  const isExpired = timeLeft <= 0

  if (isExpired) {
    return (
      <div className="text-sm text-red-500 font-medium">
        Waktu pembayaran telah habis
      </div>
    )
  }

  return (
    <div className="flex gap-3 items-center">
      {[{ label: 'Jam', value: h }, { label: 'Menit', value: m }, { label: 'Detik', value: s }].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="text-3xl font-bold font-mono bg-muted rounded-lg px-4 py-2 min-w-[64px]">
            {value}
          </div>
          <span className="text-xs text-muted-foreground mt-1">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default PaymentCountdown