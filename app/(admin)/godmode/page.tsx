"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { LoginPayload } from "@/app/features/admin/auth/types";
import { useVerifyAuth } from "@/app/features/admin/auth/api";
import { InputField } from "@/app/components/form/InputField";
import { Button } from "@/app/components/elements/Button";
import { useLogin } from "@/app/features/admin/auth/api";

export default function GodmodePage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { data: authStatus, isLoading: isCheckingAuth } = useVerifyAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  useEffect(() => {
    if (!isCheckingAuth && authStatus?.authenticated) {
      router.push("/godmode/dashboard");
    }
  }, [isCheckingAuth, authStatus, router]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: LoginPayload) => {
    login(data);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (authStatus?.authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Godmode Access
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="admin@talora.com"
              registration={register("email", {
                required: "Email is required",
              })}
              hasError={errors.email}
              isRequired
            />
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              registration={register("password", {
                required: "Password is required",
              })}
              hasError={errors.password}
              handleShowPassword={handleTogglePassword}
              withIcon
              isRequired
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
