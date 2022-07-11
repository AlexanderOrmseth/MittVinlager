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
    let val = parseInt(e.target.value.replace(/\D/g, ""));
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
          <div className="text-sm text-slate-700 border-b border-slate-200 pb-0.5 px-4">
            Skriv inn ett år, eller velg år nedenfor.
          </div>
          {[...Array(length)].map((_, i) => {
            const num = dropDownMinValue + i;
            return (
              <div
                onClick={() => handleYearTagClicked(num)}
                className={`cursor-default rounded text-sm gap-2 select-none py-2 px-4 hover:bg-slate-200  ${
                  num === value
                    ? "underline text-black bg-slate-100"
                    : "text-gray-700 bg-white"
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
