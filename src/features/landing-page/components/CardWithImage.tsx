import Image from 'next/image'

const CardWithImage = ({
  imagePosition = "left",
  imageSrc,
  title,
  description
}: {
  imagePosition: string,
  imageSrc: string,
  title: string,
  description: string
}) => {
  const isLeft = imagePosition === "left"
 
  return (
    <li
      className={`
        bg-background w-full rounded-md overflow-hidden shadow-md
        flex flex-col
        xs:grid xs:grid-cols-2
        ${isLeft ? '' : 'xs:[direction:rtl]'}
      `}
    >
      <div className="w-full xs:h-full h-48 overflow-hidden relative xs:[direction:ltr] aspect-square">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
 
      <div className={`
        flex flex-col justify-center gap-4 p-5
        xs:[direction:ltr]
      `}>
        <h3 className="font-lora font-medium italic text-2xl sm:text-[32px] text-neutral-100">
          {title}
        </h3>
        <p className="text-lg sm:text-[20px] text-neutral-70 leading-relaxed">
          {description}
        </p>
      </div>
    </li>
  )
}

export default CardWithImage