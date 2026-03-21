import CardImageDesc from '../components/CardImageDesc'
import Container from '../components/Container'

const careers = [
  {
    title: "Data Analyst",
    description: "Mengolah dan menganalisis data untuk menghasilkan insight yang dapat membantu perusahaan dalam mengambil keputusan.",
    skills: ["SQL", "Python Programming", "Data Analysis"],
    imageSrc: "/assets/data-analyst-career.webp"
  },
  {
    title: "UI/UX Design",
    description: "Merancang tampilan dan pengalaman pengguna pada produk digital agar mudah digunakan, menarik, dan efektif.",
    skills: ["User Research", "Usability Testing", "Wireframing & Prototyping"],
    imageSrc: "/assets/uiux-career.webp"
  },
  {
    title: "Frontend Developer",
    description: "Membangun tampilan dan interaksi pada website atau aplikasi yang berinteraksi langsung dengan pengguna.",
    skills: ["HTML, CSS, JavaScript", "Responsive Design", "Frontend Framework"],
    imageSrc: "/assets/frontend-career.webp"
  },
  {
    title: "Backend Developer",
    description: "Bertugas mengembangkan logika server, database, dan API yang menjadi fondasi dari sebuah aplikasi.",
    skills: ["API Development", "Typescript Programming", "Database Design"],
    imageSrc: "/assets/backend-career.webp"
  },
]

const CareerSection = () => {
  return (
    <section className="w-full py-[clamp(3rem,6vw,6rem)] bg-[#FAFAFA]/98">
      <Container className="flex flex-col gap-10">
        <div className='w-[87%] flex flex-col gap-5'>
          <h2 className='leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl'>Temukan <span className='font-bold font-lora text-primary'>Karier</span> Impianmu</h2>
          <p className='text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal'>
            Jelajahi berbagai pilihan karier di bidang teknologi dan pilih posisi yang ingin kamu persiapkan.
          </p>
        </div>
        <div className='w-full'>
          <ol className='w-full grid grid-cols-[repeat(auto-fill,minmax(292px,1fr))] gap-6'>
            {careers.map(career => (
              <CardImageDesc
                key={career.title}
                title={career.title}
                description={career.description}
                skills={career.skills}
                imageSrc={career.imageSrc}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

export default CareerSection