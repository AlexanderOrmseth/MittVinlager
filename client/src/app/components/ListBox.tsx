import { Listbox } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import DropDownTransition from "./DropDownTransition";

interface Item {
  value: string;
  displayText: string;
}

interface Props {
  items: Item[];
  selected: string;
  onChange: (item: string) => void;
  label: string;
  disabled: boolean;
}

const sortByDisplayText = (a: Item, b: Item): number => {
  if (a.displayText < b.displayText) return -1;
  if (a.displayText > b.displayText) return 1;
  return 0;
};

const ListBox = ({ items, selected, onChange, label, disabled }: Props) => {
  return (
    <Listbox
      as={"div"}
      className="relative"
      value={selected}
      onChange={onChange}
    >
      <Listbox.Label className="label">{label}</Listbox.Label>
      <Listbox.Button className="relative text-left btn-white pr-10">
        <span className="block truncate">
          {items.find((i) => i.value === selected)?.displayText}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <CaretDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <DropDownTransition>
        <Listbox.Options className="dropdown">
          {items.sort(sortByDisplayText).map((item, i) => (
            <Listbox.Option
              disabled={disabled}
              key={i}
              className={({ active, selected, disabled }) =>
                `cursor-default flex items-center leading-4 rounded text-sm select-none py-2.5 px-2 ${
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  active && !selected ? "bg-slate-200 dark:bg-gray-800" : ""
                } ${selected ? "bg-wine-500 text-white" : ""}`
              }
              value={item.value}
            >
              {({ selected }) => (
                <>
                  <div className="w-5">
                    {selected && <Check className="text-white" size="1rem" />}
                  </div>
                  <div>{item.displayText}</div>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </DropDownTransition>
    </Listbox>
  );
};

export default ListBox;
