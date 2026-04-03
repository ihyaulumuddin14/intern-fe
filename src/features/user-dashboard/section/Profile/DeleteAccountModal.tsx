import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteMe } from "@/hooks/users.hooks"
import { MessageSquareWarning } from "lucide-react"

export function DeleteAccountModal({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const { mutate, isPending } = useDeleteMe()
  const handleDeleteUser = () => mutate()

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader className='w-full flex flex-col justify-center items-center'>
          <MessageSquareWarning size={40} className='my-7 mx-auto'/>
          <AlertDialogTitle className='text-2xl font-bold text-center mx-auto'>
              Yakin ingin menghapus akun?
          </AlertDialogTitle>
          <AlertDialogDescription className='my-3 text-center'>Perhatian: Ketika kamu menghapus akun, kamu tidak dapat mengurungkan aksi dan mengembalikan akun yang telah terdaftar. Mohon berhati-hati.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='w-full h-fit flex flex-col sm:flex-col'>
          <Button
            onClick={handleDeleteUser}
            variant={"destructive"}
            className="w-full"
          >
            { isPending ? "Menghapus akun..." : "Hapus Akun" }
          </Button>
          <AlertDialogCancel className='w-full'>
            Kembali
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}