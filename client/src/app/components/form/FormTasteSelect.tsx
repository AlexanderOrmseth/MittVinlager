import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import TastePie from "../TastePie";
import FormInputError from "./FormInputError";

const list = [
  { percent: 0, value: 0 },
  { percent: 8.33, value: 1 },
  { percent: 16.33, value: 2 },
  { percent: 25, value: 3 },
  { percent: 33.32, value: 4 },
  { percent: 41.65, value: 5 },
  { percent: 50, value: 6 },
  { percent: 58.31, value: 7 },
  { percent: 66.64, value: 8 },
  { percent: 75, value: 9 },
  { percent: 83.3, value: 10 },
  { percent: 91.63, value: 11 },
  { percent: 100, value: 12 },
];

const text = {
  fullness: [
    "Ingen",
    "Svært lett",
    "Svært lett",
    "Lett",
    "Lett",
    "Middels fylde",
    "Middels fylde",
    "God fylde",
    "God fylde",
    "Fyldig",
    "Fyldig",
    "Svært fyldig",
    "Svært fyldig",
  ],
  freshness: [
    "Ingen",
    "Svært lav friskhet",
    "Svært lav friskhet",
    "Lav friskhet",
    "Lav friskhet",
    "Middels friskhet",
    "Middels friskhet",
    "God friskhet",
    "God friskhet",
    "Frisk",
    "Frisk",
    "Svært frisk",
    "Svært frisk",
  ],
  sweetness: [
    "Ingen",
    "Tørr",
    "Tørr",
    "Litt sødme",
    "Litt sødme",
    "Middels søt",
    "Middels søt",
    "Søtlig",
    "Søtlig",
    "Søt",
    "Søt",
    "Svært søt",
    "Svært søt",
  ],
  tannins: [
    "Ingen",
    "Svært lite snerp",
    "Svært lite snerp",
    "Lite snerp",
    "Lite snerp",
    "Middels snerp",
    "Middels snerp",
    "God snerp",
    "God snerp",
    "Fast",
    "Fast",
    "Svært snerpende",
    "Svært snerpende",
  ],
  bitterness: [
    "Ingen",
    "Svært lav bitterhet",
    "Svært lav bitterhet",
    "Lite bitterhet",
    "Lite bitterhet",
    "Middels bitterhet",
    "Middels bitterhet",
    "God bitterhet",
    "God bitterhet",
    "Ekstra bitter",
    "Ekstra bitter",
    "Svært bitter",
    "Svært bitter",
  ],
};

interface Props<T> extends UseControllerProps<T> {
  label: string;
  type: "fullness" | "freshness" | "sweetness" | "tannins" | "bitterness";
  errors?: string[];
}

const FormTasteSelect = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <Controller
        {...props}
        render={({ field }) => (
          <Listbox {...field}>
            <div className="relative z-10">
              <Listbox.Label className="label">{props.label}</Listbox.Label>
              <Listbox.Button
                className={({ open }) =>
                  `w-full text-input text-sm flex leading-4 flex-row gap-3 items-center h-12 ${
                    open ? "bg-white ring-4 ring-wine-300 ring-opacity-50" : ""
                  }`
                }
              >
                <TastePie
                  percent={list[field.value].percent}
                  size={"1.75rem"}
                />
                <div className={`${field.value === 0 ? "text-slate-500" : ""}`}>
                  {text[props.type][field.value]}
                </div>
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
                  {list.map((item, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active, selected }) =>
                        `relative cursor-default flex items-center leading-4 rounded text-sm gap-2 select-none py-2 px-4 ${
                          active && !selected ? "bg-slate-200 text-black" : ""
                        } ${selected ? "bg-wine-500 text-white" : ""}`
                      }
                      value={item.value}
                    >
                      <TastePie percent={item.percent} size={"1.75rem"} />
                      <div>{text[props.type][i]}</div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormTasteSelect;
