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
  disabled
}) => {
  if (!options) return null;

  return (
    <RadioGroup
      as="ul"
      className="max-h-[400px] overflow-y-auto"
      value={value}
      onChange={onChange}
    >
      {options.map((item) => (
        <RadioGroup.Option
          key={item.value}
          as="li"
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
  );
};

export default RadioFilter;
