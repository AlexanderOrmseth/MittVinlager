import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

interface Props {
  value: number | null;
  onChange: (val: number | null) => void;
  name?: string;
  placeholder?: string;
  onBlur?: () => void;
}

const YearPicker = ({ onChange, value, placeholder, name, onBlur }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const handleOutsideClick = () => setOpen(false);
  useOnClickOutside(divRef, handleOutsideClick);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/\D/g, ""));
    val >= 0 && val <= 3000 ? onChange(val) : onChange(null);
  };

  const handleYearTagClicked = (val: number) => {
    if (!isNaN(val)) onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") setOpen(false);
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
        className="text-input"
      />
      {isOpen && (
        <div className="dropdown z-10">
          <div className="text-sm text-slate-700 border-b border-slate-200 pb-0.5 px-4">
            Skriv inn ett år, eller velg år nedenfor.
          </div>
          {[...Array(15)].map((_, i) => {
            const tagYear = currentYear - 5 + i;
            return (
              <div
                onClick={() => handleYearTagClicked(tagYear)}
                className={`cursor-default rounded text-sm gap-2 select-none py-2 px-4 hover:bg-slate-200  ${
                  tagYear === value
                    ? "underline text-black bg-slate-100"
                    : "text-gray-700 bg-white"
                }`}
                key={i}
              >
                {tagYear}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YearPicker;
