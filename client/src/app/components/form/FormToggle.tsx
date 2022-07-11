import { Switch } from "@headlessui/react";
import { HeartStraight } from "phosphor-react";
import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues,
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
                  : "bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-800/80 hover:bg-slate-300"
              } relative inline-flex transition-colors duration-100 h-10 w-full rounded-full`}
            >
              <span
                className={`${
                  value ? "translate-x-full" : "translate-x-0"
                } inline-flex items-center h-full w-1/2 transform p-1 transition ease-in-out  `}
              >
                <p className="rounded-full w-full flex gap-x-1 justify-center items-center py-1 bg-white dark:bg-gray-700">
                  {value && (
                    <HeartStraight
                      size="1.25rem"
                      weight="duotone"
                      className="text-wine-500"
                    />
                  )}
                  {value ? "Favoritt" : "Ikke favoritt"}
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
