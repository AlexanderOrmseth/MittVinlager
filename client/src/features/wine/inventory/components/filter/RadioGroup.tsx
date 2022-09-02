import { FunctionComponent } from "react";
import { RadioGroup as HRadioGroup } from "@headlessui/react";
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

const RadioGroup: FunctionComponent<Props> = ({
  options,
  value,
  onChange,
  disabled
}) => {
  if (!options) return null;

  return (
    <HRadioGroup
      as="ul"
      className="max-h-[400px] overflow-y-auto"
      value={value}
      onChange={onChange}
    >
      {options.map((item) => (
        <HRadioGroup.Option
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
        </HRadioGroup.Option>
      ))}
    </HRadioGroup>
  );
};

export default RadioGroup;
