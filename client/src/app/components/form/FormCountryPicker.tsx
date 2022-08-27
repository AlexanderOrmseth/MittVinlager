import { Combobox } from "@headlessui/react";
import React, { useState } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { Country } from "../../models/country";
import FormInputError from "./FormInputError";
import DropDownTransition from "../DropDownTransition";

interface Props<T> extends UseControllerProps<T> {
  list: Country[] | null;
  label: string;
  required?: boolean;
}

const FormCountryPicker = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState, field } = useController({
    ...props
  });

  const [term, setTerm] = useState("");

  if (!props.list) return null;

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
            <div className="relative">
              <Combobox.Label className="label">
                {props.label}
                {props.required && (
                  <span className="text-wine-400 ml-1">*</span>
                )}
              </Combobox.Label>
              <div className="flex flex-row items-center gap-2">
                <div
                  className={`f32 flag pointer-events-none absolute left-2 select-none ${
                    selectedCountryId ? selectedCountryId.toLowerCase() : ""
                  }`}
                />
                <Combobox.Input
                  name={field.name + "Term"}
                  autoComplete="off"
                  placeholder="land"
                  className="text-input flex-1 pl-12"
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
                          className={`f32 flag pointer-events-none select-none ${country.countryId.toLowerCase()}`}
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

export default FormCountryPicker;
