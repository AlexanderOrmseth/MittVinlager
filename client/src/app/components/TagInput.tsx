import React, { FunctionComponent, useState } from "react";
import { X } from "phosphor-react";

interface Props {
  value: string[] | null;
  onChange: (val: string[]) => void;
  placeholder?: string;
}

const TagInput: FunctionComponent<Props> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();

      const transformedValue = inputValue.trim().replace(/[^\w\s]/gi, "");

      // validate
      if (transformedValue.length < 2) {
        setErrorMessage("Verdien må minst være på 2 bokstaver.");
        return;
      }

      // add tag
      if (value) {
        if (value.length >= 5) {
          setErrorMessage("Listen kan max ha en lengde på 5.");
          return;
        }

        onChange([...value, transformedValue]);
      } else {
        onChange([transformedValue]);
      }

      setErrorMessage(null);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagValue: string) => {
    onChange(value?.filter((tag) => tag !== tagValue) ?? []);
  };

  return (
    <div>
      {value && (
        <ul className="i-flex-row flex-wrap gap-y-2 mb-2">
          {value.map((str, i) => (
            <li
              className="py-1 font-medium text-sm cursor-pointer px-3 text-muted border hover:border-slate-300 hover:text-gray-900 bg-slate-50 rounded-full i-flex-row"
              onClick={() => handleRemoveTag(str)}
              key={i}
            >
              {str}
              <X size="1.1rem" />
            </li>
          ))}
        </ul>
      )}

      <div>
        <input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          className={`text-input ${
            errorMessage
              ? "border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent"
              : ""
          }`}
        />
        {errorMessage && (
          <em className="text-wine-500 block dark:text-wine-300 text-sm italic">
            {errorMessage}
          </em>
        )}
      </div>
    </div>
  );
};

export default TagInput;
