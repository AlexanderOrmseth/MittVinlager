import { RadioGroup } from "@headlessui/react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  options: Option[];
  label: string;
  errors?: string[];
}

interface Option {
  displayText: string;
  value: any;
}

const FormRadioTrueFalse = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <Controller
        {...props}
        render={({ field }) => (
          <RadioGroup {...field}>
            <RadioGroup.Label className="label">{props.label}</RadioGroup.Label>
            <div className="flex flex-row gap-2 items-center">
              {props.options.map((option, i) => (
                <RadioGroup.Option
                  className="flex-1"
                  key={i}
                  value={option.value}
                >
                  {({ checked }) => (
                    <div
                      className={`${
                        checked
                          ? "bg-white ring-4 ring-green-wine-500 border text-gray-900 border-transparent"
                          : "bg-white border text-gray-600"
                      } rounded transition-all cursor-pointer h-10 leading-10 px-2 text-center font-medium text-sm hover:bg-slate-50 active:bg-slate-100 active:text-gray-700`}
                    >
                      {option.displayText}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormRadioTrueFalse;
