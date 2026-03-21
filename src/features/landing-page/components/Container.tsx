import { ReactNode } from 'react'

const Container = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div id='container' className='w-full px-[clamp(1.25rem,5vw,5rem)]'>
      <div id='wrapper' className='w-full max-w-310 mx-auto'>
        { children }
      </div>
    </div>
  )
}

export default Container