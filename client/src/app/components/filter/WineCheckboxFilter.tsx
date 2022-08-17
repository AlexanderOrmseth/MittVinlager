import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import RadioOrCheckboxItem from "../../../features/wine/list/RadioOrCheckboxItem";

interface Props {
  options?: string[] | null;
  checkedOptions: string[];
  onChange: (items: string[]) => void;
  disabled: boolean;
}

const WineCheckboxFilter = ({
  options,
  checkedOptions,
  onChange,
  disabled,
}: Props) => {
  // state copy
  const [value, setValue] = useState<string[]>(checkedOptions || []);

  // Debounce callback
  const debounced = useDebouncedCallback(() => onChange(value), 900);

  // reset local state
  useEffect(() => {
    if (!checkedOptions.length) {
      setValue([]);
    }
  }, [checkedOptions]);

  const handleChecked = (item: string): void => {
    if (disabled) return;
    let newCheckedList = [...value];

    // check / uncheck
    if (newCheckedList.includes(item)) {
      // remove item
      newCheckedList = newCheckedList.filter((i) => !i.includes(item));
    } else {
      // add item
      newCheckedList.push(item);
    }

    setValue(newCheckedList);
    debounced();
  };

  const isChecked = (str: string): boolean =>
    (value.includes(str) && checkedOptions.includes(str)) ||
    (value.includes(str) && !checkedOptions.includes(str));

  return (
    <div className="max-h-96 select-none overflow-auto">
      {options &&
        options.map((item, i) => (
          <button
            aria-checked={isChecked(item)}
            role="checkbox"
            className="group block w-full appearance-none outline-none"
            disabled={disabled}
            type="button"
            onClick={() => handleChecked(item)}
            key={i}
          >
            <RadioOrCheckboxItem
              type="checkbox"
              disabled={disabled}
              checked={isChecked(item)}
              displayText={item}
            />
          </button>
        ))}
    </div>
  );
};

export default WineCheckboxFilter;
