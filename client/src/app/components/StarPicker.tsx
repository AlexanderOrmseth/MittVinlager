import { Minus, Plus } from "phosphor-react";
import Stars from "./Stars";
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
        className="btn-white w-auto shadow-none rounded h-10 focus-primary"
      >
        <Minus size="1.2rem" weight="regular" />
      </button>
      <Stars stars={value || 0} size="2rem"></Stars>
      <button
        type="button"
        onClick={handleIncrement}
        className="btn-white w-auto shadow-none rounded h-10 focus-primary"
      >
        <Plus size="1.2rem" weight="regular" />
      </button>
    </div>
  );
};

export default StarPicker;
