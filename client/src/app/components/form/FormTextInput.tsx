import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  type?: string;
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
        {props.required && <span className="ml-1 text-wine-400">*</span>}
      </label>
      <Controller
        {...props}
        render={({ field: { value, ...rest } }) => (
          <div className="relative">
            {!props.textarea ? (
              <input
                autoComplete="off"
                className={`text-input ${
                  !!fieldState.error ? "border-wine-500" : ""
                }`}
                {...rest}
                autoFocus={props.focus}
                value={value || ""}
                placeholder={props.placeholder}
                type={props.type ?? "text"}
              />
            ) : (
              <textarea
                autoComplete="off"
                className={`text-input resize-none py-0.5 h-auto ${
                  !!fieldState.error ? "border-wine-500" : ""
                }`}
                {...rest}
                value={value || ""}
                placeholder={props.placeholder}
                rows={props.rows}
                maxLength={props.maxLength}
              />
            )}
            {props.definition && (
              <span className="absolute select-none pointer-events-none right-1.5 h-5 leading-5 top-2.5 px-2 text-sm rounded text-slate-800 bg-slate-200">
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
