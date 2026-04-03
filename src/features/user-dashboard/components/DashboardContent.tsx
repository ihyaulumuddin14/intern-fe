'use client'

import { useSidebar } from "@/components/ui/sidebar"

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()
  const isExpanded = state === "expanded"
 
  return (
    <div
      className={`
        flex-1 min-h-[calc(100vh-64px)] mt-27.5 transition-all duration-300 ease-in-out
        hidden md:block
      `}
    >
      <div className="p-6 lg:p-8">
        {children}
      </div>
    </div>
  )
}

export function MobileDashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-[calc(100vh-64px)] mt-16 md:hidden">
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}