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

    let val = value + 1;
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

    let val = value - 1;
    onChange(val);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <button
        type="button"
        onClick={handleDecrement}
        className="btn-white rounded-full h-10 flex justify-center items-center w-10"
      >
        -
      </button>
      <div className="self-stretch flex relative items-center">
        <Stars stars={value || 0} size="1.75rem" />
        <span className="text-sm select-none -top-2.5 absolute w-full text-center text-gray-500">
          {value && value / 2}
        </span>
      </div>
      <button
        type="button"
        onClick={handleIncrement}
        className="btn-white rounded-full h-10 w-10 flex justify-center items-center"
      >
        +
      </button>
    </div>
  );
};

export default StarPicker;
