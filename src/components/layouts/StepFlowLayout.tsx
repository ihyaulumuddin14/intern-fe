import { ReactNode } from 'react'

const StepFlowLayout = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <section className='w-full h-dvh p-[clamp(12px,5vw,56px)] pt-0 flex flex-col bg-linear-to-b from-gradient-1 via-gradient-2 to-gradient-3'>
      <header className='flex p-[clamp(12px,5vw,30px)] justify-between text-2xl'>
        <h1 className='bg-linear-to-r from-primary-pressed to-primary/50 bg-clip-text text-transparent font-semibold'><span className='font-lora'>Skill</span>Gap</h1>
      </header>
      <main className="sm:mt-10 p-[clamp(12px,5vw,56px)] w-full sm:w-[90vw] h-full mx-auto flex flex-col justify-between items-center bg-white rounded-xl shadow-xl transition-all duration-500 ease-in-out overflow-hidden relative">
        {children}
      </main>
    </section>
  )
}

export default StepFlowLayout