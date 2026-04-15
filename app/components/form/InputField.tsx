"use client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeSlash } from "iconsax-react";
import React from "react";
import clsx from "clsx";

import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../elements/Label";

interface InputFieldProps {
  type?: "text" | "number" | "email" | "password";
  label?: string;
  className?: string;
  placeholder?: string;
  iconPosition?: "start" | "end";
  icon?: React.ReactNode;
  isDisabled?: boolean;
  hasError: FieldError | undefined;
  withIcon?: boolean;
  canPressSpace?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  handleShowPassword?: () => void;
  min?: string;
  max?: string;
  value?: string | number;
  isRequired?: boolean;
  errorMessage?: string | undefined;
  inputHint?: boolean;
  inputHintText?: string;
  labelClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  icon,
  label,
  hasError,
  className,
  placeholder,
  registration,
  withIcon = false,
  iconPosition = "end",
  canPressSpace = true,
  handleShowPassword,
  min,
  max,
  value,
  isDisabled = false,
  isRequired,
  errorMessage,
  inputHint = false,
  inputHintText,
  labelClassName,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const { name } = registration;

  return (
    <div className="w-full">
      {!!label && (
        <Label
          className={labelClassName}
          infoHint={inputHint}
          infoHintText={inputHintText}
          htmlFor={name}
          isRequired={isRequired}
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          className={clsx(
            "h-[38px] rounded-[5px] disabled:cursor-not-allowed w-full border border-[#444444]/20 font-WorkSans px-4 bg-white-2 outline-none placeholder:text-sm text-black placeholder:text-gray-4/50 placeholder:font-light disabled:bg-gray-100",
            hasError ? "border-red-500" : "",
            className,
          )}
          type={type}
          disabled={isDisabled}
          name={name}
          value={value}
          id={name}
          placeholder={placeholder}
          onKeyDown={canPressSpace ? undefined : handleKeyDown}
          min={min}
          max={max}
          {...registration}
        />
        {withIcon && (
          <span
            className={clsx(
              "absolute inset-y-0 flex items-center",
              iconPosition === "start" ? "left-0" : "right-0",
            )}
          >
            {handleShowPassword ? (
              <button
                type="button"
                onClick={handleShowPassword}
                title={type === "text" ? "Hide password" : "Show password"}
                className="focus:shadow-outline p-3 focus:outline-none"
              >
                {type === "password" ? (
                  <>
                    <EyeSlash size="16" color="#9EA4AC" />
                    <span className="sr-only">Show password</span>
                  </>
                ) : (
                  <>
                    <Eye size="16" color="#9EA4AC" />
                    <span className="sr-only">Hide password</span>
                  </>
                )}
              </button>
            ) : (
              <span className="p-1">{icon}</span>
            )}
          </span>
        )}
      </div>
      {hasError && <ErrorMessage>{hasError.message}</ErrorMessage>}
    </div>
  );
};
