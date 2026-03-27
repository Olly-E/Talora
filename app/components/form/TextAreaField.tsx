import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import * as React from "react";
import clsx from "clsx";
import { Label } from "../elements/Label";

interface TextAreaFieldProps {
  id: string;
  placeholder?: string;
  autoFocus?: boolean;
  isRequired?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  hasError: FieldError | undefined;
  className?: string;
  label?: string;
  rows?: number;
  limit?: number | null;
  value?: string;
  labelClassName?: string;
}

export const TextAreaField: React.FunctionComponent<TextAreaFieldProps> = ({
  id,
  placeholder,
  autoFocus = false,
  registration,
  className,
  rows = 5,
  hasError,
  limit,
  value,
  labelClassName,
  isRequired,
  label,
}) => {
  return (
    <div className="w-full">
      <Label className={labelClassName} htmlFor={id} isRequired={isRequired}>
        {label}
      </Label>
      <textarea
        name={id}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={rows}
        className={clsx(
          "w-full py-4 border border-[#E2E2E2] rounded-[5px] bg-white-2 px-4 font-WorkSans outline-none placeholder:text-sm placeholder:text-white/4 focus-within:border-secondary disabled:bg-gray-100",
          hasError && "border-red-500",
          className
        )}
        {...registration}
        maxLength={limit ? limit : undefined}
      />
      {!!limit && (
        <div className="mt-2 flex justify-between text-xs">
          <p className="text-gray-150">Max. {limit} characters</p>
          <p className="text-info-100">
            {value?.length || 0} / {limit}
          </p>
        </div>
      )}
    </div>
  );
};
