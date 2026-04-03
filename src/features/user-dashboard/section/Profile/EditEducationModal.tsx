import { DropdownTrigger } from "@/components/shared/DropdownTrigger"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useUpdateMe } from "@/hooks/users.hooks"
import { cn } from "@/lib/utils"
import { EDUCATION_LEVEL_LABEL, EDUCATION_LEVEL_OPTIONS, EducationCredentials, EducationSchema } from "@/schemas/onboarding.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export function EditEducationModal({
  open,
  onClose,
  defaultValues,
  onSave,
}: {
  open: boolean
  onClose: () => void
  defaultValues: EducationCredentials
  onSave: (data: EducationCredentials) => void
}) {
  const { isPending } = useUpdateMe()
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<EducationCredentials>({
    resolver: zodResolver(EducationSchema),
    mode: "onChange",
    defaultValues,
  })
  
  const educationLevel = watch("educationLevel")
 
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-neutral-800">
            Edit Status Edukasi
          </DialogTitle>
        </DialogHeader>
 
        <Separator />
 
        <form onSubmit={handleSubmit(onSave)} className="w-full">
          <FieldGroup>
            {/* Education level */}
            <Field>
              <FieldLabel>Tingkat Pendidikan</FieldLabel>
              <Controller
                name="educationLevel"
                control={control}
                render={({ field }) => (
                  <DropdownMenu
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <DropdownMenuTrigger
                      asChild
                      tabIndex={1}
                      className="text-start relative cursor-pointer"
                    >
                      <DropdownTrigger
                        value={EDUCATION_LEVEL_LABEL[educationLevel] ?? ""}
                        placeholder="Pilih tingkat pendidikan kamu"
                        isOpen={isOpen}
                      >
                        <ChevronDown className="h-5 w-5 opacity-50" />
                      </DropdownTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-(--radix-dropdown-menu-trigger-width) p-0 rounded-t-none"
                      align="start"
                    >
                      {EDUCATION_LEVEL_OPTIONS.map((level) => (
                        <DropdownMenuItem
                          key={level}
                          className={cn(
                            "px-4 py-4 text-base md:text-lg cursor-pointer transition-colors",
                            "focus:bg-accent focus:text-accent-foreground border-b",
                          )}
                          onSelect={() => field.onChange(level)}
                        >
                          {EDUCATION_LEVEL_LABEL[level]}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              {errors.educationLevel && (
                <FieldError>{errors.educationLevel.message}</FieldError>
              )}
            </Field>
 
            <Field>
              <FieldLabel>Jurusan</FieldLabel>
              <Input
                className="w-full"
                id="major-input"
                placeholder="Jurusan"
                {...register("major")}
                />
              {errors.major && (
                <FieldError>{errors?.major?.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel>Institusi</FieldLabel>
              <Input
                placeholder="Institusi"
                {...register("institution")}
              />
              {errors.institution && (
                <FieldError>{errors?.institution?.message}</FieldError>
              )}
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
                <Button type="submit" className="flex-1" disabled={!isDirty || isPending}>
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