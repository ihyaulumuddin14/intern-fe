'use client'

import { Button } from "@/components/ui/button"
import Error from "next/error"

const ErrorPage = ({
  error,
  unstable_retry
}: {
  error: Error & { digest?: string },
  unstable_retry: () => void
}) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h3 className='text-5xl sm:text-6xl md:text-7xl font-lora text-primary font-bold leading-relaxed'>
        Oops..
      </h3>
      <p className='max-w-md mb-8 text-sm sm:text-base leading-tight text-center flex flex-col gap-1'>
        Terjadi kesalahan <br />
        <span className="text-neutral-50">Tip: Coba refresh atau ulangi sekali lagi</span>
      </p>
      <Button size="lg" onClick={() => unstable_retry()}>
        Segarkan
      </Button>
    </div>
  )
}

export default ErrorPage