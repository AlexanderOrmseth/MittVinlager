import React, { FunctionComponent, useState } from "react";
import { X } from "phosphor-react";
import { FieldError } from "react-hook-form";

interface Props {
  value: string[] | null;
  onChange: (val: string[]) => void;
  min: number;
  max: number;
  error?: FieldError;
}

const TagInput: FunctionComponent<Props> = ({
  value,
  onChange,
  min,
  max,
  error
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();

      const transformedValue = inputValue.trim();

      // validate
      if (transformedValue.length < min) {
        setErrorMessage(`Verdien må minst være på ${min} bokstaver.`);
        return;
      } else if (
        value?.some(
          (val) => val.toLowerCase() === transformedValue.toLowerCase()
        )
      ) {
        setErrorMessage("Verdien må være unik.");
        return;
      }

      // add tag
      if (value) {
        if (value.length >= max) {
          setErrorMessage(`Listen kan max ha en lengde på ${max}.`);
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
        <div role="group" className="i-flex-row mb-1.5 flex-wrap gap-y-2">
          {value.map((str, i) => (
            <button
              className={`bg-blue-wine-300 dark:bg-blue-wine-500 i-flex-row cursor-pointer rounded-full py-1
                px-3 text-sm font-medium text-white hover:opacity-70 ${
                  error?.types &&
                  Object.values(error.types).some((err) => {
                    if (!err) return false;
                    const errMessage = err.toString();
                    const errValue = errMessage.slice(
                      errMessage.indexOf("'") + 1,
                      errMessage.lastIndexOf("'")
                    );
                    return errValue === str ? errValue : false;
                  })
                    ? "bg-wine-400 animate-pulse"
                    : ""
                }`}
              onClick={() => handleRemoveTag(str)}
              key={i}
            >
              {str}
              <X size="1.1rem" />
            </button>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          placeholder="trykk enter eller komma for å legge til verdi til listen"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setErrorMessage(null);
          }}
          autoComplete="off"
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          className={`text-input ${
            errorMessage || error?.types
              ? "border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent"
              : ""
          }`}
        />
        {errorMessage && (
          <em className="text-wine-500 dark:text-wine-300 block text-sm italic">
            {errorMessage}
          </em>
        )}
        <small className="text-muted absolute right-0 -bottom-2/4 z-0 text-xs">{`${
          value?.length ?? 0
        }/${max}`}</small>
      </div>
    </div>
  );
};

export default TagInput;
