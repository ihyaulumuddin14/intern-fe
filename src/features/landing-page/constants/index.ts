export const NAVBAR_LINKS = [
  {id: 1, label: "Beranda", href: "#home"},
  {id: 2, label: "Tentang", href: "#about"},
  {id: 3, label: "Karier", href: "#career"},
  {id: 4, label: "Asssessment", href: "#assessment-step"},
  {id: 5, label: "Fitur", href: "#feature"},
]

export const CAREER_LIST = [
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

export const PROBLEM_LIST = [
  {
    title: "Kurang Informasi Skill Industri",
    description:
      "Mahasiswa sering tidak mengetahui skill apa saja yang sebenarnya dibutuhkan oleh industri untuk posisi tertentu.",
  },
  {
    title: "Tidak Tahu Tingkat Kesiapan Diri",
    description:
      "Mahasiswa belum memahami seberapa siap kemampuan mereka untuk melamar posisi yang diinginkan.",
  },
  {
    title: "Tidak Menyadari Skill Gap",
    description:
      "Perbedaan antara skill yang dimiliki dan yang dibutuhkan industri sering tidak disadari sejak awal.",
  },
  {
    title: "Terlambat Menyadari Skill Gap",
    description:
      "Banyak mahasiswa baru menyadari kekurangan skill mereka ketika akan melamar magang atau pekerjaan.",
  },
];

export const STEP_LIST = [
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

export const FEATURE_LIST = [
  {
    imagePosition: "left",
    imageSrc: "/assets/skill-assessment.webp",
    title: "Skill Assessment",
    description: "Mengidentifikasi skill yang sudah dimiliki melalui self assessment."
  },
  {
    imagePosition: "left",
    imageSrc: "/assets/skill-quiz.webp",
    title: "Skill Quiz",
    description: "Menguji kemampuan melalui kuis skill untuk mengukur pemahaman."
  },
  {
    imagePosition: "right",
    imageSrc: "/assets/skillgap-analysis.webp",
    title: "Skill Gap Analysis",
    description: "Menganalisis perbedaan antara skill kamu dan kebutuhan industri."
  },
  {
    imagePosition: "right",
    imageSrc: "/assets/skill-assessment.webp",
    title: "Learning Recommendation",
    description: "Memberikan rekomendasi skill yang perlu dipelajari untuk kesiapan karier."
  },
]