import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import FormInputError from "./FormInputError";
import TextInput from "../TextInput";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  type?: string;
  numeric?: boolean;
  allowEnter?: boolean;
  placeholder?: string;
  definition?: string;
  errors?: string[];
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  focus?: boolean;
}

const FormTextInput = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
        {props.required && <span className="text-wine-400 ml-1">*</span>}
      </label>
      <Controller
        {...props}
        render={({ field: { value, ref, ...rest } }) => (
          <div className="relative">
            {!props.textarea ? (
              <TextInput
                allowEnter={props.allowEnter}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                focus={props.focus}
                hasError={!!fieldState.error}
                numeric={props.numeric ?? false}
                value={value}
                {...rest}
              />
            ) : (
              <textarea
                autoComplete="off"
                className={`text-input h-auto resize-none py-0.5 ${
                  !!fieldState.error
                    ? "border-wine-200 bg-wine-25 text-wine-900 placeholder:text-transparent"
                    : ""
                }`}
                {...rest}
                value={value || ""}
                placeholder={props.placeholder}
                rows={props.rows}
                maxLength={props.maxLength}
              />
            )}
            {props.definition && (
              <span className="pointer-events-none absolute right-1.5 top-1.5 h-5 select-none rounded bg-slate-100 px-2 text-sm leading-5 text-slate-800 dark:bg-white/20 dark:text-gray-300">
                {props.definition}
              </span>
            )}
          </div>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormTextInput;
