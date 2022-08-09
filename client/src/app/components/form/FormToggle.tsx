import { Switch } from "@headlessui/react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  errors?: string[];
}

const FormToggle = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      <Controller
        {...props}
        render={({ field: { value, onChange, ...rest } }) => (
          <div className="">
            <Switch
              {...rest}
              checked={value}
              onChange={onChange}
              className={`${
                value
                  ? "bg-wine-500 hover:bg-wine-600"
                  : "bg-slate-200 hover:bg-slate-300 dark:bg-gray-900 dark:hover:bg-gray-900/80"
              } relative inline-flex h-10 w-full rounded-full transition-colors duration-100`}
            >
              <span
                className={`${
                  value ? "translate-x-full" : "translate-x-0"
                } inline-flex h-full w-1/2 items-center p-1 transition ease-in-out  `}
              >
                <p
                  className={`flex w-full items-center justify-center gap-x-1 rounded-full bg-white py-1 ${
                    value ? " dark:bg-wine-700" : "dark:bg-gray-700"
                  }`}
                >
                  {value ? "Ja" : "Nei"}
                </p>
              </span>
            </Switch>
          </div>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormToggle;
