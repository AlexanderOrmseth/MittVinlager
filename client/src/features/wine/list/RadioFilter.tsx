import { FunctionComponent } from "react";
import { RadioGroup } from "@headlessui/react";
import RadioOrCheckboxItem from "./RadioOrCheckboxItem";

interface Item {
  displayText: string;
  value: string;
}

interface Props {
  options: Item[];
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
}

const RadioFilter: FunctionComponent<Props> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  if (!options) return null;

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <RadioGroup value={value} onChange={onChange}>
        {options.map((item) => (
          <RadioGroup.Option
            key={item.value}
            disabled={disabled}
            className="group outline-none"
            value={item.value}
          >
            {({ checked }) => (
              <RadioOrCheckboxItem
                type="radio"
                disabled={disabled}
                checked={checked}
                displayText={item.displayText}
              />
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioFilter;
