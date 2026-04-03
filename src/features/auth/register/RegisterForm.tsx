"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/auth.hooks";
import { RegisterCredentials, RegisterSchema } from "@/schemas/auth.schema";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const { mutate: mutateRegister, isPending: isPendingRegister } = useRegister();
  const { formStore } = useOnboardingFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleRegisterSubmit = async (credentials: RegisterCredentials) => {
    const credentialsWithCallbackUrl = {
      ...credentials,
      callbackUrl: encodeURIComponent(searchParams.get("callbackUrl") || ""),
    };
    mutateRegister(credentialsWithCallbackUrl)  
  };

  return (
    <>
      <form
        action=""
        className="w-full"
        onSubmit={handleSubmit(handleRegisterSubmit)}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fullName">Nama Lengkap</FieldLabel>
            <Input
              {...register("fullName")}
              id="fullName"
              type="text"
              placeholder="Masukkan nama kamu"
              {...(formStore.fullName ? { defaultValue: formStore.fullName } : {})}
              />
            {errors.fullName && (
              <FieldError>{errors.fullName.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Masukkan alamat email kamu"
              />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Kata sandi</FieldLabel>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
            />
            <FieldDescription>Kata sandi minimal 8 karakter</FieldDescription>
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>
          <Field>
            <Button
              size="lg"
              disabled={isPendingRegister}
              type="submit"
            >
              {isPendingRegister ? "Mengirim..." : "Daftar"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <EmailSentAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default RegisterForm;

const EmailSentAlert = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [countRedirect, setCountRedirect] = useState(30);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return
    setCountRedirect(30);

    const interval = setInterval(() => {
      setCountRedirect((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.replace("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) router.replace("/login");
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="w-full flex flex-col items-center gap-5">
              <Send size={70} />
              <h1 className="text-center text-2xl font-semibold">
                Tautan verifikasi telah terkirim
              </h1>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <>
              Akun kamu berhasil terdaftar, silakan cek email kamu untuk dapat
              melakukan verifikasi akun. Kamu akan diarahkan kembali ke Login
              secara otomatis dalam ({countRedirect}) detik.
            </>
          </AlertDialogDescription>
          <AlertDialogFooter className="my-3 w-full">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Tutup
            </Button>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
