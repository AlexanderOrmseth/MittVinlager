import Stars from "./Stars";
import React from "react";

interface Props {
  value: number | null;
  onChange: (val: number | null) => void;
}

const StarPicker = ({ value, onChange }: Props) => {
  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!value) {
      onChange(1);
      return;
    }

    if (value >= 10) return;

    const val = value + 1;
    onChange(val);
  };
  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!value || value <= 0) return;

    if (value === 1) {
      onChange(null);
      return;
    }

    const val = value - 1;
    onChange(val);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        className="btn-white flex h-10 w-10 items-center justify-center rounded-full"
      >
        -
      </button>
      <div className="relative flex items-center self-stretch">
        <Stars stars={value || 0} size="1.75rem" />
        <span className="absolute -top-2.5 w-full select-none text-center text-sm text-gray-500">
          {value && value / 2}
        </span>
      </div>
      <button
        type="button"
        onClick={handleIncrement}
        className="btn-white flex h-10 w-10 items-center justify-center rounded-full"
      >
        +
      </button>
    </div>
  );
};

export default StarPicker;
