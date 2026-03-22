import CardTextOnly from "../../components/CardTextOnly"
import Container from "../../components/Container"
import { STEP_LIST } from "../../constants"

const StepSection = () => {
  return (
    <section id="assessment-step" className="w-full py-[clamp(3rem,6vw,6rem)] bg-[#FAFAFA]/98">
      <Container className="flex flex-col gap-10">
        <div className='w-[87%] flex flex-col gap-5'>
          <h2 className='leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl'>Kenali Skill Kamu dalam <span className='font-bold font-lora text-primary'>4 Langkah</span> Mudah</h2>
          <p className='text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal'>
            SkillGap membantu kamu menganalisis kesiapan skill, menemukan gap yang perlu diperbaiki, dan memberikan rekomendasi untuk pengembangan karier.
          </p>
        </div>
        <div className='w-full'>
          <ol className='w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-y-10 gap-6'>
            {STEP_LIST.map(step => (
              <CardTextOnly
                key={step.id}
                title={step.stepName}
                description={step.description}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

export default StepSection