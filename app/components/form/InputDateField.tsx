"use client";
import { Controller, FieldError, UseControllerProps } from "react-hook-form";
import DatePicker, { DatePickerProps } from "react-datepicker";
import React from "react";
import clsx from "clsx";
import { Label } from "../elements/Label";

// import dayjs from 'dayjs'

type ReactDatePickPropsWithoutOnChange = Omit<DatePickerProps, "onChange">;

type InputDateFieldProps = {
  name: string;
  label?: string;
  className?: string;
  showErrorMessage?: boolean;
  placeholder?: string;
  hasError: FieldError | undefined;
  value?: string;
  isRequired?: boolean;
} & ReactDatePickPropsWithoutOnChange &
  UseControllerProps;

export const InputDateField: React.FC<InputDateFieldProps> = ({
  name,
  label,
  hasError,
  className,
  placeholder = "Select date",
  dateFormat = "MMMM d, yyyy",
  isRequired,
  showErrorMessage = false,
  control,
  ...props
}) => {
  return (
    <>
      {!!label && (
        <Label htmlFor={name} isRequired={isRequired}>
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) => (
          //@ts-expect-error - DatePickerProps is not assignable to DatePicker will check why and get back
          <DatePicker
            className={clsx(
              "h-10 w-full shadow-sm rounded-[4px] border border-gray-300 bg-transparent px-4 outline-none placeholder:text-sm  focus-within:border-primary-200 transition-colors duration-300 disabled:bg-gray-100",
              hasError && "border-red-500",
              className
            )}
            // formatWeekDay={(day) => dayjs(day).format('ddd')}
            placeholderText={placeholder}
            // closeOnScroll={true}
            onFocus={(e) => e.target.blur()}
            selected={field.value}
            dateFormat={dateFormat}
            name={name}
            onChange={(date) => field.onChange(date)}
            showMonthDropdown
            autoComplete="off"
            showYearDropdown
            dropdownMode="select"
            ref={(elem) => {
              if (elem) {
                field.ref(
                  (elem as unknown as { input: HTMLInputElement }).input
                );
              }
            }}
            {...props}
          />
        )}
      />
      {hasError && showErrorMessage && (
        <p className="text-red-500 text-sm mt-1">{hasError.message}</p>
      )}
    </>
  );
};
