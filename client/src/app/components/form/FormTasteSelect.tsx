import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import TastePie, { list, text } from "../TastePie";
import FormInputError from "./FormInputError";

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
            <div className="relative">
              <Listbox.Label className="label">{props.label}</Listbox.Label>
              <Listbox.Button
                className={({ open }) =>
                  `w-full text-input text-sm min-w-min flex leading-4 flex-row gap-3 items-center h-12 ${
                    open
                      ? "bg-white ring-4 ring-wine-300 border-white ring-opacity-50"
                      : ""
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
