import { Star1 } from "iconsax-reactjs"

const CardIcon = ({
  title,
  description
}: {
  title: string,
  description: string
}) => {
  return (
    <div className='w-full min-w-73 px-7 py-5 rounded-xl flex flex-col gap-3 bg-background border border-neutral-30'>
      <div className='flex flex-col gap-6'>
        <div className="rounded-full w-fit p-3 border border-neutral-30 text-primary">
          <Star1 size="32" className="p-1"/>
        </div>
        <h3 className="text-2xl font-semibold">{ title }</h3>
      </div>
      <p className="text-xl font-normal">{ description }</p>
    </div>
  )
}

export default CardIcon