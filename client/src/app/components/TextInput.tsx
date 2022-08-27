import React from "react";
import { X } from "phosphor-react";

type InputType =
  | {
      numeric: false;
      value: string | null;
      onChange: (value: string | null) => void;
    }
  | {
      numeric: true;
      value: number | null;
      onChange: (value: number | null) => void;
    };

type InputProps = {
  id?: string;
  allowEnter?: boolean;
  maxLength?: number;
  hasError?: boolean;
  focus?: boolean;
  placeholder?: string;
  onEnter?: () => void;
  resetValueBtn?: boolean;
};

type Props = InputProps & InputType;

const TextInput = ({
  id,
  allowEnter,
  value,
  onChange,
  hasError,
  maxLength,
  focus,
  placeholder,
  numeric,
  onEnter,
  resetValueBtn
}: Props) => {
  // prevent from submitting by pressing enter inside input
  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowEnter && e.code === "Enter") e.preventDefault();
    if (e.code === "Enter" && onEnter) onEnter();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = maxLength
      ? e.target.value.slice(0, maxLength)
      : e.target.value;

    if (inputValue) {
      numeric ? onChange(+inputValue ? +inputValue : 0) : onChange(inputValue);
      return;
    }

    onChange(null);
  };

  return (
    <div className="relative">
      <input
        id={id}
        onKeyDown={(e) => checkKeyDown(e)}
        autoComplete="off"
        className={`text-input ${
          hasError
            ? "border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent"
            : ""
        }`}
        onChange={(e) => handleOnChange(e)}
        autoFocus={focus}
        value={value ?? ""}
        placeholder={placeholder}
        inputMode={numeric ? "decimal" : "text"}
        type={numeric ? "number" : "text"}
      />
      {resetValueBtn && value && (
        <div className="absolute right-1 top-0 flex h-full items-center">
          <button
            tabIndex={-1}
            onClick={() => onChange(null)}
            type="button"
            aria-label="Fjern verdi"
            className="text-less-muted rounded p-1 hover:opacity-80 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X size="1.1rem" weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TextInput;
