"use client";

import React from "react";
import clsx from "clsx";

type RadioOption = {
  label: string;
  value: string;
  // disabled?: boolean;
};

type RadioInputProps = {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const CustomRadioGroup: React.FC<RadioInputProps> = ({
  name,
  options,
  value,
  onChange,
  className,
  labelClassName,
  inputClassName,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            "flex items-center gap-2 cursor-pointer",
            // option.disabled && "cursor-not-allowed opacity-50",
            labelClassName
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            // disabled={option.disabled}
            className={clsx(
              "w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary",
              inputClassName
            )}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioGroup;
