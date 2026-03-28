"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth.hooks";
import { LoginCredentials, LoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { mutate, isPending } = useLogin()

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    mutate(credentials)
  };

  return (
    <form
      action=""
      className="w-full"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
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
          <FieldLabel>Kata sandi</FieldLabel>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field orientation="horizontal" className="my-2">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="rememberMe"
                name="rememberMe"
              />
            )}
          >
          </Controller>
          <FieldLabel
            htmlFor="rememberMe"
            className="cursor-pointer"
          >
            Ingat saya?
          </FieldLabel>
          <Link href={"/forgot-password"} replace className="underline-offset-4 text-sm underline text-primary hover:text-primary-hover ml-auto">
            Lupa password?
          </Link>
        </Field>
        <Field>
          <Button
            size="lg"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Mengirim..." : "Login"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
