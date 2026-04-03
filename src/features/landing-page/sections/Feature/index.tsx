import CardWithImage from "../../components/CardWithImage"
import Container from "../../components/Container"
import { FEATURE_LIST } from "../../constants"

const FeatureSection = () => {
  return (
    <section id="feature" className="w-full py-[clamp(3rem,6vw,6rem)]">
      <Container className="flex flex-col gap-10">
        <div className='w-[70%] mx-auto flex flex-col gap-5 text-center'>
          <h2 className='leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl'>Fitur <span className='font-bold font-lora text-primary'>Utama</span> untuk Mendukung Perkembangan Skill Kamu</h2>
          <p className='text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal'>
            SkillGap menyediakan berbagai fitur untuk membantu kamu memahami, mengukur, dan meningkatkan skill secara efektif.
          </p>
        </div>
        <div className="w-full">
          <ul className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-y-10 gap-6">
            {FEATURE_LIST.map(feature => (
              <CardWithImage
                key={feature.title}
                imageSrc={feature.imageSrc}
                imagePosition={feature.imagePosition}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default FeatureSection