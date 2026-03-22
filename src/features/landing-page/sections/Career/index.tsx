import CardImageDesc from "../../components/CardImageDesc"
import Container from "../../components/Container"
import { CAREER_LIST } from "../../constants"

const CareerSection = () => {
  return (
    <section id="career" className="w-full py-[clamp(3rem,6vw,6rem)] bg-[#FAFAFA]/98">
      <Container className="flex flex-col gap-10">
        <div className='w-[87%] flex flex-col gap-5'>
          <h2 className='leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl'>Temukan <span className='font-bold font-lora text-primary'>Karier</span> Impianmu</h2>
          <p className='text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal'>
            Jelajahi berbagai pilihan karier di bidang teknologi dan pilih posisi yang ingin kamu persiapkan.
          </p>
        </div>
        <div className='w-full'>
          <ul className='w-full grid grid-cols-[repeat(auto-fill,minmax(292px,1fr))] gap-6'>
            {CAREER_LIST.map(career => (
              <CardImageDesc
                key={career.title}
                title={career.title}
                description={career.description}
                skills={career.skills}
                imageSrc={career.imageSrc}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default CareerSection