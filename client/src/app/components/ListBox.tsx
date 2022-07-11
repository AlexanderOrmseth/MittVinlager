import {Listbox, Transition} from "@headlessui/react";
import {CaretDown, Check} from "phosphor-react";
import {Fragment} from "react";

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
const ListBox = ({items, selected, onChange, label, disabled}: Props) => {
  return (
    <div>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Label className="label">{label}</Listbox.Label>
          <Listbox.Button className="relative text-left btn-white pr-10">
            <span className="block truncate">
              {items.find((i) => i.value === selected)?.displayText}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="dropdown">
              {items.map((item, i) => (
                <Listbox.Option
                  disabled={disabled}
                  key={i}
                  className={({active, selected, disabled}) =>
                    `cursor-default flex items-center leading-4 rounded text-sm select-none py-2.5 px-4 ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    } ${active && !selected ? "bg-slate-200 text-black" : ""} ${
                      selected ? "bg-wine-500 text-white" : ""
                    }`
                  }
                  value={item.value}
                >
                  {({selected}) => (
                    <>
                      <div className="w-5">
                        {selected && (
                          <Check className="text-white" size="1rem" />
                        )}
                      </div>
                      <div>{item.displayText}</div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
