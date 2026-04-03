'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCreateCareerSession } from "@/hooks/career-sessions.hooks"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { Career } from "@/types/entities.type"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  career: Career | null
}

export default function CreateCareerSessionModal({
  open,
  onOpenChange,
  career,
}: Props) {
  const router = useRouter()
  const { mutate: createCareerSession, isPending } = useCreateCareerSession()

  const handleCreate = () => {
    if (!career) return

    toast.loading("Membuat sesi karir...")

    createCareerSession(
      { careerId: career.id },
      {
        onSuccess: (data) => {
          toast.dismiss()
          toast.success(data.message)

          const careerSessionId = data.data.careerSessionId
          router.push(`/assessment/${careerSessionId}/self`)
        },
        onError: (error) => {
          toast.dismiss()

          toast.error(
            error instanceof AxiosError
              ? error.response?.data?.message || "Terjadi kesalahan sistem"
              : (error as Error).message
          )

          router.replace("/dashboard")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Mulai Karir Baru
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <p className="text-sm text-neutral-600">
            Kamu akan memulai sesi karir sebagai:
          </p>

          <div className="p-4 rounded-xl border">
            <p className="font-semibold text-neutral-800">
              {career?.name}
            </p>
            <p className="text-sm text-neutral-500">
              {career?.description}
            </p>
          </div>

          <p className="text-xs text-neutral-500">
            Kamu akan diarahkan ke proses assessment setelah ini.
          </p>
        </div>

        <DialogFooter className="mt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>

          <Button
            onClick={handleCreate}
            disabled={isPending}
          >
            {isPending ? "Memproses..." : "Mulai Sekarang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}