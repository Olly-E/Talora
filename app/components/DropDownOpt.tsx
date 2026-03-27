"use client";

import React from "react";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import { ChevronDown, EllipsisVertical } from "lucide-react";

interface DropDownProp {
  options: { name: string; id: string; action: () => void }[];
  deleteIndex?: number;
  useIcon?: boolean;
  text?: string;
}
export const DropDown = ({
  options,
  deleteIndex,
  useIcon,
  text,
}: DropDownProp) => {
  const {
    ref: dropDownRef,
    setIsComponentVisible: setDropDownVisible,
    isComponentVisible: isDropDownVisible,
    dropDownButtonRef: dropDownButtonRef,
  } = useComponentVisible();

  const handleOpenOptionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropDownVisible(true);
  };
  const handleOptionClick = (action: () => void) => {
    action();
    setDropDownVisible(false);
  };

  return (
    <div className="relative" ref={dropDownRef}>
      <div className="flex items-center justify-between w-full">
        {useIcon ? (
          <button
            ref={dropDownButtonRef}
            onClick={handleOpenOptionsMenu}
            className=" w-[28px] h-[28px] centered hover:bg-gray-100 transition-colors"
          >
            <EllipsisVertical size={24} color="#9EA4AC" />
          </button>
        ) : (
          <button
            ref={dropDownButtonRef}
            onClick={handleOpenOptionsMenu}
            className="flex items-center gap-2 bg-white-2 px-3 py-2 rounded-[5px] border border-gray-200 w-fit text-sm"
          >
            <p className="text-sm">{text || "Actions"}</p>
            <ChevronDown size="16" color="#292D32" />
          </button>
        )}
      </div>
      {isDropDownVisible && (
        <div className=" bg-white right-0 px-6 py-[10px] text-black min-w-[200px] rounded-[10px] border border-gray-200 absolute z-10">
          {options.map((multiOptLink, index) => (
            <button
              onClick={() => handleOptionClick(multiOptLink.action)}
              key={multiOptLink.id}
              className={clsx(
                "block text-sm py-3 w-full text-start",
                index > 0 && "border-t border-t-200",
                index === deleteIndex && "text-red-state"
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
