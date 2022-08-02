import { Combobox } from "@headlessui/react";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Country } from "../../models/country";
import FormInputError from "./FormInputError";
import DropDownTransition from "../DropDownTransition";

interface Props<T> extends UseControllerProps<T> {
  list: Country[] | null;
  label: string;
  required?: boolean;
}

const FormCombobox = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState, field } = useController({
    ...props,
  });

  const [term, setTerm] = useState("");

  if (!props.list) return null;

  // prevent from submitting by pressing enter inside input
  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const filteredList =
    term === ""
      ? props.list
      : props.list.filter((country) => {
          return country.country
            .toLowerCase()
            .includes(term.toLowerCase().trim());
        });

  const selectedCountryId = props.list.find(
    (country) => country.country === field.value
  )?.countryId;

  return (
    <div>
      <Controller
        {...props}
        render={({ field }) => (
          <Combobox nullable {...field}>
            <div className="relative z-10">
              <Combobox.Label className="label">
                {props.label}
                {props.required && (
                  <span className="ml-1 text-wine-400">*</span>
                )}
              </Combobox.Label>
              <div className="flex flex-row gap-2 items-center">
                <div
                  className={`absolute select-none pointer-events-none left-2 f32 flag ${
                    selectedCountryId ? selectedCountryId.toLowerCase() : ""
                  }`}
                />
                <Combobox.Input
                  name={field.name + "Term"}
                  autoComplete="off"
                  onKeyDown={checkKeyDown}
                  placeholder="land"
                  className="text-input pl-12 flex-1"
                  onChange={(e) => setTerm(e.target.value)}
                />
              </div>
              {filteredList.length > 0 && (
                <DropDownTransition>
                  <Combobox.Options className="dropdown">
                    {filteredList.map((country) => (
                      <Combobox.Option
                        className={({ active, selected }) =>
                          `cursor-default flex items-center leading-4 rounded text-sm gap-2 select-none py-2 px-4 ${
                            active && !selected
                              ? "bg-slate-200 dark:bg-gray-700/40 text-black dark:text-gray-300"
                              : ""
                          } ${
                            selected
                              ? "bg-wine-500 dark:bg-wine-400 text-white"
                              : ""
                          }`
                        }
                        key={country.countryId}
                        value={country.country}
                      >
                        <div
                          className={`select-none pointer-events-none f32 flag ${country.countryId.toLowerCase()}`}
                        ></div>
                        <div>{country.country}</div>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </DropDownTransition>
              )}
            </div>
          </Combobox>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormCombobox;
