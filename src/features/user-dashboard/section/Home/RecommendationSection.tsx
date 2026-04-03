import { ArrowRight } from "iconsax-reactjs"

const RECOMMENDED = [
  {
    title: "SQL",
    desc: "Bahasa query yang digunakan untuk mengambil, memfilter, dan mengelola data dari database relasional.",
  },
  {
    title: "Python Programming",
    desc: "Bahasa pemrograman yang sering digunakan untuk analisis data, otomatisasi, dan pengolahan data.",
  },
  {
    title: "Statistics",
    desc: "Pemahaman konsep statistik untuk menganalisis dan menafsirkan data.",
  },
]

export function RecommendedationSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl text-neutral-800">
        Direkomendasikan Untukmu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RECOMMENDED.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border-l-6 border-primary-pressed shadow-xs p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="font-semibold text-neutral-800 text-base">{item.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed flex-1">{item.desc}</p>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-150">
              Mulai Belajar <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}