import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

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
    <div ref={divRef} className="relative">
      <input
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        type="text"
        onKeyDown={(e) => handleKeyDown(e)}
        value={value || ""}
        onChange={(e) => [handleOnChange(e), onBlur]}
        onFocus={() => setOpen(true)}
        className={`text-input ${
          hasError
            ? "border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent"
            : ""
        }`}
      />
      {isOpen && (
        <div className="dropdown z-10">
          <div className="text-sm text-muted border-b border-slate-200 dark:border-gray-700 pb-0.5 px-4">
            Skriv inn ett år, eller velg år nedenfor.
          </div>
          {[...Array(length)].map((_, i) => {
            const num = dropDownMinValue + i;
            return (
              <div
                onClick={() => handleYearTagClicked(num)}
                className={`cursor-default rounded text-sm gap-2 select-none py-2 px-4   ${
                  num === value
                    ? "bg-wine-500 dark:bg-wine-400 text-white"
                    : "hover:bg-slate-200 hover:dark:bg-gray-700/40 hover:text-black hover:dark:text-gray-300"
                }`}
                key={i}
              >
                {num}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YearPicker;
