"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInput = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<FormInput>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const router = useRouter();

  const onSubmit = async ({ name, email, password }: FormInput) => {
    setErrorMessage(undefined);
    const result = await registerUser(name, email, password);

    if (!result.ok) {
      setErrorMessage(result!.message);
      return;
    }

    const resultLogin = await login(email.toLocaleLowerCase(), password);

    if (!resultLogin.ok) {
      setErrorMessage(resultLogin!.message);
      return;
    }

    router.replace("/");
  };

  const errors = formState?.errors;
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Nombre Completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.name,
        })}
        type="text"
        autoComplete="off"
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Correo electronico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
        autoComplete="off"
      />
      <label htmlFor="email">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        autoComplete="off"
        {...register("password", { required: true })}
      />
      {errorMessage && (
        <span className="text-red-500 mb-2">{errorMessage}</span>
      )}
      <button type="submit" className="btn-primary">
        Crear cuenta
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
