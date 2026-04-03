'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS } from "../constants"

export default function AppSidebar() {
  const pathname = usePathname()
 
  return (
    <Sidebar
      collapsible="offcanvas"
      className="top-27.5 h-[calc(100vh-72px)]"
    >
      <SidebarContent className="pt-5 pr-5 bg-linear-to-t from-[#B9DDE0] via-85% 85%-[#DCEEEF] to-[#FFFFFF]">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = pathname === href
                return (
                  <SidebarMenuItem key={href} className="list-none">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                      className={cn(
                        "h-11.5 max-w-full font-normal",
                        "rounded-l-none rounded-r-xl shadow-lg/3",
                        "pl-25 pr-4",
                        "text-[20px]  transition-all duration-200 bg-white",
                        !isActive && [
                          "text-neutral-60",
                          "hover:shadow-md",
                        ],
                        isActive && [
                          "text-neutral-100",
                          "hover:bg-primary-hover hover:text-neutral-100",
                        ]
                      )}
                    >
                      <Link href={href} className="flex items-center gap-3 w-full">
                        <span className="truncate">{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}