"use client";
import * as Checkbox from "@radix-ui/react-checkbox";
import React from "react";
import clsx from "clsx";

interface CustomCheckboxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  labelClass?: string;
  id: string;
}
const CustomCheckbox = ({
  checked,
  setChecked,
  label,
  labelClass,
  id,
}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <Checkbox.Root
        className={clsx(
          "flex size-[20px] appearance-none items-center justify-center rounded ",
          checked
            ? "bg-primary text-black"
            : "bg-transparent border border-black/20"
        )}
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
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
      <label
        className={clsx(
          "pl-[15px] text-[15px] leading-none text-black",
          labelClass
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
