import { ReactNode } from 'react'

const OnboardingLayout = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <section className='w-full h-dvh p-[clamp(12px,5vw,64px)] flex flex-col justify-between'>
      <header className='flex justify-between text-2xl'>
        <h1>Jitter</h1>
        <div className='invisible sm:visible'>...</div>
      </header>
      {children}
    </section>
  )
}

export default OnboardingLayout