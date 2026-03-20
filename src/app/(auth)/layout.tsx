import { ReactNode } from 'react'

export default function AuthLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <section className='w-full h-dvh flex justify-center items-center'>
      {children}
    </section>
  )
}
