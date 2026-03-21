import CardTextOnly from '../components/CardTextOnly'
import Container from '../components/Container'

const steps = [
  {
    id: 1,
    stepName: "Pilih Target Karier",
    description: "Pengguna memilih karier yang ingin dicapai, seperti Data Analyst, UI/UX Designer, atau Frontend Developer."
  },
  {
    id: 2,
    stepName: "Skill Self-Assessment",
    description: "Menilai kemampuan yang sudah dimiliki pada berbagai skill yang relevan dengan karier yang dipilih dan membantu mengidentifikasi tingkat pemahaman awal."
  },
  {
    id: 3,
    stepName: "Mengerjakan Quiz Skill",
    description: "Mengerjakan quiz untuk menguji kemampuan secara objektif dan hasilnya digunakan untuk memberikan gambaran akurat mengenai tingkat penguasaan skill."
  },
  {
    id: 4,
    stepName: "Lihat Skill Gap & Rekomendasi",
    description: "Perbandingan antara skill pengguna dan kebutuhan industri dan akan mendapatkan rekomendasi skill yang perlu dipelajari untuk meningkatkan kesiapan karier."
  }
]

const StepSection = () => {
  return (
    <section className="w-full py-[clamp(3rem,6vw,6rem)] bg-[#FAFAFA]/98">
      <Container className="flex flex-col gap-10">
        <div className='w-[87%] flex flex-col gap-5'>
          <h2 className='leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl'>Kenali Skill Kamu dalam <span className='font-bold font-lora text-primary'>4 Langkah</span> Mudah</h2>
          <p className='text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal'>
            SkillGap membantu kamu menganalisis kesiapan skill, menemukan gap yang perlu diperbaiki, dan memberikan rekomendasi untuk pengembangan karier.
          </p>
        </div>
        <div className='w-full'>
          <ol className='w-full grid grid-cols-[repeat(auto-fill,minmax(608px,1fr))] gap-6'>
            {steps.map(step => (
              <CardTextOnly
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