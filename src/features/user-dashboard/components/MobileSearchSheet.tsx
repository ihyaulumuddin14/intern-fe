import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import CareerSearchInput from "./CareerSearchInput"
import { Career } from "@/types/entities.type"
import CreateCareerSessionModal from "@/components/shared/CreateCareerSessionModal"

export default function MobileSearchSheet() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
  const [openModal, setOpenModal] = useState(false)
 
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [open])
 
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-12 h-12 sm:w-15 sm:h-15 rounded-full hover:bg-neutral-30 transition-colors text-neutral-500"
        aria-label="Buka pencarian"
      >
        <Search size={20} />
      </button>
 
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="top" className="pt-6 pb-8 px-6">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-lg font-semibold text-neutral-800">
              Cari Rekomendasi Skill
            </SheetTitle>
          </SheetHeader>
          <CareerSearchInput
            inputRef={inputRef}
            onSelect={(career) => {
              setSelectedCareer(career)
              setOpenModal(true)
            }}
          />
        </SheetContent>
      </Sheet>

      <CreateCareerSessionModal
        open={openModal}
        onOpenChange={setOpenModal}
        career={selectedCareer}
      />
    </>
  )
}