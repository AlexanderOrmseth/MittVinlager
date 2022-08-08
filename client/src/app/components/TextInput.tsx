import React, { FunctionComponent } from "react";

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
  allowEnter?: boolean;
  maxLength?: number;
  hasError?: boolean;
  focus?: boolean;
  placeholder?: string;
};

type Props = InputProps & InputType;

const TextInput: FunctionComponent<Props> = ({
  allowEnter,
  value,
  onChange,
  hasError,
  maxLength,
  focus,
  placeholder,
  numeric,
}) => {
  // prevent from submitting by pressing enter inside input
  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowEnter && e.code === "Enter") e.preventDefault();
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
    <input
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
  );
};

export default TextInput;
