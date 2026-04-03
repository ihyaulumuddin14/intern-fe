'use client'

import { useUser } from "@/hooks/users.hooks"

export function HeroBanner() {
  const { user } = useUser()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-7 md:px-8 md:py-8 text-white"> 
      <h1 className="text-xl md:text-2xl font-bold leading-snug max-w-xs md:max-w-md">
        Halo {user?.fullName}, selamat datang kembali di SkillGap!
      </h1>
      <p className="mt-2 text-sm md:text-base text-white/75 max-w-lg md:max-w-xl leading-relaxed">
        Siap untuk melangkah lebih jauh hari ini? Mari terus kembangkan skill-mu dan raih karier impian sebagai{" "}
        {/* <span className="font-semibold text-white">{USER.career}</span>. */}
      </p>
    </div>
  )
}