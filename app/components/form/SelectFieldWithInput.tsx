import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { CloseCircle } from "iconsax-react";
import React, { useEffect } from "react";
import clsx from "clsx";

import { CommonData, Option } from "@/app/types";
import { ChevronDown } from "lucide-react";

type HasErrorType = Merge<
  FieldError,
  (
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          name: string;
          id: string;
        }>
      >
    | undefined
  )[]
>;

type SelectFieldProps = {
  className?: string;
  arr: Option[] | CommonData[];
  isMultiple?: boolean;
  placeholder?: string;
  hasError?: HasErrorType | undefined;
  hasBorder?: boolean;
  disabled?: boolean;
  openModal?: () => void;
  dataLoading?: boolean;
  onCreateNew?: (query: string) => void;
  isNewChecker?: (query: string) => boolean;
} & UseControllerProps;

export const SelectFieldWithInput: React.FC<SelectFieldProps> = (props) => {
  const {
    field: { value, onChange, ref },
  } = useController(props);
  const {
    arr,
    className,
    hasError = false,
    placeholder = "Select option",
    isMultiple = false,
    hasBorder = true,
    openModal,
    dataLoading = false,
    disabled,
    onCreateNew,
    isNewChecker,
  } = props;

  const [query, setQuery] = React.useState("");
  const [multiFilterValue, setMultiFilterValue] = React.useState<Option[]>([]);

  const isNew = onCreateNew && isNewChecker ? isNewChecker(query) : false;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isNew) {
      event.preventDefault();
      onCreateNew?.(query);
      setQuery("");
    }
  };

  useEffect(() => {
    if (isMultiple) {
      setMultiFilterValue(value || []);
    }
  }, [value]);

  const filteredArr =
    query === ""
      ? arr.filter(
          (item) =>
            !multiFilterValue.some((selected) => selected.id === item.id)
        )
      : arr.filter(
          (obj) =>
            obj.name
              ?.toLowerCase()
              ?.replace(/\s+/g, "")
              ?.includes(query.toLowerCase().replace(/\s+/g, "")) &&
            !multiFilterValue.some((selected) => selected.id === obj.id)
        );

  const handleInputFocus = (
    event: React.FocusEvent<HTMLInputElement, Element>,
    open: boolean
  ) => {
    if (event.relatedTarget?.id?.includes("headlessui-combobox-button")) return;
    if (!open) {
      (event.target.nextSibling as HTMLButtonElement)?.click();
    }
  };

  const hasMultipleOption = isMultiple && multiFilterValue.length > 0;

  const handleRemoveOptionFromMultiple = (id: string) => {
    const newValue = multiFilterValue.filter((option) => option?.id !== id);
    setMultiFilterValue(newValue);
    onChange(newValue); // Update form control value
  };

  return (
    <div className="w-full">
      <Combobox
        value={isMultiple ? multiFilterValue : value}
        onChange={(newVal) => {
          if (isMultiple) {
            setMultiFilterValue(newVal);
          }
          onChange(newVal);
        }}
        multiple={isMultiple}
      >
        {({ open }) => (
          <div className="relative mt-1 ">
            <ComboboxInput
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className={clsx(
                "block h-[40px] rounded-[6px] w-full border border-[#444444]/20 px-4 text-left text-sm text-secondary outline-none bg-transparent",
                hasError && "border-red-500",
                !hasBorder &&
                  "border-transparent px-0 focus:border-transparent",
                className,
                disabled && "cursor-not-allowed"
              )}
              placeholder={placeholder}
              displayValue={(option: Option | Option[]) => {
                return isMultiple
                  ? (option as Option[])?.map((opt) => opt.name)?.join(", ")
                  : (option as Option)?.name;
              }}
              onChange={(event) => setQuery(event.target.value)}
              ref={ref}
              onFocus={(event) => {
                if (isMultiple) handleInputFocus(event, open);
              }}
            />

            <ComboboxButton
              className={clsx(
                "absolute top-2 justify-center flex items-center px-2 right-1 rounded-full min-w-[20px] min-h-[24px] mx-auto bg-white-state ",
                hasError ? "text-primary" : "text-gray-250"
              )}
              disabled={disabled}
            >
              <div style={{ color: "#9EA4AC" }} className="h-fit w-[12px]">
                <ChevronDown size={14} />
              </div>
            </ComboboxButton>

            {hasMultipleOption && (
              <div className="mt-2 flex flex-wrap gap-2">
                {multiFilterValue.length > 0 &&
                  multiFilterValue.map((option) => (
                    <div
                      className="flex py-1 bg-primary/10 border border-[#DADFE7] rounded-[3px] hover:text-black/80 gap-1 px-2 items-center space-x-1 bg-secondary/20 pl-2 text-sm"
                      key={option?.id}
                    >
                      {option?.name}
                      <button
                        type="button"
                        className=""
                        onClick={() =>
                          handleRemoveOptionFromMultiple(option?.id)
                        }
                      >
                        <CloseCircle size="20" color="#4F4F4F" />
                      </button>
                    </div>
                  ))}
              </div>
            )}

            <Transition
              as={React.Fragment}
              enter="transition-opacity transition-transform duration-200 origin-center"
              enterFrom="scale-0 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto py-0 rounded-[7px] border border-[#9EA4AC] bg-white text-base shadow-md ring-opacity-5 focus:outline-none sm:text-sm px-0">
                {filteredArr.length === 0 && query !== "" && !dataLoading ? (
                  onCreateNew ? (
                    <div
                      className="relative cursor-pointer select-none py-2 px-4 text-black font-semibold hover:bg-gray-100"
                      onClick={() => {
                        onCreateNew(query);
                        setQuery(""); // Clear the input after creating
                      }}
                    >
                      Create new: &ldquo;{query}&ldquo;
                    </div>
                  ) : (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  )
                ) : dataLoading ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Loading...
                  </div>
                ) : (
                  filteredArr.map((obj, index) => (
                    <ComboboxOption
                      key={obj.id}
                      as={React.Fragment}
                      value={obj}
                      disabled={disabled}
                    >
                      {({ selected, focus }) => (
                        <li
                          className={clsx(
                            "group relative cursor-pointer py-3 px-4 flex items-center",
                            focus
                              ? "bg-black/50 text-primary"
                              : "text-black-state",
                            selected && "bg-black text-primary",
                            !(filteredArr.length - 1 === index) &&
                              "border-b border-[#9EA4AC]"
                          )}
                        >
                          {selected && (
                            <span
                              className={clsx(
                                "absolute inset-y-0 right-2 flex items-center pl-3 text-gray-900",
                                focus ? "text-primary" : "text-black-state",
                                selected && "text-primary"
                              )}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {obj.name}
                          </span>
                        </li>
                      )}
                    </ComboboxOption>
                  ))
                )}
                {arr.length === 0 && !dataLoading && (
                  <p className="w-full px-5 py-1 text-sm text-gray-150">
                    No options
                  </p>
                )}
                {openModal && (
                  <button
                    type="button"
                    onClick={openModal}
                    className="-mb-1 text-sm bg-secondary py-3 text-white w-full rounded-none"
                  >
                    Add New
                  </button>
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
};
