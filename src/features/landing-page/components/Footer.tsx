import Link from 'next/link'
import Container from './Container'

const Footer = () => {
  return (
    <footer className='w-[97.2vw] max-w-350 h-fit py-[clamp(3rem,6vw,6rem)] bg-primary-hover rounded-t-3xl mx-auto text-primary-foreground'>
      <Container className='flex flex-col gap-15'>
        {/* UPPER */}
        <div className='flex flex-col gap-8 lg:flex-row justify-between'>
          {/* PRODUCT INFO */}
          <div className='w-full max-w-100 lg:max-w-73 flex flex-col gap-6'>
            <h2 className='text-2xl xl:text-[32px] font-semibold'><span className='font-lora'>Skill</span>Gap</h2>
            <p className='w-full leading-normal font-normal'>Website diagnosis kesiapan karier dengan fitur unggulan dan memberikan rekomendasi pengembangan kompetensi.</p>
          </div>

          {/* SHORTCUT NAVIGATION */}
          <div className='w-fit flex flex-wrap gap-10 leading-normal font-medium text-sm md:text-base'>
            <ol className='flex-1 w-full min-w-46.5 flex flex-col gap-5'>
              <h3 className='text-md md:text-lg'>Menu</h3>
              <Link href={"#about"}>Tentang</Link>
              <Link href={"#career"}>Karier</Link>
              <Link href={"#assessment-step"}>Assessment</Link>
              <Link href={"#feature"}>Fitur</Link>
            </ol>
            <ol className='flex-1 w-full min-w-46.75 flex flex-col gap-5'>
              <h3 className='text-md md:text-lg'>Fitur</h3>
              <Link href={"#"}>Skill Self-Assessment</Link>
              <Link href={"#"}>Skill Quiz</Link>
              <Link href={"#"}>Skill Gap Analysis</Link>
              <Link href={"#"}>Learning Recomendation</Link>
            </ol>
            <ol className='flex-1 w-full min-w-73 flex flex-col gap-5'>
              <h3 className='text-md md:text-lg'>Contact Info</h3>
              <Link href={"#"}>skillgap@space.id</Link>
              <Link href={"#"}>(62) 8123456789</Link>
              <Link href={"#"}>East Java, Indonesia</Link>
            </ol>
          </div>
        </div>


        {/* FOOTER BAR */}
        <div className='w-full min-h-[45.5px] border-t flex items-end py-3 sm:py-0'>
          <div className='w-full h-fit text-sm flex flex-wrap gap-2'>
            <div className='flex-1 min-w-fit justify-start font-normal'>&copy; 2026 SkillGap. All right reserved.</div>
            <ul className='flex-1 justify-end flex gap-8 font-medium'>
              <Link href={"#"}>Privacy</Link>
              <Link href={"#"}>Security</Link>
              <Link href={"#"}>Terms</Link>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer