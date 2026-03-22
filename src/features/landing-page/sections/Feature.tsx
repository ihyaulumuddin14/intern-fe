import Container from "../components/Container"


const FeatureSection = () => {
  return (
    <section className="w-full py-[clamp(3rem,6vw,6rem)]">
      <Container className="flex flex-col gap-10">
        <div className='w-[70%] mx-auto flex flex-col gap-5 text-center'>
          <h2 className='leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl'>Fitur <span className='font-bold font-lora text-primary'>Utama</span> untuk Mendukung Perkembangan Skill Kamu</h2>
          <p className='text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal'>
            SkillGap menyediakan berbagai fitur untuk membantu kamu memahami, mengukur, dan meningkatkan skill secara efektif.
          </p>
        </div>
        <div></div>
      </Container>
    </section>
  )
}

export default FeatureSection