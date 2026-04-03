'use client'

import { useLogout } from "@/hooks/auth.hooks"
import { useUser } from "@/hooks/users.hooks"
import { Logout } from "iconsax-reactjs"
import { useEffect, useRef } from "react"

export default function ProfilePopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { user } = useUser()
  const { mutate: mutateLogout, isPending } = useLogout()
 
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [onClose])
 
  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] w-60 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="px-5 py-4 border-b border-rose-50">
        <p className="text-sm font-semibold text-neutral-800">{user?.fullName}</p>
        <p className="text-xs text-neutral-400 mt-0.5 truncate">{user?.email}</p>
      </div>

      <button
        className="w-full cursor-pointer flex items-center gap-3 px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150"
        onClick={() => mutateLogout()}
      >
        <Logout size={16} />
        {isPending ? "Keluar..." : "Keluar"}
      </button>
    </div>
  )
}