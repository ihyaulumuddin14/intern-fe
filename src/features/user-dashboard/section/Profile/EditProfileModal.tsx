import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useUpdateMe } from "@/hooks/users.hooks"
import { ProfileCredentials, ProfileSchema } from "@/schemas/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, User } from "iconsax-reactjs"
import { useForm } from "react-hook-form"

export function EditProfileModal({
  open,
  onClose,
  defaultValues,
  onSave,
}: {
  open: boolean
  onClose: () => void
  defaultValues: {
    fullName: string,
    email: string
  }
  onSave: (data: ProfileCredentials) => void
}) {
  const { isPending } = useUpdateMe()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileCredentials>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: defaultValues.fullName || ""
    },
  })
 
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-neutral-800">
            Edit Profil
          </DialogTitle>
        </DialogHeader>
 
        <Separator />
 
        {/* Avatar upload area */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-neutral-100 border-2 border-neutral-200 overflow-hidden flex items-center justify-center">
              <User size={32} className="text-neutral-400" />
            </div>
          </div>
        </div>
 
        <form onSubmit={handleSubmit(onSave)} className="w-full">
          <FieldGroup>
            <Field>
              <FieldLabel>Nama Lengkap</FieldLabel>
              <Input
                {...register("fullName")}
                placeholder="Masukkan nama lengkap"
              />
              {errors && (
                <FieldError>{errors?.fullName?.message}</FieldError>
              )}
            </Field>
 
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                disabled
                value={defaultValues.email}
                type="email"
                placeholder="Masukkan email"
              />
            </Field>
 
            <Field>
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                >
                  Batal
                </Button>
                <Button type="submit" className="flex-1" disabled={isPending || !!errors?.fullName?.message}>
                  { isPending ? "Menyimpan..." : "Simpan" }
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}