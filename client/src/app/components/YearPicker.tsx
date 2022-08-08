import React, { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Popover } from "@headlessui/react";
import DropDownTransition from "./DropDownTransition";

interface Props {
  value: number | null;
  onChange: (val: number | null) => void;
  name?: string;
  placeholder?: string;
  onBlur?: () => void;
  minValue: number;
  maxValue: number;
  dropDownMinValue: number;
  dropDownMaxValue: number;
  hasError?: boolean;
}

const YearPicker = ({
  onChange,
  value,
  placeholder,
  name,
  onBlur,
  minValue,
  maxValue,
  dropDownMaxValue,
  dropDownMinValue,
  hasError,
}: Props) => {
  const [isOpen, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => setOpen(false);
  useOnClickOutside(divRef, handleOutsideClick);

  const length = dropDownMaxValue - dropDownMinValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/\D/g, ""));
    val >= minValue && val <= maxValue ? onChange(val) : onChange(null);
    onBlur ? onBlur() : null;
  };

  const handleYearTagClicked = (val: number) => {
    if (!isNaN(val)) onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") e.preventDefault();
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <Popover
      as="div"
      ref={divRef}
      className={`${isOpen ? "relative z-10" : "relative"}`}
    >
      <input
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        type="number"
        inputMode="numeric"
        value={value || ""}
        onChange={(e) => handleOnChange(e)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onFocus={() => setOpen(true)}
        className={`text-input ${
          hasError
            ? "border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent"
            : ""
        }`}
      />
      <DropDownTransition isOpen={isOpen}>
        <Popover.Panel static>
          <div className="dropdown">
            <div className="text-muted border-b border-slate-200 px-4 pb-0.5 text-sm dark:border-gray-700">
              Skriv inn ett år, eller velg år nedenfor.
            </div>
            {[...Array(length)].map((_, i) => {
              const num = dropDownMinValue + i;
              return (
                <div
                  onClick={() => handleYearTagClicked(num)}
                  className={`cursor-default select-none gap-2 rounded py-2 px-4 text-sm focus:blur   ${
                    num === value
                      ? "bg-wine-500 dark:bg-wine-400 text-white"
                      : "hover:bg-slate-200 hover:text-black hover:dark:bg-gray-700/40 hover:dark:text-gray-300"
                  }`}
                  key={i}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </Popover.Panel>
      </DropDownTransition>
    </Popover>
  );
};

export default YearPicker;
