import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autentikasi | SkillGap",
  description:
    "Masuk atau daftar ke SkillGap untuk memulai diagnosis kesiapan karier dan dapatkan rekomendasi pengembangan kompetensi yang dipersonalisasi.",
  keywords: ["login", "register", "autentikasi", "pendaftaran"],
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full h-dvh flex justify-center items-center">
      {children}
    </section>
  );
}
