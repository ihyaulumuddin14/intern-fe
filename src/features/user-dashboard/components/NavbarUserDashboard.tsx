'use client'

import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User } from "iconsax-reactjs"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import MobileSearchSheet from "./MobileSearchSheet"
import ProfilePopup from "./ProfilePopup"

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false)
 
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40 flex items-center justify-between px-25 py-3 md:py-6 max-lg:px-10 max-md:px-6 max-sm:px-7 shadow-lg/3">
      {/* hamburger + logo */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <Link href="/" className="select-none">
          <h1 className="bg-linear-to-r from-primary-pressed via-60% to-[#37B7C399] bg-clip-text text-2xl xl:text-[32px] text-transparent font-semibold">
            <span className="font-lora">Skill</span>Gap
          </h1>
        </Link>
      </div>
 
      {/* search bar desktop only */}
      <div className="flex-1 max-w-sm mx-8 hidden md:block">
        <Input
          type="text"
          placeholder="Cari rekomendasi skill"
          leftIcon={<Search size={16} />}
          className=""
        />
      </div>
 
      {/* mobile search icon + profile */}
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <MobileSearchSheet />
        </div>
 
        <div className="relative">
          <button
            onClick={() => setProfileOpen(open => !open)}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12.5 md:h-12.5 rounded-full border-2 border-black flex items-center justify-center text-black hover:border-neutral-400 hover:text-neutral-600 transition-all duration-200 overflow-hidden"
            aria-label="Profile menu"
          >
            <User className="size-8 sm:size-10 md:size-12.5" />
          </button>
          {profileOpen && <ProfilePopup onClose={() => setProfileOpen(false)} />}
        </div>
      </div>
    </header>
  )
}