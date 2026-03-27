"use client";
import * as Checkbox from "@radix-ui/react-checkbox";
import React from "react";
import clsx from "clsx";
import {
  Controller,
  UseControllerProps,
  UseFormRegisterReturn,
} from "react-hook-form";

type FormCheckboxProps = {
  label?: string;
  labelClass?: string;
  errorMessage?: string;
  id: string;
  handleOnChange?: (e: unknown) => void;
  registration?: Partial<UseFormRegisterReturn>; // Make registration optional
} & UseControllerProps;

const FormCheckbox = ({
  label,
  labelClass,
  id,
  name, // The 'name' prop is part of UseControllerProps
  control,
  handleOnChange,
  registration, // Keep for backward compatibility
}: FormCheckboxProps) => {
  // If 'control' is provided, use the Controller. This is the modern way.
  if (control) {
    return (
      <div>
        <Controller
          // Use the 'name' prop if it exists, otherwise fall back to 'id'.
          // This makes the component backward compatible.
          name={name || id}
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <div className="flex items-center">
                <Checkbox.Root
                  checked={!!value}
                  onCheckedChange={(e: boolean) => {
                    if (handleOnChange) {
                      handleOnChange(e);
                    }
                    onChange(e);
                  }}
                  className={clsx(
                    "flex size-[20px] appearance-none items-center justify-center rounded ",
                    value
                      ? "bg-primary text-black"
                      : "bg-transparent border border-black/20"
                  )}
                  id={id}
                >
                  <Checkbox.Indicator className="text-black bg-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </Checkbox.Indicator>
                </Checkbox.Root>
                {label && (
                  <label
                    className={clsx(
                      "pl-[15px] text-[15px] leading-none text-black",
                      labelClass
                    )}
                    htmlFor={id}
                  >
                    {label}
                  </label>
                )}
              </div>
            );
          }}
        />
      </div>
    );
  }

  // Fallback for older forms that only use the registration prop
  return (
    <div className="flex items-center">
      <input type="checkbox" id={id} {...registration} />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default FormCheckbox;
