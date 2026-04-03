import { ReactNode } from 'react'

const CardContainer = ({
  children,
  title
}: {
  children: ReactNode,
  title: string
}) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-5 overflow-hidden">
      <p className="text-base font-normal text-primary-hover">
        { title }
      </p>
 
      {children}
    </div>
  )
}

export default CardContainer