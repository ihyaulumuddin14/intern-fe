"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/auth.hooks";
import { ForgotPasswordCredentials, ForgotPasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordCredentials>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: ""
    },
  });
  const { mutateAsync, isPending } = useForgotPassword()

  const handleForgotPasswordSubmit = async (credentials: ForgotPasswordCredentials) => {
    await mutateAsync(credentials).then(() => reset({ email: "" })).catch(() => {})
  };

  return (
    <form
      action=""
      className="w-full"
      onSubmit={handleSubmit(handleForgotPasswordSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Masukkan email yang kamu daftarkan di SkillGap</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Masukkan alamat email kamu"
          />
          {errors.email && (
            <FieldError>{errors.email.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            size="lg"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Mengirim..." : "Kirim link reset"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ForgotPassword;
