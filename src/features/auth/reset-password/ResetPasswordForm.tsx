"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/auth.hooks";
import { ResetPasswordCredentials, ResetPasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordCredentials>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      token: token || ""
    },
  });
  const { mutate, isPending } = useResetPassword()

  const handleResetPasswordSubmit = (credentials: ResetPasswordCredentials) => {
    mutate(credentials)
  };

  return (
    <form
      action=""
      className="w-full"
      onSubmit={handleSubmit(handleResetPasswordSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="new-password">Masukkan kata sandi baru kamu</FieldLabel>
          <Input
            {...register("newPassword")}
            id="new-password"
            type="password"
            placeholder="••••••••"
          />
          {errors.newPassword && (
            <FieldError>{errors.newPassword.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            size="lg"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Mengubah..." : "Ubah kata sandi"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
