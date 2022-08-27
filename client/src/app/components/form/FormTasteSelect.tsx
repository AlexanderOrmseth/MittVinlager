import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import TastePie, { list, text } from "../TastePie";
import FormInputError from "./FormInputError";
import DropDownTransition from "../DropDownTransition";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  type: "fullness" | "freshness" | "sweetness" | "tannins" | "bitterness";
  errors?: string[];
}

const FormTasteSelect = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props
  });

  return (
    <div>
      <Controller
        {...props}
        render={({ field }) => (
          <Listbox as={"div"} className="relative" {...field}>
            <Listbox.Label className="label">{props.label}</Listbox.Label>
            <Listbox.Button
              className={({ open }) =>
                `btn-white rounded-full min-w-min flex flex-row gap-3 items-center h-10 sm:h-12 ${
                  open
                    ? "bg-white ring-4 ring-wine-300 border-white ring-opacity-50"
                    : ""
                }`
              }
            >
              <TastePie
                faded={field.value === 0}
                percent={list[field.value].percent}
                size="1.6rem"
              />
              <div className={`${field.value === 0 ? "text-slate-500" : ""}`}>
                {text[props.type][field.value]}
              </div>
            </Listbox.Button>
            <DropDownTransition>
              <Listbox.Options className="dropdown">
                {list.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active, selected }) =>
                      `relative cursor-default flex items-center leading-4 rounded text-sm gap-2 select-none py-2 px-4 ${
                        active && !selected
                          ? "bg-slate-200 dark:bg-gray-700/40 text-black dark:text-gray-300"
                          : ""
                      } ${
                        selected
                          ? "bg-wine-500 dark:bg-wine-400 text-white"
                          : ""
                      }`
                    }
                    value={item.value}
                  >
                    <TastePie percent={item.percent} size={"1.75rem"} />
                    <div>{text[props.type][i]}</div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </DropDownTransition>
          </Listbox>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormTasteSelect;
