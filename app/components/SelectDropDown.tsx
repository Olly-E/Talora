"use client";

import { ArrowDown2 } from "iconsax-react";
import React from "react";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import { Option } from "../types";

interface SelectDropDownProp {
  title: string;
  option: {
    title?: string;
    options: Option[];
  };
  icon?: React.ReactNode;
  selectedId: Option;
  dropDownClass?: string;
  setSelectedId: React.Dispatch<React.SetStateAction<Option>>;
}
export const SelectDropDown = ({
  title,
  option,
  icon,
  dropDownClass,
  selectedId: selected,
  setSelectedId: setSelected,
}: SelectDropDownProp) => {
  const {
    ref: SelectDropDownRef,
    setIsComponentVisible: setSelectDropDownVisible,
    isComponentVisible: isSelectDropDownVisible,
    dropDownButtonRef: SelectDropDownButtonRef,
    handleClickOnDropDownButton,
  } = useComponentVisible();

  const handleSelectOption = (selected: Option) => {
    setSelected(selected);
    setSelectDropDownVisible(false);
  };

  return (
    <div className="relative" ref={SelectDropDownRef}>
      <button
        onClick={handleClickOnDropDownButton}
        ref={SelectDropDownButtonRef}
        type="button"
        className="flex items-center justify-between bg-white-2 px-3 gap-2 py-2 rounded-[5px] border border-gray-200 w-fit text-sm"
      >
        <p className="text-sm">
          {title}
          <span className="capitalize">{selected.name}</span>
        </p>
        {icon ? icon : <ArrowDown2 size="16" color="#292D32" />}
      </button>
      {isSelectDropDownVisible && (
        <div
          className={clsx(
            "mt-2 text-black min-w-[200px] max-h-[300px] overflow-auto bg-white-2 rounded-[10px] border border-gray-200 absolute z-50 right-0",
            dropDownClass
          )}
        >
          {option.options.map((multiOptLink, index) => (
            <button
              onClick={() => handleSelectOption(multiOptLink)}
              key={multiOptLink.id}
              className={clsx(
                "block text-sm py-3 px-4 w-full text-start hover:bg-gray-100",
                index > 0 && "border-t border-t-200"
              )}
            >
              {multiOptLink.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
