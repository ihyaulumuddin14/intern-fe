import Image from 'next/image'
import React from 'react'

const CardWithImage = ({
  imagePosition = "left",
  imageSrc,
  title,
  description
}: {
  imagePosition: "right" | "left",
  imageSrc: string,
  title: string,
  description: string
}) => {
  return (
    <div className='bg-background w-full max-w-152 grid grid-cols-1 xs:grid-cols-2 rounded-xl overflow-hidden'>
      <div className='w-full overflow-hidden relative'>
        <Image src={imageSrc} alt='' fill/>
      </div>
      <div></div>
    </div>
  )
}

export default CardWithImage