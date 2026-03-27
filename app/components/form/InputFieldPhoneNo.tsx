"use client";
import { Controller, FieldError, UseControllerProps } from "react-hook-form";
import { CountryCode } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import clsx from "clsx";

import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../elements/Label";

type InputFieldPhoneNoProps = {
  label?: string;
  className?: string;
  hasError: FieldError | undefined;
  defaultCountry?: CountryCode | undefined;
  errorMessage?: string | undefined;
  isRequired?: boolean;
  labelClass?: string;
} & UseControllerProps;

export const InputFieldPhoneNo: React.FC<InputFieldPhoneNoProps> = ({
  label,
  defaultValue,
  className,
  defaultCountry = "US",
  isRequired,
  control,
  hasError,
  errorMessage,
  name,
  labelClass,
}) => {
 
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="w-full">
            {!!label && (
              <Label
                htmlFor={name}
                isRequired={isRequired}
                className={labelClass}
              >
                {label}
              </Label>
            )}
            <PhoneInput
              className={clsx(
                "bg-[#434343] h-10 w-full appearance-none bg-transparent border font-WorkSans px-4 placeholder:text-gray-250 rounded-[5px]",
                hasError ? "border-red-500" : "border border-[#444444]/20",
                className
              )}
              id={name}
              defaultCountry={defaultCountry}
              {...field}
              value={defaultValue}
              onChange={(newValue) => field.onChange(newValue)}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
        )}
      />
    </>
  );
};
