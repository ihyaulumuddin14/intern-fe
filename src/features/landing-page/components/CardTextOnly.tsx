
const CardTextOnly = ({
  title,
  description
}: {
  title: string,
  description: string
}) => {
  return (
    // <div className='w-full max-w-151 bg-background rounded-xl py-6 px-10.5 flex flex-col gap-4 leading-normal shadow-md'>
    <div className='w-full bg-background rounded-xl py-6 px-10.5 flex flex-col gap-4 leading-normal shadow-md'>
      <h3 className='font-lora font-medium text-[32px]'>{ title }</h3>
      <p className='font-normal text-xl text-neutral-70'>{ description }</p>
    </div>
  )
}

export default CardTextOnly